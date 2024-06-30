import { createSignal } from 'solid-js'
import DataTable from 'components/molecules/DataTable'
import './CrudTable.scss'

/**
 * CrudTable component for displaying CRUD data with pagination.
 *
 * @param {Object} props - Props object for CrudTable component.
 * @param {Function} props.onPageChange - Callback function invoked when page changes.
 * @param {Function} props.onItemsPerPageChange - Callback function invoked when items per page changes.
 * @param {Array} props.columns - Array of column configurations for DataTable.
 * @param {Array} props.data - Array of data rows to display in DataTable.
 * @param {boolean} props.loading - Loading indicator for data retrieval.
 * @param {Function} props.onEdit - Callback function for editing an item.
 * @param {Function} props.onPreview - Callback function for previewing an item.
 * @param {Function} props.onNavigate - Callback function for navigating to an item.
 * @param {number} props.currentPage - Current page number.
 * @param {number} props.totalPages - Total number of pages.
 * @param {number} props.itemsPerPage - Number of items per page.
 *
 * @returns {JSX.Element} - Rendered CrudTable component.
 * @source src/organisms/CrudTable.tsx
 */
export default function CrudTable(props: {
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
}) {
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
