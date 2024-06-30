import { JSX } from 'solid-js'
import NavbarModalItem from 'components/atoms/NavbarModalItem'
import NavbarModalTitle from 'components/atoms/NavbarModalTitle'
import './NavbarModal.scss'

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

/**
 * NavbarModal component to display a modal with categorized navigation items.
 *
 * @param {NavbarModalProps} props - The properties passed to the NavbarModal component.
 * @returns {JSX.Element} - Rendered NavbarModal component.
 * @source src/components/molecules/NavbarModal.tsx
 */
export default function NavbarModal(props: NavbarModalProps): JSX.Element {
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
