import { useParams, useNavigate } from '@solidjs/router'
import { createSignal, createEffect } from 'solid-js'
import { MetaProvider, Title } from '@solidjs/meta'
import './TicketsEdit.scss'

const TicketsEdit = () => {
	const params = useParams()
	const navigate = useNavigate()
	const [ticket, setTicket] = createSignal({ title: '', description: '' })

	createEffect(() => {
		// Fetch ticket by ID and set the state
		const fetchTicket = async () => {
			const response = await fetch(`/api/tickets/${params.id}`)
			const data = await response.json()
			setTicket(data)
		}
		fetchTicket()
	})

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault()
		// Update ticket
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

export default TicketsEdit
