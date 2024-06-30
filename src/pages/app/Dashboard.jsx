import { MetaProvider, Title, Link } from '@solidjs/meta'

export default function Dashboard() {
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
