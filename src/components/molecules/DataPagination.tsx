import { JSX } from 'solid-js'
import Fieldset from './Fieldset'
import './DataPagination.scss'

interface DataPaginationProps {
	currentPage: number
	onPageChange: (page: number) => void
	totalPages: number
	itemsPerPage: number
	onItemsPerPageChange: (event: Event) => void
}

/**
 * DataPagination component for rendering pagination controls.
 *
 * @param {DataPaginationProps} props - Component props.
 * @param {number} props.currentPage - Current page number.
 * @param {(page: number) => void} props.onPageChange - Function to handle page change.
 * @param {number} props.totalPages - Total number of pages.
 * @param {number} props.itemsPerPage - Number of items per page.
 * @param {(event: Event) => void} props.onItemsPerPageChange - Function to handle items per page change.
 *
 * @returns {JSX.Element} - Rendered pagination component.
 * @source src/components/molecules/DataPagination.tsx
 */
export default function DataPagination(props: DataPaginationProps): JSX.Element {
	return (
		<nav class="pagination">
			<Fieldset labelFor="pageSelect" labelText="Page:">
				<select
					id="pageSelect"
					value={props.currentPage}
					onChange={e => props.onPageChange(parseInt(e.currentTarget.value))}
				>
					{Array.from({ length: props.totalPages }, (_, i) => i + 1).map(page => (
						<option value={page}>{page}</option>
					))}
				</select>
			</Fieldset>

			<Fieldset labelFor="itemsPerPage" labelText="Items:">
				<select id="itemsPerPage" value={props.itemsPerPage} onChange={props.onItemsPerPageChange}>
					<option value="25">25</option>
					<option value="50">50</option>
					<option value="100">100</option>
					<option value="200">200</option>
				</select>
			</Fieldset>
		</nav>
	)
}
