// src/components/molecules/NavbarModal.tsx

import './NavbarModal.scss'
import NavbarModalItem from 'components/atoms/NavbarModalItem'
import NavbarModalTitle from 'components/atoms/NavbarModalTitle'
import { JSX } from 'solid-js'

interface NavbarModalProps {
	categories: {
		title: string
		items: {
			href?: string
			icon?: JSX.Element
			label: string
			onClick?: () => void
		}[]
	}[]
}

const NavbarModal = (props: NavbarModalProps) => {
	return (
		<div class="navbar-modal">
			<div class="navbar-modal-categories">
				{props.categories.map(category => (
					<ul class="navbar-modal-categories-list">
						<NavbarModalTitle title={category.title} />
						{category.items.map(item => (
							<NavbarModalItem href={item.href} icon={item.icon} label={item.label} onClick={item.onClick} />
						))}
					</ul>
				))}
			</div>
		</div>
	)
}

export default NavbarModal
