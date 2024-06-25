import { createContext, useContext, createSignal, JSX } from 'solid-js'
import { useNavigate } from '@solidjs/router'

type AuthContextType = {
	isAuthenticated: () => boolean
	login: (email: string, password: string) => Promise<void>
	logout: () => void
	loading: () => boolean
	error: () => string
}

interface AuthProviderProps {
	children: JSX.Element
	refuse?: boolean
}

const defaultContext: AuthContextType = {
	isAuthenticated: () => false,
	login: async () => {},
	logout: () => {},
	loading: () => false,
	error: () => ''
}

const AuthContext = createContext<AuthContextType>(defaultContext)

export function AuthProvider(props: AuthProviderProps) {
	const [isAuthenticated, setIsAuthenticated] = createSignal(!!localStorage.getItem('token'))
	const [loading, setLoading] = createSignal(false)
	const [error, setError] = createSignal('')
	const navigate = useNavigate()

	const login = async (email: string, password: string) => {
		setLoading(true)
		setError('')
		try {
			const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || 'An unknown error occurred')
			}

			const data = await response.json()
			localStorage.setItem('token', data.token)
			document.cookie = `token=${data.token}`
			setIsAuthenticated(true)
			setLoading(false)
			navigate('/app')
		} catch (err) {
			setLoading(false)
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('An unknown error occurred')
			}
		}
	}

	const logout = () => {
		localStorage.removeItem('token')
		setIsAuthenticated(false)
		navigate('/login')
	}

	const checkAuthAndRedirect = () => {
		if (!isAuthenticated()) {
			if (props.refuse) {
				navigate('/login')
			}
		}
	}

	checkAuthAndRedirect()

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout, loading, error }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext)
	if (!context) {
		console.warn('useAuth must be used within an AuthProvider')
		return defaultContext
	}
	return context
}
