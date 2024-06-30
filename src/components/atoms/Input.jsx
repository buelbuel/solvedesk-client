import './Input.scss'

/**
 * Input component
 *
 * This component renders an input field with optional additional classes.
 * It accepts all standard HTML input attributes via props.
 *
 * @param {Object} props - The props for the Input component.
 * @param {string} [props.className] - Additional class names to apply to the input element.
 *
 * @returns {Element} - The rendered input element.
 * @source src/components/atoms/Input.jsx
 *
 * @example
 * ```jsx
 * <Input type="text" placeholder="Enter your name" className="custom-input" />
 * ```
 */
export default function Input(props) {
	const { className, ...rest } = props
	return <input {...rest} class={`input ${className || ''}`} />
}
