import { For, JSX } from 'solid-js'
import './DataTableHeader.scss'

interface DataTableHeaderProps {
	columns: { header: string }[]
}

/**
 * DataTableHeader component for rendering the header of a data table.
 *
 * @param {DataTableHeaderProps} props - Component props.
 * @param {{ header: string }[]} props.columns - Array of column headers.
 *
 * @returns {JSX.Element} - Rendered DataTableHeader component.
 * @source src/components/organisms/DataTableHeader.tsx
 */
export default function DataTableHeader(props: DataTableHeaderProps): JSX.Element {
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
