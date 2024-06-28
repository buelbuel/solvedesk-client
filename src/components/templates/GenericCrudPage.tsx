import { MetaProvider, Title } from '@solidjs/meta'
import { useAuth } from 'context/AuthContext'
import { useNavigate } from '@solidjs/router'
import CrudTable from 'components/organisms/CrudTable'
import CrudHeader from 'components/organisms/CrudHeader'
import ErrorMessage from 'components/atoms/ErrorMessage'
import ModalOverflow from 'components/atoms/ModalOverflow'
import { useGenericCrud } from 'hooks/useGenericCrud'

function GenericCrudPage(props: {
	entityConfig: {
		entityName: any
		pageTitle: any
		columns: any
		renderModalContent: any
		apiEndpoint?: any
		searchFields?: any
		onEdit?: any
		onNavigate?: any
	}
}) {
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
		onEdit: (id: any) => navigate(`/app/${props.entityConfig.entityName}/edit/${id}`),
		onNavigate: (id: any) => navigate(`/app/${props.entityConfig.entityName}/${id}`)
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

export default GenericCrudPage
