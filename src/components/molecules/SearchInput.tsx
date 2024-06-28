// components/molecules/SearchInput.tsx

import { createSignal } from 'solid-js'
import Input from 'components/atoms/Input'
import { CgSearch } from 'solid-icons/cg'
import './SearchInput.scss'

const SearchInput = (props: { onSearch: (term: string) => void }) => {
	const [searchTerm, setSearchTerm] = createSignal('')

	const handleInputChange = (event: Event) => {
		const target = event.target as HTMLInputElement
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

export default SearchInput
