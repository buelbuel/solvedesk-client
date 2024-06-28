import { For } from 'solid-js'
import DataTableRow from './DataTableRow'
import './DataTableBody.scss'

const DataTableBody = (props: { data: any; columns: any; onEdit: any; onPreview: any; onNavigate: any }) => (
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

export default DataTableBody
