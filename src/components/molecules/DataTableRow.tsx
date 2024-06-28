// components/molecules/DataTableRow.tsx

import { CgEye, CgPen } from 'solid-icons/cg'
import { JSX } from 'solid-js/jsx-runtime'
import { For } from 'solid-js'
import Button from 'components/atoms/Button'
import './DataTableRow.scss'

const DataTableRow = (props: {
	onNavigate: (id: any) => void
	onEdit: (id: any) => void
	onPreview: (id: any) => void // Add onPreview handler
	row: {
		[x: string]: number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined
		id: any
	}
	columns: any
}) => (
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
						props.onPreview(props.row.id) // Trigger onPreview handler
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

export default DataTableRow
