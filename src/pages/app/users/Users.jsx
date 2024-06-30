import { createSignal, createEffect, For } from 'solid-js'
import { A } from '@solidjs/router'
import { MetaProvider, Title, Link } from '@solidjs/meta'
import { useAuth } from 'context/AuthContext'

/**
 * Represents a user object.
 * @typedef {Object} User
 * @property {string} id - The user's ID.
 * @property {string} subject - The user's subject.
 */

const API_URL = import.meta.env.VITE_SERVER_URL

/**
 * Component for displaying a list of users.
 * @returns {JSX.Element} JSX for the Users component.
 */
export default function Users() {
	const [users, setUsers] = createSignal([])
	const [loading, setLoading] = createSignal(false)
	const [totalPages, setTotalPages] = createSignal(1)
	const [currentPage, setCurrentPage] = createSignal(1)
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated()) {
		return <div>Please login to access the dashboard.</div>
	}

	/**
	 * Fetches users from the API based on the page number.
	 * @param {number} page - The page number to fetch.
	 */
	const fetchUsers = async page => {
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

	/**
	 * Handles the page change event.
	 * @param {Event} event - The event object.
	 */
	const handlePageChange = event => {
		const selectedPage = event.target.value
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
