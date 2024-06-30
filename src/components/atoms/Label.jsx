/**
 * Label component
 *
 * This component renders a label element for associating with form controls.
 *
 * @param {Object} props - The props for the Label component.
 * @param {string} props.for - The ID of the form control element that this label is associated with.
 * @param {string} [props.className] - Additional class names to apply to the label element.
 * @param {JSX.Element} props.children - The content to render inside the label element.
 *
 * @returns {JSX.Element} - The rendered label element.
 * @source src/components/atoms/Label.jsx
 *
 * @example
 * ```jsx
 * <label for="username" className="custom-label">Username:</label>
 * ```
 */
export default function Label(props) {
	return (
		<label for={props.for} class={`${props.className || ''} label`.trim()}>
			{props.children}
		</label>
	)
}
