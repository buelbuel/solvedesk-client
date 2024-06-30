import './FrontTemplate.scss'
import Navbar from 'components/organisms/Navbar'

/**
 * FrontTemplate component serves as the template for the front-end pages,
 * including a navigation bar and a main content area.
 *
 * @param {Object} props - The props for the FrontTemplate component.
 * @param {JSX.Element} props.children - The child elements to be rendered.
 * @returns {JSX.Element} The JSX element representing the FrontTemplate.
 * @example
 * // Example of using FrontTemplate component
 * <FrontTemplate>
 *    <div>This is the main content</div>
 * </FrontTemplate>
 */
export default function FrontTemplate(props) {
	return (
		<div class="front-template">
			<Navbar />
			<main class="content">{props.children}</main>
		</div>
	)
}
