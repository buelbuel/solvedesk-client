import NavbarModalItem from 'components/atoms/NavbarModalItem'
import NavbarModalTitle from 'components/atoms/NavbarModalTitle'
import './NavbarModal.scss'

/**
 * Represents a NavbarModal component that displays a modal with categorized navigation items.
 *
 * @typedef {Object} NavbarModalProps
 * @property {Object[]} categories - An array of category objects.
 * @property {string} categories.title - The title of the category.
 * @property {Object[]} categories.items - An array of item objects within the category.
 * @property {string} categories.items.href - The URL for the item.
 * @property {JSX.Element} categories.items.icon - The icon element for the item.
 * @property {string} categories.items.label - The label for the item.
 * @property {Function} categories.items.onClick - The function to be executed on item click.
 */

/**
 * Renders the NavbarModal component.
 *
 * @param {NavbarModalProps} props - The properties passed to the NavbarModal component.
 * @returns {JSX.Element} - Rendered NavbarModal component.
 */
export default function NavbarModal(props) {
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
