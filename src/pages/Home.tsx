import { createSignal } from 'solid-js'
import { MetaProvider, Title, Link } from '@solidjs/meta'
import viteLogo from '/vite.svg'
import './Home.scss'

function Home() {
	const [count, setCount] = createSignal(0)
	return (
		<MetaProvider>
			<Title>SolveDesk</Title>
			<Link rel="canonical" href="http://solvedesk.de/" />

			<div class="home-page">
				<div class="container">
					<div>
						<a href="https://vitejs.dev" target="_blank">
							<img src={viteLogo} class="logo" alt="Vite logo" />
						</a>
					</div>
					<h1>Vite + Solid</h1>
					<div class="card">
						<button onClick={() => setCount(count => count + 1)}>
							count is {count()}
						</button>
						<p>
							Edit <code>src/pages/Home.tsx</code> and save to
							test HMR
						</p>
					</div>
					<p class="read-the-docs">
						Click on the Vite and Solid logos to learn more
					</p>
				</div>
			</div>
		</MetaProvider>
	)
}

export default Home
