import { JSX } from 'solid-js'
import './FrontTemplate.scss'
import Navbar from 'components/organisms/Navbar'

interface FrontTemplateProps {
	children: JSX.Element
}

/**
 * FrontTemplate component serves as the template for the front-end pages,
 * including a navigation bar and a main content area.
 *
 * @param props FrontTemplateProps
 *
 * @returns JSX
 * @source src/components/templates/FrontTemplate.tsx
 */
export default function FrontTemplate(props: FrontTemplateProps) {
	return (
		<div class="front-template">
			<Navbar />
			<main class="content">{props.children}</main>
		</div>
	)
}
