// src/components/Logout.tsx
import { useAuth } from 'context/AuthContext'

const Logout = () => {
	const { logout } = useAuth()

	const handleLogout = (e: { preventDefault: () => void }) => {
		e.preventDefault() // Prevent the default anchor behavior
		logout()
	}

	return (
		<a href="#" onClick={handleLogout}>
			Logout
		</a>
	)
}

export default Logout
