import { createSignal, onCleanup, onMount } from 'solid-js'
import {
	CgBriefcase,
	CgChart,
	CgDebug,
	CgFile,
	CgFileDocument,
	CgInfo,
	CgLaptop,
	CgMail,
	CgMenuGridO,
	CgPhone,
	CgTime,
	CgUser,
	CgUserAdd,
	CgUserRemove,
	CgUserList
} from 'solid-icons/cg'
import { A } from '@solidjs/router'
import appLogo from 'assets/images/logo.png'
import { useAuth } from 'context/AuthContext'
import ModalCenter from 'components/atoms/ModalCenter'
import NavbarModal from 'components/molecules/NavbarModal'
import './Navbar.scss'

/**
 * Navbar component for site navigation and user profile management.
 *
 * @source src/components/molecules/Navbar.tsx
 * @returns JSX
 */
export default function Navbar() {
	const [openNavbarModalMenu, setOpenNavbarModalMenu] = createSignal(false)
	const [openNavbarModalProfile, setOpenNavbarModalProfile] = createSignal(false)
	const [hasShadow, setHasShadow] = createSignal(false)
	const { isAuthenticated, logout } = useAuth()

	/**
	 * Toggles the menu modal.
	 */
	const handleNavbarModalMenu = () => {
		setOpenNavbarModalMenu(!openNavbarModalMenu())
	}

	/**
	 * Toggles the profile modal.
	 */
	const handleNavbarModalProfile = () => {
		setOpenNavbarModalProfile(!openNavbarModalProfile())
	}

	/**
	 * Handles the scroll event to determine if shadow should be applied to navbar.
	 */
	const handleScroll = () => {
		if (window.scrollY > 10) {
			setHasShadow(true)
		} else {
			setHasShadow(false)
		}
	}

	// Attach scroll event listener on component mount
	onMount(() => {
		window.addEventListener('scroll', handleScroll)
		// Cleanup event listener on component unmount
		onCleanup(() => {
			window.removeEventListener('scroll', handleScroll)
		})
	})

	// Define categories for menu and profile modals
	const menuCategories = [
		{
			title: 'Support',
			items: [
				{ href: '/app', icon: <CgChart />, label: 'Dashboard' },
				{ href: '/app/tickets', icon: <CgBriefcase />, label: 'Tickets' },
				{ href: '/app/accounts', icon: <CgUserList />, label: 'Accounts' },
				{ href: '/app/contacts', icon: <CgUser />, label: 'Contacts' }
			]
		},
		{
			title: 'Communication',
			items: [
				{ href: '/app/emails', icon: <CgMail />, label: 'Emails' },
				{ href: '/app/emailtemplates', icon: <CgFile />, label: 'Email Templates' }
			]
		},
		{
			title: 'Resources',
			items: [
				{ href: '/app/knowledge', icon: <CgInfo />, label: 'Knowledge Base' },
				{ href: '/app/servicecatalog', icon: <CgPhone />, label: 'Service Catalog' },
				{ href: '/app/selfservice', icon: <CgDebug />, label: 'Self Service Portal' },
				{ href: '/app/assets', icon: <CgLaptop />, label: 'Asset Management' }
			]
		},
		{
			title: 'Productivity',
			items: [
				{ href: '/app/times', icon: <CgTime />, label: 'Time Tracking' },
				{ href: '/app/invoices', icon: <CgFileDocument />, label: 'Billing' }
			]
		}
	]

	const profileCategories = [
		{
			title: !isAuthenticated() ? 'Not Logged in' : 'username',
			items: !isAuthenticated()
				? [
						{ href: '/register', icon: <CgUserAdd />, label: 'Register' },
						{ href: '/login', icon: <CgUser />, label: 'Login' }
					]
				: [
						{ href: '/app/profile', icon: <CgUser />, label: 'Profile' },
						{ icon: <CgUserRemove />, label: 'Logout', onClick: () => logout() }
					]
		}
	]

	return (
		<header class={`navbar ${hasShadow() ? 'navbar-shadow' : ''}`}>
			<nav class="container">
				<A href="/">
					<img src={appLogo} class="logo" alt="SolveDesk Logo" />
				</A>
				<div class="navbar-modal-buttons">
					{/* Toggle menu modal */}
					<CgMenuGridO size={32} class="navbar-modal-button" onClick={handleNavbarModalMenu} />
					{/* Toggle profile modal */}
					<CgUser size={32} class="navbar-modal-button" onClick={handleNavbarModalProfile} />
				</div>
			</nav>

			{/* Modal for menu categories */}
			<ModalCenter open={openNavbarModalMenu()} setOpen={setOpenNavbarModalMenu}>
				<NavbarModal categories={menuCategories} />
			</ModalCenter>

			{/* Modal for profile categories */}
			<ModalCenter open={openNavbarModalProfile()} setOpen={setOpenNavbarModalProfile}>
				<NavbarModal categories={profileCategories} />
			</ModalCenter>
		</header>
	)
}
