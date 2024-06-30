import { For, JSX } from 'solid-js'
import DataPagination from './DataPagination'
import './DataTableFooter.scss'

interface DataTableFooterProps {
	currentPage: number
	totalPages: number
	itemsPerPage: number
	onPageChange: (page: number) => void
	onItemsPerPageChange: (event: Event) => void
	columns: { header: string }[]
}

/**
 * DataTableFooter component for rendering the footer of a data table.
 * Includes pagination controls using DataPagination component.
 *
 * @param {DataTableFooterProps} props - Component props.
 * @param {number} props.currentPage - Current page number.
 * @param {number} props.totalPages - Total number of pages.
 * @param {number} props.itemsPerPage - Number of items per page.
 * @param {(page: number) => void} props.onPageChange - Callback function for page change.
 * @param {(event: Event) => void} props.onItemsPerPageChange - Callback function for items per page change.
 * @param {{ header: string }[]} props.columns - Array of column headers.
 *
 * @returns {JSX.Element} - Rendered DataTableFooter component.
 * @source src/components/organisms/DataTableFooter.tsx
 */
export default function DataTableFooter(props: DataTableFooterProps): JSX.Element {
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
