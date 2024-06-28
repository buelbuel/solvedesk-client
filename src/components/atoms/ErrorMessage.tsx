import './ErrorMessage.scss'

interface ErrorMessageProps {
	message: string | null
}

const ErrorMessage = (props: ErrorMessageProps) => {
	return <span class="error-message">{props.message}</span>
}

export default ErrorMessage
