import './ErrorMessage.scss'

interface ErrorMessageProps {
	message: string
}

const ErrorMessage = (props: ErrorMessageProps) => {
	return <li>{props.message}</li>
}

export default ErrorMessage
