// src/components/molecules/Navbar.tsx

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

const Navbar = () => {
	const [openNavbarModalMenuModal, setOpenNavbarModalMenuModal] = createSignal(false)
	const [openNavbarModalProfileModal, setOpenNavbarModalProfileModal] = createSignal(false)
	const [hasShadow, setHasShadow] = createSignal(false)
	const { isAuthenticated, logout } = useAuth()

	const handleNavbarModalMenu = () => {
		setOpenNavbarModalMenuModal(!openNavbarModalMenuModal())
	}

	const handleNavbarModalProfile = () => {
		setOpenNavbarModalProfileModal(!openNavbarModalProfileModal())
	}

	const handleScroll = () => {
		if (window.scrollY > 10) {
			setHasShadow(true)
		} else {
			setHasShadow(false)
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll)
		onCleanup(() => {
			window.removeEventListener('scroll', handleScroll)
		})
	})

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
					<CgMenuGridO size={32} class="navbar-modal-button" onClick={handleNavbarModalMenu} />
					<CgUser size={32} class="navbar-modal-button" onClick={handleNavbarModalProfile} />
				</div>
			</nav>

			<ModalCenter open={openNavbarModalMenuModal()} setOpen={setOpenNavbarModalMenuModal}>
				<NavbarModal categories={menuCategories} />
			</ModalCenter>

			<ModalCenter open={openNavbarModalProfileModal()} setOpen={setOpenNavbarModalProfileModal}>
				<NavbarModal categories={profileCategories} />
			</ModalCenter>
		</header>
	)
}

export default Navbar
