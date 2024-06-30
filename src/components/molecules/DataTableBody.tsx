import { For, JSX } from 'solid-js'
import DataTableRow from './DataTableRow'
import './DataTableBody.scss'

interface DataTableBodyProps {
	data: any[]
	columns: { header: string; accessor: string }[]
	onEdit: (id: any) => void
	onPreview: (id: any) => void
	onNavigate: (id: any) => void
}

/**
 * DataTableBody component for rendering the body of a data table.
 *
 * @param {DataTableBodyProps} props - Component props.
 * @param {any[]} props.data - Array of data objects to render rows.
 * @param {Array<{ header: string; accessor: string }>} props.columns - Column configuration for the table.
 * @param {(id: any) => void} props.onEdit - Callback for edit action.
 * @param {(id: any) => void} props.onPreview - Callback for preview action.
 * @param {(id: any) => void} props.onNavigate - Callback for navigation action.
 *
 * @returns {JSX.Element} - Rendered DataTableBody component.
 * @source src/components/organisms/DataTableBody.tsx
 */
export default function DataTableBody(props: DataTableBodyProps): JSX.Element {
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
