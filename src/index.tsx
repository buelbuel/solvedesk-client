import { lazy } from 'solid-js'
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'

import './index.scss'

const route = document.getElementById('root')

/** Front Pages */
const Home = lazy(() => import('./pages/Home'))

/** Auth Pages */
const Register = lazy(() => import('./pages/auth/Register'))
const Login = lazy(() => import('./pages/auth/Login'))

/** App Pages */
const Tickets = lazy(() => import('./pages/Home'))
const Ticket = lazy(() => import('./pages/Home'))

render(
	() => (
		<Router>
			<Route path="/" component={Home} />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/tickets" component={Tickets} />
			<Route path="/tickets/:id" component={Ticket} />
		</Router>
	),
	route!
)
