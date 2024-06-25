import { createSignal, createEffect, For } from 'solid-js'
import { MetaProvider, Title, Link } from '@solidjs/meta'
import { A } from '@solidjs/router'
import { useAuth } from 'context/AuthContext'
import './Tickets.scss'

// Define the Ticket type
interface Ticket {
	id: string
	subject: string
	// Add other properties if needed
}

// Define the API URL
const API_URL = import.meta.env.VITE_SERVER_URL

function Tickets() {
	const [tickets, setTickets] = createSignal<Ticket[]>([])
	const [loading, setLoading] = createSignal(false)
	const [totalPages, setTotalPages] = createSignal(1)
	const [currentPage, setCurrentPage] = createSignal(1)
	//const { isAuthenticated } = useAuth();

    //if (!isAuthenticated()) {
    //    return <div>Please login to access the dashboard.</div>;
    //}

	const fetchTickets = async (page: number) => {
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(
				`${API_URL}/tickets?page=${page}&pageSize=20`,
				{
					headers: {
						Authorization: `${token}`
					}
				}
			)
			if (!response.ok) {
				throw new Error('Failed to fetch tickets')
			}
			const data = await response.json()
			setTickets(data.tickets)
			setTotalPages(data.totalPages)
		} catch (error) {
			console.error('Error fetching tickets:', error)
		} finally {
			setLoading(false)
		}
	}

	createEffect(() => {
		fetchTickets(currentPage())
	})

	// Handle page change
	const handlePageChange = (event: Event) => {
		const selectedPage = (event.target as HTMLSelectElement).value
		setCurrentPage(parseInt(selectedPage))
	}

	return (
		<MetaProvider>
			<Title>SolveDesk</Title>
			<Link rel="canonical" href="http://solvedesk.de/" />

			<section class="tickets-page">
				<h1>All Tickets</h1>
				{loading() ? (
					<p>Loading...</p>
				) : (
					<ul>
						<For
							each={tickets()}
							fallback={<li>No tickets found.</li>}
						>
							{ticket => (
								<li>
									<A href={`/app/tickets/${ticket.id}`}>
										{ticket.subject}
									</A>
								</li>
							)}
						</For>
					</ul>
				)}
				{/* Pagination select dropdown */}
				<nav class="pagination">
					<label for="pageSelect">Page:</label>
					<select
						id="pageSelect"
						value={currentPage()}
						onChange={handlePageChange}
					>
						{Array.from(
							{ length: totalPages() },
							(_, i) => i + 1
						).map(page => (
							<option value={page}>{page}</option>
						))}
					</select>
				</nav>
			</section>
		</MetaProvider>
	)
}

export default Tickets
