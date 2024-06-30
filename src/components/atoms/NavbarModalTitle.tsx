import { JSX } from 'solid-js'
import './NavbarModalTitle.scss'

interface NavbarModalTitleProps {
	title: string
	className?: string
}

/**
 * NavbarModalTitle component
 *
 * Displays a title within an <li> element styled for a navbar modal.
 *
 * @param {NavbarModalTitleProps} props - Component props.
 * @param {string} props.title - The title text to display.
 * @param {string} [props.className] - Additional class names to apply to the navbar modal title element.
 *
 * @returns {JSX.Element} - The rendered navbar modal title component.
 * @source src/components/atoms/NavbarModalTitle.tsx
 *
 * @example
 * ```tsx
 * <NavbarModalTitle title="Settings" className="custom-title" />
 * ```
 */
export default function NavbarModalTitle(props: NavbarModalTitleProps): JSX.Element {
	return <li class={`navbar-modal-title ${props.className || ''}`}>{props.title}</li>
}
