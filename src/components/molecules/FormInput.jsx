import Input from 'components/atoms/Input'
import './FormInput.scss'

/**
 * FormInput component that wraps the Input component with additional styling.
 *
 * @param {Object} props - The properties passed to the FormInput component.
 * @param {string} props.className - The CSS class name.
 * @returns {Object} - Rendered FormInput component.
 * @example
 * // Example:
 * // <FormInput className="custom-input" />
 */
export default function FormInput(props) {
	const { className, ...rest } = props
	return <Input {...rest} className={`form-input-field ${className || ''}`} />
}
