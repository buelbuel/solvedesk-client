// src/components/molecules/Navbar.tsx

import Dismiss from 'solid-dismiss'
import { createSignal } from 'solid-js'
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
	CgUserList
} from 'solid-icons/cg'
import DropdownMenuItem from 'components/atoms/DropdownMenuItem'
import DropdownMenuTitle from 'components/atoms/DropdownMenuTitle'
import appLogo from 'assets/images/logo.png'
import { useAuth } from 'context/AuthContext'
import Logout from 'components/atoms/Logout'
import './Navbar.scss'
import { A } from '@solidjs/router'
import LoginForm from './LoginForm'

const Navbar = () => {
	const [open, setOpen] = createSignal(false)
	const { isAuthenticated } = useAuth()
	let btnEl

	return (
		<header class="app-navigation">
			<nav class="container">
				{/** TODO: Router A /app */}
				<img src={appLogo} class="logo" alt="SolveDesk Logo" />
				<CgMenuGridO size={32} ref={btnEl} class="dropdown-menu-button" />
			</nav>
			<Dismiss
				menuButton={btnEl}
				open={open}
				setOpen={setOpen}
				cursorKeys
				animation={{ name: 'fade' }}
			>
				<div class="dropdown container">
					{isAuthenticated() ? (
						<>
							<div class="dropdown-menu-categories">
								<ul class="dropdown-menu">
									<DropdownMenuTitle title="Support" />
									<DropdownMenuItem
										href="/app"
										icon={<CgChart />}
										label="Dashboard"
									/>
									<DropdownMenuItem
										href="/app/tickets"
										icon={<CgBriefcase />}
										label="Tickets"
									/>
									<DropdownMenuItem
										href="/app/accounts"
										icon={<CgUserList />}
										label="Accounts"
									/>
									<DropdownMenuItem
										href="/app/contacts"
										icon={<CgUser />}
										label="Contacts"
									/>
								</ul>
								<ul class="dropdown-menu">
									<DropdownMenuTitle title="Communication" />
									<DropdownMenuItem
										href="/app/emails"
										icon={<CgMail />}
										label="Emails"
									/>
									<DropdownMenuItem
										href="/app/emailtemplates"
										icon={<CgFile />}
										label="Email Templates"
									/>
								</ul>
								<ul class="dropdown-menu">
									<DropdownMenuTitle title="Resources" />
									<DropdownMenuItem
										href="/app/knowledge"
										icon={<CgInfo />}
										label="Knowledge Base"
									/>
									<DropdownMenuItem
										href="/app/servicecatalog"
										icon={<CgPhone />}
										label="Service Catalog"
									/>
									<DropdownMenuItem
										href="/app/selfservice"
										icon={<CgDebug />}
										label="Self Service Portal"
									/>
									<DropdownMenuItem
										href="/app/assets"
										icon={<CgLaptop />}
										label="Asset Management"
									/>
								</ul>
								<ul class="dropdown-menu">
									<DropdownMenuTitle title="Productivity" />
									<DropdownMenuItem
										href="/app/times"
										icon={<CgTime />}
										label="Time Tracking"
									/>
									<DropdownMenuItem
										href="/app/invoices"
										icon={<CgFileDocument />}
										label="Billing"
									/>
								</ul>
							</div>
							<div class="dropdown-menu-auth">
								<Logout />
							</div>
						</>
					) : (
						<div class="dropdown-menu-auth">
							<A href={'/login'}>Login</A>
							<A href={'/register'}>Register</A>
						</div>
					)}
				</div>
			</Dismiss>
		</header>
	)
}

export default Navbar
