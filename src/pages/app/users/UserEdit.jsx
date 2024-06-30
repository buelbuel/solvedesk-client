import { createSignal, createEffect } from 'solid-js'
import { useParams, useNavigate } from '@solidjs/router'
import { MetaProvider, Title, Link } from '@solidjs/meta'
import './UserEdit.scss'

/**
 * Represents a user edit component.
 */
export default function UserEdit() {
	const params = useParams()
	const navigate = useNavigate()
	const [ticket, setTicket] = createSignal({ title: '', description: '' })

	createEffect(() => {
		/**
		 * Fetches the ticket data from the server.
		 */
		const fetchTicket = async () => {
			const response = await fetch(`/api/tickets/${params.id}`)
			const data = await response.json()
			setTicket(data)
		}
		fetchTicket()
	})

	/**
	 * Handles the form submission to update the ticket.
	 * @param {Event} event - The form submission event.
	 */
	const handleSubmit = async event => {
		event.preventDefault()
		await fetch(`/api/tickets/${params.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(ticket())
		})
		navigate(`/app/tickets/${params.id}`)
	}

	return (
		<MetaProvider>
			<Title>SolveDesk</Title>
			<Link rel="canonical" href="http://solvedesk.de/" />

			<section class="ticket-edit-page">
				<h1>Edit Ticket</h1>
				<form onSubmit={handleSubmit}>
					<label>
						Title:
						<input
							type="text"
							value={ticket().title}
							onInput={e =>
								setTicket({
									...ticket(),
									title: e.target.value
								})
							}
						/>
					</label>
					<label>
						Description:
						<textarea
							value={ticket().description}
							onInput={e =>
								setTicket({
									...ticket(),
									description: e.target.value
								})
							}
						/>
					</label>
					<button type="submit">Save</button>
				</form>
			</section>
		</MetaProvider>
	)
}
