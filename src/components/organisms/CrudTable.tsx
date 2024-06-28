import { createSignal } from 'solid-js'
import DataTable from 'components/molecules/DataTable'
import './CrudTable.scss'

const CrudTable = (props: {
	onPageChange: (page: number) => void
	onItemsPerPageChange: (event: Event) => void
	columns: any
	data: any
	loading: any
	onEdit: any
	onPreview: any
	onNavigate: any
	currentPage: number
	totalPages: number
	itemsPerPage: number
}) => {
	const [currentPage, setCurrentPage] = createSignal(props.currentPage)
	const [itemsPerPage, setItemsPerPage] = createSignal(props.itemsPerPage)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		props.onPageChange(page)
	}

	const handleItemsPerPageChange = (event: Event) => {
		const target = event.target as HTMLSelectElement
		const selectedPageSize = parseInt(target.value)
		setItemsPerPage(selectedPageSize)
		setCurrentPage(1)
		props.onItemsPerPageChange(event)
	}

	return (
		<section class="crud-table">
			<DataTable
				columns={props.columns}
				data={props.data}
				loading={props.loading}
				onEdit={props.onEdit}
				onPreview={props.onPreview}
				onNavigate={props.onNavigate}
				currentPage={currentPage()}
				totalPages={props.totalPages}
				itemsPerPage={itemsPerPage()}
				onPageChange={handlePageChange}
				onItemsPerPageChange={handleItemsPerPageChange}
			/>
		</section>
	)
}

export default CrudTable
