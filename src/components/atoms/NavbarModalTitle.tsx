// src/components/atoms/NavbarModalTitle.tsx

import { JSX } from 'solid-js'
import './NavbarModalTitle.scss'

interface NavbarModalTitleProps {
	title: string
	className?: string
}

const NavbarModalTitle = (props: NavbarModalTitleProps): JSX.Element => {
	return <li class="navbar-modal-title">{props.title}</li>
}

export default NavbarModalTitle
