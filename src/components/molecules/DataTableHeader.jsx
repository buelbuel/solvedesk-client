import { For } from 'solid-js'
import './DataTableHeader.scss'

/**
 * Component props for DataTableHeader.
 * @typedef {Object} DataTableHeaderProps
 * @property {Array<{ header: string }>} columns - Array of column headers.
 */

/**
 * DataTableHeader component for rendering the header of a data table.
 *
 * @param {DataTableHeaderProps} props - Component props.
 * @returns {JSX.Element} - Rendered DataTableHeader component.
 * @example
 * // Example usage:
 * <DataTableHeader columns={[{ header: 'Name' }, { header: 'Age' }]} />
 */
export default function DataTableHeader(props) {
	return (
		<thead class="data-table-header">
			<tr class="data-table-header-row">
				{/* Render column headers */}
				<For each={props.columns}>
					{column => (
						<th scope="col" class="data-table-header-row-cell">
							{column.header}
						</th>
					)}
				</For>
				{/* Render Actions column header */}
				<th scope="col" class="data-table-header-row-cell">
					Actions
				</th>
			</tr>
		</thead>
	)
}
