import { createSignal, Show, Switch, Match } from 'solid-js'

const login = async (email: string, password: string) => {
	const response = await fetch('http://localhost:3000/api/login', {
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

	return response.json()
}

function Login() {
	const [email, setEmail] = createSignal('')
	const [password, setPassword] = createSignal('')
	const [error, setError] = createSignal('')
	const [loading, setLoading] = createSignal(false)

	const handleSubmit = async (e: Event) => {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			await login(email(), password())
			setLoading(false)
			// handle successful login (e.g., redirect to another page)
		} catch (err) {
			setLoading(false)
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('An unknown error occurred')
			}
		}
	}

	return <>Register</>
}

export default Login
