import { createSignal, createEffect, createMemo } from 'solid-js'

export default function useGenericCrud(entityConfig: {
	pageTitle?: any
	entityName: any
	columns?: any
	renderModalContent?: any
	apiEndpoint: any
	searchFields: any
	onEdit?: any
	onNavigate?: any
}) {
	function getItemsPerPageFromCookie() {
		const cookies = document.cookie.split('; ')
		const pageSizeCookie = cookies.find(cookie => cookie.startsWith('itemsPerPage='))
		if (pageSizeCookie) {
			return parseInt(pageSizeCookie.split('=')[1])
		}
		return 25
	}

	function saveItemsPerPageToCookie(itemsPerPage: number) {
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

	const fetchItems = async (page: number, pageSize: number) => {
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

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const handleItemsPerPageChange = (event: Event) => {
		const target = event.target as HTMLSelectElement
		const selectedPageSize = parseInt(target.value)
		setItemsPerPage(selectedPageSize)
		setCurrentPage(1)
		fetchItems(1, selectedPageSize)
	}

	const handleSearch = (term: string) => {
		setSearchTerm(term)
	}

	const filteredItems = createMemo(() => {
		const term = searchTerm().toLowerCase()
		return items().filter(item =>
			entityConfig.searchFields.some((field: string | number) => String(item[field]).toLowerCase().includes(term))
		)
	})

	const handleEdit = (id: any) => {
		entityConfig.onEdit(id)
	}

	const handlePreview = (id: any) => {
		const item = items().find((item: any) => item.id === id)
		if (item) {
			setSelectedItem(item)
			setOpenModal(true)
		}
	}

	const handleNavigate = (id: any) => {
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
