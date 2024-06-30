export interface EntityConfig {
	entityName: string
	pageTitle: string
	columns: any[]
	renderModalContent: (item: any) => JSX.Element
	apiEndpoint?: string
	searchFields?: string[]
	onEdit?: (id: string) => void
	onNavigate?: (id: string) => void
}
