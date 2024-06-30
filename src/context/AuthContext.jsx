import { createContext, useContext, createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'

/**
 * @typedef {Object} AuthContextType
 * @property {() => boolean} isAuthenticated
 * @property {(email: string, password: string) => Promise<void>} login
 * @property {() => Promise<void>} refreshAccessToken
 * @property {() => void} logout
 * @property {() => boolean} loading
 * @property {() => string} error
 */

/**
 * @typedef {Object} AuthProviderProps
 * @property {JSX.Element} children
 * @property {boolean} [refuse]
 */

// Default context for AuthContextType
const defaultContext = {
	isAuthenticated: () => false,
	login: async () => {},
	refreshAccessToken: async () => {},
	logout: () => {},
	loading: () => false,
	error: () => ''
}

// Create the AuthContext
const AuthContext = createContext(defaultContext)

/**
 * AuthProvider component to manage authentication state
 * @param {AuthProviderProps} props
 * @returns {JSX.Element}
 */
export function AuthProvider(props) {
	const [isAuthenticated, setIsAuthenticated] = createSignal(!!localStorage.getItem('token'))
	const [loading, setLoading] = createSignal(false)
	const [error, setError] = createSignal('')
	const navigate = useNavigate()

	// Function to handle user login
	const login = async (email, password) => {
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
				throw new Error(errorData.error || 'An unknown error occurred')
			}

			const data = await response.json()
			const { accessToken } = data

			if (!accessToken) {
				throw new Error('Access token not provided')
			}

			localStorage.setItem('token', accessToken)
			document.cookie = `token=${accessToken}`
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
			console.error('Login catch error:', err)
		}
	}

	// Function to refresh access token
	const refreshAccessToken = async () => {
		const refreshToken = localStorage.getItem('refreshToken')
		if (!refreshToken) {
			logout()
			return
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/refresh-token`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token: refreshToken })
			})

			if (!response.ok) {
				throw new Error('Failed to refresh access token')
			}

			const data = await response.json()
			localStorage.setItem('token', data.token)
			document.cookie = `token=${data.token}`
			setIsAuthenticated(true)
		} catch (err) {
			logout()
		}
	}

	// Function to logout user
	const logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('refreshToken')
		setIsAuthenticated(false)
		navigate('/login')
	}

	// Function to check authentication and redirect if needed
	const checkAuthAndRedirect = () => {
		if (!isAuthenticated() && props.refuse) {
			navigate('/login')
		}
	}

	checkAuthAndRedirect()

	// Return the AuthContext Provider with values and children
	return (
		<AuthContext.Provider value={{ isAuthenticated, login, refreshAccessToken, logout, loading, error }}>
			{props.children}
		</AuthContext.Provider>
	)
}

/**
 * Hook to access the AuthContext values
 * @returns {AuthContextType}
 */
export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		console.warn('useAuth must be used within an AuthProvider')
		return defaultContext
	}
	return context
}
