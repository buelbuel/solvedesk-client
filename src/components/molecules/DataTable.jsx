import DataTableHeader from './DataTableHeader'
import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'
import Loading from 'components/atoms/Loading'
import './DataTable.scss'

/**
 * Props for the DataTable component.
 * @typedef {Object} DataTableProps
 * @property {boolean} loading - Loading state of the table.
 * @property {Array<{ header: string; accessor: string }>} columns - Column configuration for the table.
 * @property {any[]} data - Data to populate the table rows.
 * @property {(id: any) => void} onEdit - Callback for edit action.
 * @property {(id: any) => void} onPreview - Callback for preview action.
 * @property {(id: any) => void} onNavigate - Callback for navigation action.
 * @property {number} currentPage - Current page number.
 * @property {number} totalPages - Total number of pages.
 * @property {number} itemsPerPage - Number of items per page.
 * @property {(page: number) => void} onPageChange - Callback for page change.
 * @property {(event: Event) => void} onItemsPerPageChange - Callback for items per page change.
 */

/**
 * DataTable component for rendering a data table with loading state and pagination.
 *
 * @param {DataTableProps} props - Component props.
 * @returns {JSX.Element} - Rendered DataTable component.
 */
export default function DataTable(props) {
	return (
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
}
