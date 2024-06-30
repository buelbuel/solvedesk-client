import { CgAdd, CgFilters, CgArrowDown } from 'solid-icons/cg'
import SearchInput from 'components/molecules/SearchInput'
import Button from 'components/atoms/Button'
import './CrudHeader.scss'

/**
 * CrudHeader component for managing the header section of a CRUD interface.
 *
 * @param {Object} props - Props object for CrudHeader component.
 * @param {string} props.title - Title displayed in the header.
 * @param {Function} props.onSearch - Callback function invoked when search term changes.
 *
 * @returns {JSX.Element} - Rendered CrudHeader component.
 * @source components/organisms/CrudHeader.tsx
 */
export default function CrudHeader(props: { title: string; onSearch: (term: string) => void }) {
	return (
		<div class="crud-header">
			<div class="container">
				<div class="crud-header-info">
					<h2>{props.title}</h2>
				</div>
				<div class="crud-header-actions">
					<div class="crud-header-actions-search">
						<SearchInput onSearch={props.onSearch} />
					</div>
					<div class="crud-header-actions-buttons">
						<Button variant="secondary" data-dropdown-toggle="filterDropdown" type="button">
							<CgFilters />
							Filter options
							<CgArrowDown />
						</Button>
						<Button variant="primary" type="button" data-modal-toggle="createProductModal">
							<CgAdd />
							Add product
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
