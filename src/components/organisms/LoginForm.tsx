import { createSignal, Show, Switch, Match } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import Fieldset from 'components/molecules/Fieldset'
import Button from 'components/atoms/Button'
import ErrorMessage from 'components/atoms/ErrorMessage'
import Loading from 'components/atoms/Loading'
import './LoginForm.scss'

const login = async (email: string, password: string) => {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/auth/login`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		}
	)

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || 'An unknown error occurred')
	}

	return response.json()
}

const LoginForm = () => {
	const [email, setEmail] = createSignal('')
	const [password, setPassword] = createSignal('')
	const [error, setError] = createSignal<string>('')
	const [loading, setLoading] = createSignal(false)
	const navigate = useNavigate()

	const handleSubmit = async (e: Event) => {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			await login(email(), password())
			setLoading(false)
			navigate('/app') // Redirect to the /app route
		} catch (err) {
			setLoading(false)
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('An unknown error occurred')
			}
		}
	}

	const handleEmailInput = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement | null
		if (target) {
			setEmail(target.value)
		}
	}

	const handlePasswordInput = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement | null
		if (target) {
			setPassword(target.value)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Fieldset
				labelFor="email"
				labelText="Email"
				inputType="text"
				inputValue={email()}
				inputPlaceholder="Email"
				inputAutocomplete="email"
				onInput={handleEmailInput}
			/>
			<Fieldset
				labelFor="password"
				labelText="Password"
				inputType="password"
				inputValue={password()}
				inputPlaceholder="Password"
				inputAutocomplete="current-password"
				onInput={handlePasswordInput}
			/>
			<Button type="submit" disabled={loading()}>
				Log In
			</Button>

			<Show when={loading()}>
				<Loading />
			</Show>
			<ul class="error-messages">
				<Switch>
					<Match when={error() === 'Email already in use'}>
						<ErrorMessage message="Email already in use" />
					</Match>
					<Match when={error() === 'Invalid password'}>
						<ErrorMessage message="Invalid password" />
					</Match>
					<Match when={error() === 'User not found'}>
						<ErrorMessage message="User not found" />
					</Match>
					<Match when={error()}>
						<ErrorMessage message={error()} />
					</Match>
				</Switch>
			</ul>
		</form>
	)
}

export default LoginForm
