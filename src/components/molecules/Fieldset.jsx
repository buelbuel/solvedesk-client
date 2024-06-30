import Input from 'components/atoms/Input'
import Label from 'components/atoms/Label'
import './Fieldset.scss'

/**
 * Represents a Fieldset component for rendering a labeled input field with optional children elements.
 * @typedef {Object} FieldsetProps
 * @property {string} labelFor - The ID of the label associated with the input field.
 * @property {string} labelText - The text to display in the label.
 * @property {string} [inputType] - The type of the input field.
 * @property {string} [inputValue] - The value of the input field.
 * @property {string} [inputPlaceholder] - The placeholder text for the input field.
 * @property {string} [inputAutocomplete] - The autocomplete value for the input field.
 * @property {(e: Event) => void} [onInput] - The event handler for input events.
 * @property {JSX.Element | JSX.Element[]} [children] - Optional children elements.
 * @property {string} [className] - The CSS class for styling purposes.
 */

/**
 * Renders a Fieldset component based on the provided props.
 * @param {FieldsetProps} props - The props for the Fieldset component.
 * @returns {JSX.Element} - The rendered Fieldset component.
 */
export default function Fieldset(props) {
	const {
		labelFor,
		labelText,
		inputType,
		inputValue,
		inputPlaceholder,
		inputAutocomplete,
		onInput,
		children,
		className
	} = props

	const defaultOnInput = _ => {}

	return (
		<fieldset class={`fieldset ${className || ''}`}>
			{labelText && <Label for={labelFor}>{labelText}</Label>}

			{inputType && (
				<Input
					type={inputType}
					value={inputValue || ''}
					placeholder={inputPlaceholder}
					autocomplete={inputAutocomplete}
					onInput={onInput || defaultOnInput}
				/>
			)}
			{children}
		</fieldset>
	)
}
