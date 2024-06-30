import { JSX } from 'solid-js'
import Navbar from 'components/organisms/Navbar'
import './AppTemplate.scss'

interface AppTemplateProps {
	children: JSX.Element
}

/**
 * AppTemplate component serves as the main layout template for the application,
 * including a navigation bar and a main content area.
 *
 * @param props AppTemplateProps
 *
 * @returns JSX
 * @source src/components/templates/AppTemplate.tsx
 */
export default function AppTemplate(props: AppTemplateProps) {
	return (
		<div class="app-template">
			<Navbar />
			<main class="content">{props.children}</main>
		</div>
	)
}
