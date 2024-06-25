import { createSignal } from 'solid-js'
import { MetaProvider, Title, Link } from '@solidjs/meta'
import viteLogo from '/vite.svg'
import './Dashboard.scss'

function Dashboard() {
	const [count, setCount] = createSignal(0)
	return (
		<MetaProvider>
			<Title>Dashboard SolveDesk</Title>
			<Link rel="canonical" href="http://solvedesk.de/app" />

			<section class="home-page">
				<div class="container">
					<h1>Dashboard</h1>
				</div>
			</section>
		</MetaProvider>
	)
}

export default Dashboard
