import { MetaProvider, Title } from '@solidjs/meta'
import { useNavigate } from '@solidjs/router'
import { useAuth } from 'context/AuthContext'
import useGenericCrud from 'hooks/useGenericCrud'
import CrudTable from 'components/organisms/CrudTable'
import CrudHeader from 'components/organisms/CrudHeader'
import ErrorMessage from 'components/atoms/ErrorMessage'
import ModalOverflow from 'components/atoms/ModalOverflow'

/**
 * Render CRUD (Create, Read, Update, Delete) pages for various entities.
 * @param {Object} props - The component props.
 * @param {Object} props.entityConfig - Configuration for the entity being managed.
 * @param {string} props.entityConfig.entityName - The name of the entity (e.g., "tickets").
 * @param {string} props.entityConfig.pageTitle - The title of the CRUD page.
 * @param {Array} props.entityConfig.columns - Column configuration for the CrudTable component.
 * @param {function} props.entityConfig.renderModalContent - Function to render content in the modal.
 * @param {string} [props.entityConfig.apiEndpoint] - API endpoint for fetching data.
 * @param {Array} [props.entityConfig.searchFields] - Fields to search within.
 * @param {function} [props.entityConfig.onEdit] - Custom handler for the edit action.
 * @param {function} [props.entityConfig.onNavigate] - Custom handler for the navigate action.
 * @returns {JSX.Element} - The rendered component.
 */
export default function GenericCrudPage(props) {
	const { isAuthenticated } = useAuth()
	const navigate = useNavigate()

	if (!isAuthenticated()) {
		return <ErrorMessage message="Please login to access the dashboard." />
	}

	const {
		loading,
		totalPages,
		currentPage,
		itemsPerPage,
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
	} = useGenericCrud({
		...props.entityConfig,
		apiEndpoint: props.entityConfig.apiEndpoint || '',
		searchFields: props.entityConfig.searchFields || [],
		onEdit: id => navigate(`/app/${props.entityConfig.entityName}/edit/${id}`),
		onNavigate: id => navigate(`/app/${props.entityConfig.entityName}/${id}`)
	})

	return (
		<MetaProvider>
			<Title>{props.entityConfig.pageTitle} - SolveDesk</Title>

			<section class={`${props.entityConfig.entityName}-page`}>
				<CrudHeader title={props.entityConfig.pageTitle} onSearch={handleSearch} />
				<CrudTable
					data={filteredItems()}
					columns={props.entityConfig.columns}
					loading={loading()}
					totalPages={totalPages()}
					currentPage={currentPage()}
					onPageChange={handlePageChange}
					onEdit={handleEdit}
					onPreview={handlePreview}
					onNavigate={handleNavigate}
					itemsPerPage={itemsPerPage()}
					onItemsPerPageChange={handleItemsPerPageChange}
				/>
			</section>
			{openModal() && (
				<ModalOverflow open={openModal} setOpen={setOpenModal}>
					<div class="modal-overflow-content">
						<h2>{props.entityConfig.entityName} Details</h2>
						{props.entityConfig.renderModalContent(selectedItem())}
					</div>
				</ModalOverflow>
			)}
		</MetaProvider>
	)
}
