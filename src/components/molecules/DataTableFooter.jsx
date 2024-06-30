import { For } from 'solid-js'
import DataPagination from './DataPagination'
import './DataTableFooter.scss'

/**
 * Props for DataTableFooter component.
 * @typedef {Object} DataTableFooterProps
 * @property {number} currentPage - Current page number.
 * @property {number} totalPages - Total number of pages.
 * @property {number} itemsPerPage - Number of items per page.
 * @property {(page: number) => void} onPageChange - Callback function for page change.
 * @property {(event: Event) => void} onItemsPerPageChange - Callback function for items per page change.
 * @property {{ header: string }[]} columns - Array of column headers.
 */

/**
 * DataTableFooter component for rendering the footer of a data table.
 * Includes pagination controls using DataPagination component.
 *
 * @param {DataTableFooterProps} props - Component props.
 * @returns {JSX.Element} - Rendered DataTableFooter component.
 */
export default function DataTableFooter(props) {
	return (
		<tfoot class="data-table-footer">
			<tr class="data-table-footer-row">
				<For each={props.columns}>
					{column => (
						<th scope="col" class="data-table-footer-row-cell">
							{/* Render column headers */}
							{column.header}
						</th>
					)}
				</For>
				<th scope="col" class="data-table-footer-row-cell">
					{/* Render pagination component */}
					<DataPagination
						currentPage={props.currentPage}
						totalPages={props.totalPages}
						itemsPerPage={props.itemsPerPage}
						onPageChange={props.onPageChange}
						onItemsPerPageChange={props.onItemsPerPageChange}
					/>
				</th>
			</tr>
		</tfoot>
	)
}
