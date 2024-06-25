// src/components/templates/FrontTemplate.tsx

import { JSX } from 'solid-js'
import './FrontTemplate.scss'
import Navbar from 'components/organisms/Navbar'

interface FrontTemplateProps {
	children: JSX.Element
}

const FrontTemplate = (props: FrontTemplateProps) => {
	return (
		<div class="front-template">
			<Navbar />
			<main class="content">{props.children}</main>
		</div>
	)
}

export default FrontTemplate
