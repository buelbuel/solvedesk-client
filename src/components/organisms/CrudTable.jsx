import { createSignal } from 'solid-js'
import DataTable from 'components/molecules/DataTable'
import './CrudTable.scss'

/**
 * Component for displaying CRUD data with pagination.
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
 * @example
 * const columns = [
 *   { header: 'ID', accessor: 'id' },
 *   { header: 'Name', accessor: 'name' }
 * ];
 * const data = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * <CrudTable
 *   onPageChange={(page) => console.log(`Page changed to ${page}`)}
 *   onItemsPerPageChange={(event) => console.log(`Items per page changed`)}
 *   columns={columns}
 *   data={data}
 *   loading={false}
 *   onEdit={(item) => console.log(`Editing item: ${item}`)}
 *   onPreview={(item) => console.log(`Previewing item: ${item}`)}
 *   onNavigate={(item) => console.log(`Navigating to item: ${item}`)}
 *   currentPage={1}
 *   totalPages={5}
 *   itemsPerPage={10}
 * />
 *
 * @returns {JSX.Element} - Rendered CrudTable component.
 */
export default function CrudTable(props) {
	const [currentPage, setCurrentPage] = createSignal(props.currentPage)
	const [itemsPerPage, setItemsPerPage] = createSignal(props.itemsPerPage)

	const handlePageChange = page => {
		setCurrentPage(page)
		props.onPageChange(page)
	}

	const handleItemsPerPageChange = event => {
		const target = event.target
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
