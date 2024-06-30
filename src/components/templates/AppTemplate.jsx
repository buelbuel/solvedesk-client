import Navbar from 'components/organisms/Navbar'
import './AppTemplate.scss'

/**
 * Represents the main layout template for the application.
 * Includes a navigation bar and a main content area.
 *
 * @param {Object} props - The props for the AppTemplate component.
 * @param {JSX.Element} props.children - The child elements to be rendered.
 * @returns {JSX.Element} The AppTemplate component.
 */
export default function AppTemplate(props) {
	return (
		<div class="app-template">
			<Navbar />
			<main class="content">{props.children}</main>
		</div>
	)
}
