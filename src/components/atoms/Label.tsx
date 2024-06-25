import { JSX } from 'solid-js'
import './Label.scss'

interface LabelProps {
	for: string
	className?: string
	children: JSX.Element
}

const Label = (props: LabelProps) => {
	return (
		<label for={props.for} class={`${props.className || ''} label`.trim()}>
			{props.children}
		</label>
	)
}

export default Label
