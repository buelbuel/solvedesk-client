import { A, useParams } from '@solidjs/router'
import { createSignal, createEffect } from 'solid-js'
import { MetaProvider, Title } from '@solidjs/meta'
import Loading from 'components/atoms/Loading'
import ErrorMessage from 'components/atoms/ErrorMessage'

/**
 * @typedef {Object} User
 * @property {string} email
 * @property {string} firstName
 */

const API_URL = import.meta.env.VITE_SERVER_URL

/**
 * Fetches user data from the server.
 */
const fetchUser = async (setLoading, setUser, setError) => {
	setLoading(true)
	try {
		const token = localStorage.getItem('token')
		const response = await fetch(`${API_URL}/profile`, {
			headers: {
				Authorization: `${token}`
			}
		})

		if (!response.ok) {
			const errorText = await response.text()
			console.error('Error response:', errorText)
			throw new Error('Failed to fetch user')
		}

		const data = await response.json()
		setUser(data)
	} catch (error) {
		console.error('Error fetching user:', error)
		setError('Failed to fetch user')
	} finally {
		setLoading(false)
	}
}

/**
 * Component for displaying user profile details.
 * @returns {JSX.Element}
 */
export default function ProfileDetail() {
	const params = useParams()
	const [user, setUser] = createSignal(null)
	const [loading, setLoading] = createSignal(false)
	const [error, setError] = createSignal(null)

	createEffect(() => {
		fetchUser(setLoading, setUser, setError)
	}, [params.id])

	return (
		<MetaProvider>
			<Title>SolveDesk</Title>

			<section class="profile-page container">
				{loading() && <Loading />}
				{error() && <ErrorMessage message={error()} />}
				{user() && (
					<div>
						<h1>{user()?.email}</h1>
						<p>{user()?.firstName}</p>
						<A href={`/app/users/edit/${params.id}`}>Edit User</A>
					</div>
				)}
			</section>
		</MetaProvider>
	)
}