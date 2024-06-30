import { For } from 'solid-js'
import DataTableRow from './DataTableRow'
import './DataTableBody.scss'

/**
 * Component props for DataTableBody.
 * @typedef {Object} DataTableBodyProps
 * @property {any[]} data - Array of data objects to render rows.
 * @property {Array<{ header: string; accessor: string }>} columns - Column configuration for the table.
 * @property {(id: any) => void} onEdit - Callback for edit action.
 * @property {(id: any) => void} onPreview - Callback for preview action.
 * @property {(id: any) => void} onNavigate - Callback for navigation action.
 */

/**
 * DataTableBody component for rendering the body of a data table.
 *
 * @param {DataTableBodyProps} props - Component props.
 * @returns {JSX.Element} - Rendered DataTableBody component.
 */
export default function DataTableBody(props) {
	return (
		<tbody class="data-table-body">
			<For each={props.data}>
				{row => (
					<DataTableRow
						row={row}
						columns={props.columns}
						onEdit={props.onEdit}
						onPreview={props.onPreview}
						onNavigate={props.onNavigate}
					/>
				)}
			</For>
		</tbody>
	)
}
