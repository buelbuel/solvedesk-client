import { JSX } from 'solid-js'
import Input from 'components/atoms/Input'
import './FormInput.scss'

interface FormInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	className?: string
}

/**
 * FormInput component that wraps the Input component with additional styling.
 *
 * @param {FormInputProps} props - The properties passed to the FormInput component.
 * @returns {JSX.Element} - Rendered FormInput component.
 * @source components/molecules/FormInput.tsx
 */
export default function FormInput(props: FormInputProps): JSX.Element {
	const { className, ...rest } = props
	return <Input {...rest} className={`form-input-field ${className || ''}`} />
}
