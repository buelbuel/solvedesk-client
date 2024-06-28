import './DataTableFooter.scss'
import DataPagination from './DataPagination'
import { For } from 'solid-js'

const DataTableFooter = (props: {
	currentPage: number
	totalPages: number
	itemsPerPage: number
	onPageChange: (page: number) => void
	onItemsPerPageChange: (event: Event) => void
	columns: any
}) => (
	<tfoot class="data-table-footer">
		<tr class="data-table-footer-row">
			<For each={props.columns}>{() => <th scope="col" class="data-table-footer-row-cell"></th>}</For>
			<th scope="col" class="data-table-footer-row-cell">
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

export default DataTableFooter
