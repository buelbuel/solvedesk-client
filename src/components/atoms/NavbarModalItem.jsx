import { useNavigate } from '@solidjs/router'
import './NavbarModalItem.scss'

/**
 * Represents an item within a navbar modal that can navigate to a URL or trigger an action.
 *
 * @typedef {Object} NavbarModalItemProps
 * @property {string} [href] - The URL to navigate to when the item is clicked.
 * @property {JSX.Element} [icon] - The icon element to display alongside the label.
 * @property {string} label - The label text to display for the item.
 * @property {() => void} [onClick] - Optional click handler function to execute when the item is clicked.
 */

/**
 * Renders the NavbarModalItem component.
 *
 * @param {NavbarModalItemProps} props - Component props.
 * @returns {JSX.Element} - The rendered navbar modal item component.
 */
export default function NavbarModalItem(props) {
	const { href, icon, label, onClick } = props
	const navigate = useNavigate()

	/**
	 * Handles the click event on the navbar modal item.
	 */
	const handleClick = () => {
		if (href) {
			navigate(href)
		} else if (onClick) {
			onClick()
		}
	}

	return (
		<li class="navbar-modal-item" onClick={handleClick}>
			<button class="navbar-modal-item-link">
				{icon && <span class="navbar-modal-item-icon">{icon}</span>}
				<span class="navbar-modal-item-label">{label}</span>
			</button>
		</li>
	)
}
