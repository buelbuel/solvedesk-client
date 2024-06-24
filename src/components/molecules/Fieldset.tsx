import Input from 'components/atoms/Input'
import Label from 'components/atoms/Label'
import './Fieldset.scss'

interface FieldsetProps {
	labelFor: string
	labelText: string
	inputType: string
	inputValue: string
	inputPlaceholder?: string
	inputAutocomplete?: string
	onInput: (e: Event) => void
	className?: string
}

const Fieldset = (props: FieldsetProps) => {
	return (
		<fieldset class={props.className || 'form-group'}>
			<Label for={props.labelFor}>{props.labelText}</Label>
			<Input
				type={props.inputType}
				value={props.inputValue}
				placeholder={props.inputPlaceholder}
				autocomplete={props.inputAutocomplete}
				onInput={props.onInput}
			/>
		</fieldset>
	)
}

export default Fieldset
