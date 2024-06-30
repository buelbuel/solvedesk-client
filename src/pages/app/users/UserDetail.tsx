import { createSignal, createEffect } from 'solid-js'
import { A, useParams } from '@solidjs/router'
import { MetaProvider, Title, Link } from '@solidjs/meta'

interface User {
	email: string
	firstName: string
}

const API_URL = import.meta.env.VITE_SERVER_URL

export default function UserDetail() {
	const params = useParams()
	const [user, setUser] = createSignal<User | null>(null)
	const [loading, setLoading] = createSignal(false)
	const [error, setError] = createSignal<string | null>(null)

	const fetchUser = async () => {
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(`${API_URL}/users/${params.id}`, {
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

	createEffect(() => {
		fetchUser()
	}, [params.id])

	return (
		<MetaProvider>
			<Title>SolveDesk</Title>
			<Link rel="canonical" href="http://solvedesk.de/app/users" />

			<section class="user-detail-page">
				{loading() && <p>Loading...</p>}
				{error() && <p>Error: {error()}</p>}
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
