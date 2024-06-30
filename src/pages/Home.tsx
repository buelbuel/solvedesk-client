import { createSignal } from 'solid-js'
import { MetaProvider, Title, Link } from '@solidjs/meta'

export default function Home() {
	const [count, setCount] = createSignal(0)
	return (
		<MetaProvider>
			<Title>SolveDesk</Title>
			<Link rel="canonical" href="http://solvedesk.de/" />

			<section class="home-page">
				<div class="container">
					<h1>Vite + Solid</h1>
					<div class="card">
						<button onClick={() => setCount(count => count + 1)}>count is {count()}</button>
						<p>
							Edit <code>src/pages/Home.tsx</code> and save to test HMR
						</p>
					</div>
					<p class="read-the-docs">Click on the Vite and Solid logos to learn more</p>
				</div>
			</section>
		</MetaProvider>
	)
}
