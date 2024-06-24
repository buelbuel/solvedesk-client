import { JSX } from 'solid-js'
import './Button.scss'

interface ButtonProps {
	type: 'button' | 'submit' | 'reset'
	onClick?: (e: Event) => void
	disabled?: boolean
	className?: string
	children: JSX.Element
}

const Button = (props: ButtonProps) => {
	return (
		<button
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled}
			class={props.className || 'btn btn-lg btn-primary pull-xs-right'}
		>
			{props.children}
		</button>
	)
}

export default Button
