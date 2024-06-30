import { CgEye, CgPen } from 'solid-icons/cg'
import { For } from 'solid-js'
import Button from 'components/atoms/Button'
import './DataTableRow.scss'

/**
 * Represents a column in the data table.
 * @typedef {Object} Column
 * @property {string} accessor - The accessor for the column.
 * @property {string} header - The header of the column.
 */

/**
 * Represents a row in the data table.
 * @typedef {Object} Row
 * @property {any} id - The id of the row.
 */

/**
 * Props for the DataTableRow component.
 * @typedef {Object} DataTableRowProps
 * @property {(id: any) => void} onNavigate - Function to handle navigation.
 * @property {(id: any) => void} onEdit - Function to handle editing.
 * @property {(id: any) => void} onPreview - Function to handle preview.
 * @property {Row} row - The row data.
 * @property {Column[]} columns - Array of columns.
 */

/**
 * DataTableRow component for rendering a single row in the data table.
 *
 * @param {DataTableRowProps} props - Component props.
 * @returns {JSX.Element} - Rendered DataTableRow component.
 * @example
 * <DataTableRow
 *   onNavigate={handleNavigate}
 *   onEdit={handleEdit}
 *   onPreview={handlePreview}
 *   row={{ id: 1, column1: 'Data1', column2: 'Data2' }}
 *   columns={[{ accessor: 'column1', header: 'Column 1' }, { accessor: 'column2', header: 'Column 2' }]}
 * />
 */
export default function DataTableRow(props) {
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
