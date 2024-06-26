import { JSX, lazy } from 'solid-js'
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import AppTemplate from 'components/templates/AppTemplate'
import FrontTemplate from 'components/templates/FrontTemplate'
import { AuthProvider } from 'context/AuthContext'
import 'assets/sass/main.scss'

const route = document.getElementById('root')

/** Front Pages */
const Home = lazy(() => import('./pages/Home'))

/** Auth Pages */
const Register = lazy(() => import('./pages/auth/Register'))
const Login = lazy(() => import('./pages/auth/Login'))

/** App Pages */
const Dashboard = lazy(() => import('pages/app/Dashboard'))
const Tickets = lazy(() => import('pages/app/tickets/Tickets'))
const TicketsDetail = lazy(() => import('pages/app/tickets/TicketsDetail'))
const TicketsEdit = lazy(() => import('pages/app/tickets/TicketsEdit'))
const Users = lazy(() => import('pages/app/users/Users'))
const UserDetail = lazy(() => import('pages/app/users/UserDetail'))
const UserEdit = lazy(() => import('pages/app/users/UserEdit'))
const Profile = lazy(() => import('pages/app/profile/ProfileDetail'))

type RouteProps = {
	children: JSX.Element | JSX.Element[]
	index: boolean
}

const AppRoute = (props: RouteProps) => (
	<AuthProvider refuse={true}>
		<AppTemplate>{props.children}</AppTemplate>
	</AuthProvider>
)

const FrontRoute = (props: RouteProps) => (
	<AuthProvider refuse={false}>
		<FrontTemplate>{props.children}</FrontTemplate>
	</AuthProvider>
)

render(
	() => (
		<Router>
			<Route path="/">
				<Route index component={FrontRoute}>
					<Route path="/" component={Home} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
				</Route>
				<Route path="/app">
					<Route index component={AppRoute}>
						<Route path="/" component={Dashboard} />
						<Route path="/tickets">
							<Route path="/" component={Tickets} />
							<Route path="/:id" component={TicketsDetail} />
							<Route path="/:id/edit" component={TicketsEdit} />
						</Route>
						<Route path="/users">
							<Route path="/" component={Users} />
							<Route path="/:id" component={UserDetail} />
							<Route path="/:id/edit" component={UserEdit} />
						</Route>
						<Route path="/profile">
							<Route path="/" component={Profile} />
						</Route>
					</Route>
				</Route>
			</Route>
		</Router>
	),
	route!
)
