import { JSX } from 'solid-js'
import DataTableHeader from './DataTableHeader'
import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'
import Loading from 'components/atoms/Loading'
import './DataTable.scss'

interface DataTableProps {
	loading: boolean
	columns: { header: string; accessor: string }[]
	data: any[]
	onEdit: (id: any) => void
	onPreview: (id: any) => void
	onNavigate: (id: any) => void
	currentPage: number
	totalPages: number
	itemsPerPage: number
	onPageChange: (page: number) => void
	onItemsPerPageChange: (event: Event) => void
}

/**
 * DataTable component for rendering a data table with loading state and pagination.
 *
 * @param {DataTableProps} props - Component props.
 * @param {boolean} props.loading - Loading state of the table.
 * @param {Array<{ header: string; accessor: string }>} props.columns - Column configuration for the table.
 * @param {any[]} props.data - Data to populate the table rows.
 * @param {(id: any) => void} props.onEdit - Callback for edit action.
 * @param {(id: any) => void} props.onPreview - Callback for preview action.
 * @param {(id: any) => void} props.onNavigate - Callback for navigation action.
 * @param {number} props.currentPage - Current page number.
 * @param {number} props.totalPages - Total number of pages.
 * @param {number} props.itemsPerPage - Number of items per page.
 * @param {(page: number) => void} props.onPageChange - Callback for page change.
 * @param {(event: Event) => void} props.onItemsPerPageChange - Callback for items per page change.
 *
 * @returns {JSX.Element} - Rendered DataTable component.
 * @source src/components/organisms/DataTable.tsx
 */
export default function DataTable(props: DataTableProps): JSX.Element {
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
