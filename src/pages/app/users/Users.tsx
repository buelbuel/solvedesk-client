import { createSignal, createEffect, For } from 'solid-js'
import { A } from '@solidjs/router'
import { MetaProvider, Title, Link } from '@solidjs/meta'
import { useAuth } from 'context/AuthContext'

interface User {
	id: string
	subject: string
}

const API_URL = import.meta.env.VITE_SERVER_URL

export default function Users() {
	const [users, setUsers] = createSignal<User[]>([])
	const [loading, setLoading] = createSignal(false)
	const [totalPages, setTotalPages] = createSignal(1)
	const [currentPage, setCurrentPage] = createSignal(1)
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated()) {
		return <div>Please login to access the dashboard.</div>
	}

	const fetchUsers = async (page: number) => {
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(`${API_URL}/users?page=${page}&pageSize=20`, {
				headers: {
					Authorization: `${token}`
				}
			})
			if (!response.ok) {
				throw new Error('Failed to fetch tickets')
			}
			const data = await response.json()
			setUsers(data.users)
			setTotalPages(data.totalPages)
		} catch (error) {
			console.error('Error fetching users:', error)
		} finally {
			setLoading(false)
		}
	}

	createEffect(() => {
		fetchUsers(currentPage())
	})

	const handlePageChange = (event: Event) => {
		const selectedPage = (event.target as HTMLSelectElement).value
		setCurrentPage(parseInt(selectedPage))
	}

	return (
		<MetaProvider>
			<Title>SolveDesk</Title>
			<Link rel="canonical" href="http://solvedesk.de/" />

			<section class="users-page">
				<h1>All Users</h1>
				{loading() ? (
					<p>Loading...</p>
				) : (
					<ul>
						<For each={users()} fallback={<li>No users found.</li>}>
							{user => (
								<li>
									<A href={`/app/users/${user.id}`}>{user.subject}</A>
								</li>
							)}
						</For>
					</ul>
				)}
				{/* Pagination select dropdown */}
				<nav class="pagination">
					<label for="pageSelect">Page:</label>
					<select id="pageSelect" value={currentPage()} onChange={handlePageChange}>
						{Array.from({ length: totalPages() }, (_, i) => i + 1).map(page => (
							<option value={page}>{page}</option>
						))}
					</select>
				</nav>
			</section>
		</MetaProvider>
	)
}
