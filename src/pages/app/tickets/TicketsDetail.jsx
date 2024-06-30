import { createSignal, createEffect } from 'solid-js'
import { A, useParams } from '@solidjs/router'
import { MetaProvider, Title } from '@solidjs/meta'

/**
 * @typedef {Object} Ticket
 * @property {string} title
 * @property {string} description
 */

/**
 * Displays detailed information about a ticket.
 */
export default function TicketsDetail() {
	const params = useParams()
	const [ticket, setTicket] = createSignal(null)

	createEffect(() => {
		const fetchTicket = async () => {
			const response = await fetch(`/api/tickets/${params.id}`)
			const data = await response.json()
			setTicket(data)
		}
		fetchTicket()
	})

	return (
		<MetaProvider>
			<Title>SolveDesk</Title>

			<section class="ticket-detail-page">
				{ticket() && (
					<>
						<h1>{/** ticket().title*/}</h1>
						<p>{/**ticket().description*/}</p>
						<A href={`/app/tickets/edit/${params.id}`}>Edit Ticket</A>
					</>
				)}
			</section>
		</MetaProvider>
	)
}
