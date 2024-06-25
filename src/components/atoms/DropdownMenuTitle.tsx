import { JSX } from 'solid-js'
import './DropdownMenuTitle.scss'

interface DropdownMenuTitleProps {
	title: string
	className?: string
}

const DropdownMenuTitle = (props: DropdownMenuTitleProps): JSX.Element => {
	return <li class="dropdown-menu-title">{props.title}</li>
}

export default DropdownMenuTitle
