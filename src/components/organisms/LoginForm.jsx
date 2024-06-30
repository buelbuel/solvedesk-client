import { createSignal, Show, Switch, Match } from 'solid-js'
import { useAuth } from 'context/AuthContext'
import Fieldset from 'components/molecules/Fieldset'
import Button from 'components/atoms/Button'
import ErrorMessage from 'components/atoms/ErrorMessage'
import Loading from 'components/atoms/Loading'
import './LoginForm.scss'

/**
 * Login form component for user authentication.
 *
 * @param {object} props - Component properties.
 * @param {string} props.title - The title of the form.
 *
 * @returns {JSX.Element} JSX representation of the login form.
 */

export default function LoginForm() {
	const { login, loading, error } = useAuth()
	const [email, setEmail] = createSignal('')
	const [password, setPassword] = createSignal('')

	/**
	 * Handles form submission.
	 * @param {Event} e - Form submission event.
	 * @example
	 * handleSubmit(event);
	 */
	const handleSubmit = async e => {
		e.preventDefault()
		await login(email(), password())
	}

	/**
	 * Handles email input change.
	 * @param {Event} e - Input change event.
	 * @example
	 * handleEmailInput(event);
	 */
	const handleEmailInput = e => {
		const target = e.currentTarget
		if (target) {
			setEmail(target.value)
		}
	}

	/**
	 * Handles password input change.
	 * @param {Event} e - Input change event.
	 * @example
	 * handlePasswordInput(event);
	 */
	const handlePasswordInput = e => {
		const target = e.currentTarget
		if (target) {
			setPassword(target.value)
		}
	}

	return (
		<form onSubmit={handleSubmit} class="login-form">
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
			<Button type="submit" disabled={loading()} variant="primary">
				Log In
			</Button>

			{/* Show loading indicator while waiting for response */}
			<Show when={loading()}>
				<Loading />
			</Show>

			{/* Display error messages based on error state */}
			<p class="error-messages">
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
					{/* Display general error message */}
					<Match when={error()}>
						<ErrorMessage message={error()} />
					</Match>
				</Switch>
			</p>
		</form>
	)
}