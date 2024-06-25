// src/components/atoms/DropdownMenuItem.tsx

import { JSX } from 'solid-js'
import { A } from '@solidjs/router'
import './DropdownMenuItem.scss'

interface DropdownMenuItemProps {
	href: string
	icon: JSX.Element
	label: string
}

const DropdownMenuItem = (props: DropdownMenuItemProps) => {
	return (
		<li class="dropdown-menu-item">
			<A href={props.href} class="">
				{props.icon} {props.label}
			</A>
		</li>
	)
}

export default DropdownMenuItem
