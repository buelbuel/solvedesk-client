import GenericCrudPage from 'components/templates/GenericCrudPage'

/**
 * Represents a ticket object.
 * @typedef {Object} Ticket
 * @property {number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined} ticketNumber - The ticket number.
 * @property {number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined} subject - The subject of the ticket.
 * @property {number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined} description - The description of the ticket.
 * @property {number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined} email - The email associated with the ticket.
 */

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
	renderModalContent: (ticket /** @type {Ticket} */) => (
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

/**
 * Functional component for rendering Tickets page.
 * @returns {JSX.Element} JSX element representing the Tickets page.
 */
export default function Tickets() {
	return <GenericCrudPage entityConfig={ticketsConfig} />
}
