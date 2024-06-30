import GenericCrudPage from 'components/templates/GenericCrudPage'
import { JSX } from 'solid-js/jsx-runtime'

const ticketsConfig = {
	entityName: 'tickets',
	pageTitle: 'Tickets',
	apiEndpoint: `${import.meta.env.VITE_SERVER_URL}/tickets`,
	columns: [
		{ header: 'Ticket Number', accessor: 'ticketNumber' },
		{ header: 'Subject', accessor: 'subject' },
		{ header: 'Description', accessor: 'description' },
		{ header: 'Email', accessor: 'email' }
	],
	searchFields: ['ticketNumber', 'subject', 'description', 'email'],
	renderModalContent: (ticket: {
		ticketNumber: number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined
		subject: number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined
		description: number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined
		email: number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined
	}) => (
		<>
			<p>
				<strong>Ticket Number:</strong> {ticket.ticketNumber}
			</p>
			<p>
				<strong>Subject:</strong> {ticket.subject}
			</p>
			<p>
				<strong>Description:</strong> {ticket.description}
			</p>
			<p>
				<strong>Email:</strong> {ticket.email}
			</p>
		</>
	)
}

export default function Tickets() {
	return <GenericCrudPage entityConfig={ticketsConfig} />
}
