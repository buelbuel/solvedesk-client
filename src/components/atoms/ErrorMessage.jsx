/**
 * ErrorMessage component
 *
 * This component displays an error message.
 *
 * @param {Object} props - The props for the ErrorMessage component.
 * @param {string | null} props.message - The error message to display. If null, no message will be shown.
 *
 * @returns {Element} - The rendered error message component.
 * @source src/components/atoms/ErrorMessage.jsx
 *
 * @example
 * ```jsx
 * <ErrorMessage message="An error has occurred." />
 * ```
 */
export default function ErrorMessage(props) {
	return <span class="error-message">{props.message}</span>
}
