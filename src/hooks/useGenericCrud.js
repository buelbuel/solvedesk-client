import { createSignal, createEffect, createMemo } from 'solid-js'

/**
 * Hook for handling generic CRUD operations.
 * @param {Object} entityConfig - Configuration object for the entity.
 * @param {string} [entityConfig.pageTitle] - Title of the page.
 * @param {string} entityConfig.entityName - Name of the entity.
 * @param {Array} [entityConfig.columns] - Columns for the entity.
 * @param {Function} [entityConfig.renderModalContent] - Function to render modal content.
 * @param {string} entityConfig.apiEndpoint - API endpoint for fetching data.
 * @param {Array} entityConfig.searchFields - Fields to search within.
 * @param {Function} [entityConfig.onEdit] - Function to handle edit action.
 * @param {Function} [entityConfig.onNavigate] - Function to handle navigation action.
 * @returns {Object} - Object containing CRUD operations and state.
 */
export default function useGenericCrud(entityConfig) {
	function getItemsPerPageFromCookie() {
		const cookies = document.cookie.split('; ')
		const pageSizeCookie = cookies.find(cookie => cookie.startsWith('itemsPerPage='))
		if (pageSizeCookie) {
			return parseInt(pageSizeCookie.split('=')[1])
		}
		return 25
	}

	function saveItemsPerPageToCookie(itemsPerPage) {
		document.cookie = `itemsPerPage=${itemsPerPage}; max-age=${30 * 24 * 60 * 60}; path=/`
	}

	const [items, setItems] = createSignal([])
	const [loading, setLoading] = createSignal(false)
	const [totalPages, setTotalPages] = createSignal(1)
	const [currentPage, setCurrentPage] = createSignal(1)
	const [itemsPerPage, setItemsPerPage] = createSignal(getItemsPerPageFromCookie())
	const [searchTerm, setSearchTerm] = createSignal('')
	const [openModal, setOpenModal] = createSignal(false)
	const [selectedItem, setSelectedItem] = createSignal(null)

	const fetchItems = async (page, pageSize) => {
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(`${entityConfig.apiEndpoint}?page=${page}&pageSize=${pageSize}`, {
				headers: {
					Authorization: `${token}`
				}
			})
			if (!response.ok) {
				throw new Error(`Failed to fetch ${entityConfig.entityName}`)
			}
			const data = await response.json()
			setItems(data[entityConfig.entityName])
			setTotalPages(data.totalPages)
		} catch (error) {
			console.error(`Error fetching ${entityConfig.entityName}:`, error)
		} finally {
			setLoading(false)
		}
	}

	createEffect(() => {
		fetchItems(currentPage(), itemsPerPage())
		saveItemsPerPageToCookie(itemsPerPage())
	})

	const handlePageChange = page => {
		setCurrentPage(page)
	}

	const handleItemsPerPageChange = event => {
		const target = event.target
		const selectedPageSize = parseInt(target.value)
		setItemsPerPage(selectedPageSize)
		setCurrentPage(1)
		fetchItems(1, selectedPageSize)
	}

	const handleSearch = term => {
		setSearchTerm(term)
	}

	const filteredItems = createMemo(() => {
		const term = searchTerm().toLowerCase()
		return items().filter(item =>
			entityConfig.searchFields.some(field => String(item[field]).toLowerCase().includes(term))
		)
	})

	const handleEdit = id => {
		entityConfig.onEdit(id)
	}

	const handlePreview = id => {
		const item = items().find(item => item.id === id)
		if (item) {
			setSelectedItem(item)
			setOpenModal(true)
		}
	}

	const handleNavigate = id => {
		entityConfig.onNavigate(id)
	}

	return {
		items,
		loading,
		totalPages,
		currentPage,
		itemsPerPage,
		searchTerm,
		handlePageChange,
		handleItemsPerPageChange,
		handleSearch,
		filteredItems,
		handleEdit,
		handlePreview,
		handleNavigate,
		openModal,
		setOpenModal,
		selectedItem
	}
}
