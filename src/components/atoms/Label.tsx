import { JSX } from 'solid-js'
import './Label.scss'

interface LabelProps {
	for: string
	className?: string
	children: JSX.Element
}

/**
 * Label component
 *
 * This component renders a label element for associating with form controls.
 *
 * @param {LabelProps} props - The props for the Label component.
 * @param {string} props.for - The ID of the form control element that this label is associated with.
 * @param {string} [props.className] - Additional class names to apply to the label element.
 * @param {JSX.Element} props.children - The content to render inside the label element.
 *
 * @returns {JSX.Element} - The rendered label element.
 * @source src/components/atoms/Label.tsx
 *
 * @example
 * ```tsx
 * <Label for="username" className="custom-label">Username:</Label>
 * ```
 */
export default function Label(props: LabelProps): JSX.Element {
	return (
		<label for={props.for} class={`${props.className || ''} label`.trim()}>
			{props.children}
		</label>
	)
}
