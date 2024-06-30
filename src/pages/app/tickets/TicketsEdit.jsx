import { createSignal, createEffect } from 'solid-js'
import { useParams, useNavigate } from '@solidjs/router'
import { MetaProvider, Title } from '@solidjs/meta'

/**
 * Represents a ticket for editing.
 * @typedef {Object} Ticket
 * @property {string} title - The title of the ticket.
 * @property {string} description - The description of the ticket.
 */

/**
 * Function component for editing tickets.
 * @returns {JSX.Element} The JSX element for editing tickets.
 */
export default function TicketsEdit() {
	const params = useParams()
	const navigate = useNavigate()
	const [ticket, setTicket] = createSignal({ title: '', description: '' })

	createEffect(() => {
		const fetchTicket = async () => {
			const response = await fetch(`/api/tickets/${params.id}`)
			const data = await response.json()
			setTicket(data)
		}
		fetchTicket()
	})

	/**
	 * Handles the form submission for updating a ticket.
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
