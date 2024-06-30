import { createSignal } from 'solid-js'
import { CgSearch } from 'solid-icons/cg'
import Input from 'components/atoms/Input'
import './SearchInput.scss'

/**
 * SearchInput component for handling search input with an icon.
 *
 * @param {Object} props - Props object for SearchInput component.
 * @param {Function} props.onSearch - Callback function invoked when search term changes.
 * @returns {JSX.Element} - Rendered SearchInput component.
 * @example
 * // Example usage:
 * // <SearchInput onSearch={(term) => console.log(term)} />
 */
export default function SearchInput(props) {
	const [searchTerm, setSearchTerm] = createSignal('')

	/**
	 * Event handler for input change.
	 * Updates the search term state and invokes the onSearch callback.
	 *
	 * @param {Event} event - Input change event object.
	 */
	const handleInputChange = event => {
		const target = event.target
		setSearchTerm(target.value)
		props.onSearch(target.value)
	}

	return (
		<div class="search-input">
			<label for="search-input-field" class="sr-only">
				Search
			</label>
			<label class="search-input-icon" for="search-input-field">
				<CgSearch />
			</label>
			<Input
				type="text"
				placeholder="Search..."
				onInput={handleInputChange}
				value={searchTerm()}
				id="search-input-field"
				className="search-input-field"
			/>
		</div>
	)
}
