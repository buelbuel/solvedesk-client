import './NavbarModalTitle.scss'

/**
 * NavbarModalTitle component
 *
 * Displays a title within an <li> element styled for a navbar modal.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - The title text to display.
 * @param {string} [props.className] - Additional class names to apply to the navbar modal title element.
 *
 * @returns {Element} - The rendered navbar modal title component.
 * @source src/components/atoms/NavbarModalTitle.jsx
 *
 * @example
 * ```jsx
 * <li class="navbar-modal-title custom-title">Settings</li>
 * ```
 */
export default function NavbarModalTitle(props) {
	return <li class={`navbar-modal-title ${props.className || ''}`}>{props.title}</li>
}
