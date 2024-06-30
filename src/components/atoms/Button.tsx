import { JSX } from 'solid-js'
import './Button.scss'

interface ButtonProps {
	type: 'button' | 'submit' | 'reset'
	onClick?: (e: Event) => void
	disabled?: boolean
	className?: string
	variant: 'primary' | 'secondary' | 'light'
	children: JSX.Element
}

/**
 * Button component
 *
 * This component renders a button element with customizable properties including type, click handler,
 * disabled state, custom class names, and variant styles.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {'button' | 'submit' | 'reset'} props.type - The type of the button.
 * @param {(e: Event) => void} [props.onClick] - The click handler function.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @param {string} [props.className] - Additional custom class names.
 * @param {'primary' | 'secondary' | 'light'} [props.variant] - The variant style of the button.
 * @param {JSX.Element} props.children - The content to be displayed inside the button.
 *
 * @returns JSX - The rendered button component.
 * @source src/components/atoms/Button.tsx
 *
 * @example
 * ```tsx
 * <Button type="submit" variant="primary" onClick={handleSubmit}>Submit</Button>
 * ```
 */
export default function Button(props: ButtonProps): JSX.Element {
	const variantClass = props.variant ? ` ${props.variant}` : ''
	return (
		<button
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled}
			class={`${props.className || ''} button${variantClass}`.trim()}
		>
			{props.children}
		</button>
	)
}
