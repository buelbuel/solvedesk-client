import './DataPagination.scss'
import Fieldset from './Fieldset'

const DataPagination = (props: {
	currentPage: number
	onPageChange: (page: number) => void
	totalPages: number
	itemsPerPage: number
	onItemsPerPageChange: (event: Event) => void
}) => (
	<nav class="pagination">
		<Fieldset labelFor="pageSelect" labelText="Page:">
			<select
				id="pageSelect"
				value={props.currentPage}
				onChange={e => props.onPageChange(parseInt(e.currentTarget.value))}
			>
				{Array.from({ length: props.totalPages }, (_, i) => i + 1).map(page => (
					<option value={page}>{page}</option>
				))}
			</select>
		</Fieldset>

		<Fieldset labelFor="itemsPerPage" labelText="Items:">
			<select id="itemsPerPage" value={props.itemsPerPage} onChange={props.onItemsPerPageChange}>
				<option value="25">25</option>
				<option value="50">50</option>
				<option value="100">100</option>
				<option value="200">200</option>
			</select>
		</Fieldset>
	</nav>
)

export default DataPagination
