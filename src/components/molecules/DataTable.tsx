import DataTableHeader from './DataTableHeader'
import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'
import Loading from 'components/atoms/Loading'
import './DataTable.scss'

const DataTable = (props: {
	loading: any
	columns: any
	data: any
	onEdit: any
	onPreview: any
	onNavigate: any
	currentPage: number
	totalPages: number
	itemsPerPage: number
	onPageChange: (page: number) => void
	onItemsPerPageChange: (event: Event) => void
}) => (
	<div class="data-table">
		<div class="data-table-wrapper container">
			{props.loading ? (
				<Loading />
			) : (
				<table class="data-table-wrapper-table">
					<DataTableHeader columns={props.columns} />
					<DataTableBody
						data={props.data}
						columns={props.columns}
						onEdit={props.onEdit}
						onPreview={props.onPreview}
						onNavigate={props.onNavigate}
					/>
					<DataTableFooter
						currentPage={props.currentPage}
						totalPages={props.totalPages}
						itemsPerPage={props.itemsPerPage}
						onPageChange={props.onPageChange}
						onItemsPerPageChange={props.onItemsPerPageChange}
						columns={props.columns}
					/>
				</table>
			)}
		</div>
	</div>
)

export default DataTable
