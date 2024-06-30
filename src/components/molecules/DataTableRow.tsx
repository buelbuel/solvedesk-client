// src/components/molecules/DataTableRow.tsx

import { CgEye, CgPen } from 'solid-icons/cg'
import { JSX } from 'solid-js'
import { For } from 'solid-js'
import Button from 'components/atoms/Button'
import './DataTableRow.scss'

interface Column {
	accessor: string
	header: string
}

interface Row {
	[key: string]: number | boolean | JSX.Element | string | null | undefined
	id: any
}

interface DataTableRowProps {
	onNavigate: (id: any) => void
	onEdit: (id: any) => void
	onPreview: (id: any) => void
	row: Row
	columns: Column[]
}

/**
 * DataTableRow component for rendering a single row in the data table.
 *
 * @param {DataTableRowProps} props - Component props.
 * @returns {JSX.Element} - Rendered DataTableRow component.
 * @source src/components/molecules/DataTableRow.tsx
 */
export default function DataTableRow(props: DataTableRowProps) {
	return (
		<tr class="data-table-row" onClick={() => props.onNavigate(props.row.id)}>
			<For each={props.columns}>{column => <td class="data-table-row-cell">{props.row[column.accessor]}</td>}</For>
			<td class="data-table-row-cell">
				<div class="data-table-row-actions">
					<Button
						type="button"
						onClick={e => {
							e.stopPropagation()
							props.onEdit(props.row.id)
						}}
						variant="light"
					>
						<CgPen />
						Edit
					</Button>
					<Button
						type="button"
						onClick={e => {
							e.stopPropagation()
							props.onPreview(props.row.id)
						}}
						variant="light"
					>
						<CgEye />
						Preview
					</Button>
				</div>
			</td>
		</tr>
	)
}
