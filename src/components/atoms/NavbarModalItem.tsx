import { JSX } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import './NavbarModalItem.scss'

interface NavbarModalItemProps {
	href?: string
	icon?: JSX.Element
	label: string
	onClick?: () => void
}

/**
 * NavbarModalItem component
 *
 * Represents an item within a navbar modal that can navigate to a URL or trigger an action.
 *
 * @param {NavbarModalItemProps} props - Component props.
 * @param {string} [props.href] - The URL to navigate to when the item is clicked.
 * @param {JSX.Element} [props.icon] - The icon element to display alongside the label.
 * @param {string} props.label - The label text to display for the item.
 * @param {() => void} [props.onClick] - Optional click handler function to execute when the item is clicked.
 *
 * @returns {JSX.Element} - The rendered navbar modal item component.
 * @source src/components/atoms/NavbarModalItem.tsx
 *
 * @example
 * ```tsx
 * <NavbarModalItem href="/dashboard" label="Dashboard" icon={<DashboardIcon />} />
 * <NavbarModalItem label="Logout" onClick={handleLogout} />
 * ```
 */
export default function NavbarModalItem(props: NavbarModalItemProps): JSX.Element {
	const { href, icon, label, onClick } = props
	const navigate = useNavigate()

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
