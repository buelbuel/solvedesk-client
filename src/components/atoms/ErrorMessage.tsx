import { JSX } from 'solid-js'
import './ErrorMessage.scss'

interface ErrorMessageProps {
	message: string | null
}

/**
 * ErrorMessage component
 *
 * This component displays an error message.
 *
 * @param {ErrorMessageProps} props - The props for the ErrorMessage component.
 * @param {string | null} props.message - The error message to display. If null, no message will be shown.
 *
 * @returns {JSX.Element} - The rendered error message component.
 * @source src/components/atoms/ErrorMessage.tsx
 *
 * @example
 * ```tsx
 * <ErrorMessage message="An error has occurred." />
 * ```
 */
export default function ErrorMessage(props: ErrorMessageProps): JSX.Element {
	return <span class="error-message">{props.message}</span>
}
