import Fieldset from './Fieldset'
import './DataPagination.scss'

/**
 * DataPagination component for rendering pagination controls.
 *
 * @typedef {Object} DataPaginationProps
 * @property {number} currentPage - Current page number.
 * @property {function} onPageChange - Function to handle page change.
 * @property {number} totalPages - Total number of pages.
 * @property {number} itemsPerPage - Number of items per page.
 * @property {function} onItemsPerPageChange - Function to handle items per page change.
 */

/**
 * Rendered pagination component.
 *
 * @param {DataPaginationProps} props - Component props.
 * @returns {JSX.Element} - Rendered pagination component.
 */
export default function DataPagination(props) {
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
