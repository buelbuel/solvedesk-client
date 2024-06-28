import { For } from 'solid-js'
import './DataTableHeader.scss'

const DataTableHeader = (props: { columns: any }) => (
	<thead class="data-table-header">
		<tr class="data-table-header-row">
			<For each={props.columns}>
				{column => (
					<th scope="col" class="data-table-header-row-cell">
						{column.header}
					</th>
				)}
			</For>
			<th scope="col" class="data-table-header-row-cell">
				Actions
			</th>
		</tr>
	</thead>
)

export default DataTableHeader
