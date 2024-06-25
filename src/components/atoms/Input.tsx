import './Input.scss'

interface InputProps {
	type: string
	value: string
	placeholder?: string
	autocomplete?: string
	onInput: (e: Event) => void
	className?: string
}

const Input = (props: InputProps) => {
	return (
		<input
			type={props.type}
			value={props.value}
			placeholder={props.placeholder}
			autocomplete={props.autocomplete}
			onInput={props.onInput}
			class={`${props.className || ''} input`.trim()}
		/>
	)
}

export default Input
