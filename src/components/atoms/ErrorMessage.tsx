import './ErrorMessage.scss'

interface ErrorMessageProps {
	message: string
}

const ErrorMessage = (props: ErrorMessageProps) => {
	return <li class="error-message">{props.message}</li>
}

export default ErrorMessage
