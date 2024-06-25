import { A } from '@solidjs/router'
import { MetaProvider, Title, Link } from '@solidjs/meta'
import LoginForm from 'components/organisms/LoginForm'
import './Login.scss'

function Login() {
	return (
		<MetaProvider>
			<Title>Login SolveDesk</Title>
			<Link rel="canonical" href="http://solvedesk.de/login" />

			<section class="auth-page">
				<div class="container">
					<h1>Log In</h1>
					<A href="/register">Don't have an account?</A>
					<LoginForm />
				</div>
			</section>
		</MetaProvider>
	)
}

export default Login
