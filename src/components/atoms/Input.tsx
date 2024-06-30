import { JSX } from 'solid-js'
import './Input.scss'

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	className?: string
}

/**
 * Input component
 *
 * This component renders an input field with optional additional classes.
 * It accepts all standard HTML input attributes via props.
 *
 * @param {InputProps} props - The props for the Input component.
 * @param {string} [props.className] - Additional class names to apply to the input element.
 *
 * @returns {JSX.Element} - The rendered input element.
 * @source src/components/atoms/Input.tsx
 *
 * @example
 * ```tsx
 * <Input type="text" placeholder="Enter your name" className="custom-input" />
 * ```
 */
export default function Input(props: InputProps): JSX.Element {
	const { className, ...rest } = props
	return <input {...rest} class={`input ${className || ''}`} />
}
