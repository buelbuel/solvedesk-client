// src/components/atoms/NavbarModalItem.tsx

import { JSX } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import './NavbarModalItem.scss'

interface NavbarModalItemProps {
	href?: string
	icon?: JSX.Element
	label: string
	onClick?: () => void
}

const NavbarModalItem = (props: NavbarModalItemProps) => {
	const { href, icon, label, onClick } = props
	const navigate = useNavigate()

	const handleClick = () => {
		if (href) {
			navigate(href)
		} else if (onClick) {
			onClick()
		}
	}

	if (href) {
		return (
			<li class="navbar-modal-item" onClick={handleClick}>
				<button class="navbar-modal-item-link">
					{icon && <span>{icon}</span>}
					<span>{label}</span>
				</button>
			</li>
		)
	} else {
		return (
			<li class="navbar-modal-item" onClick={onClick}>
				<button class="navbar-modal-item-link">
					{icon && <span>{icon}</span>}
					<span>{label}</span>
				</button>
			</li>
		)
	}
}

export default NavbarModalItem
