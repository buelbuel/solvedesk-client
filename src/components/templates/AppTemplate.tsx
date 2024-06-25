// src/components/templates/AppTemplate.tsx

import { JSX } from 'solid-js'
import Navbar from 'components/organisms/Navbar'
import './AppTemplate.scss'

interface AppTemplateProps {
	children: JSX.Element
}

const AppTemplate = (props: AppTemplateProps) => {
	return (
		<div class="app-template">
			<Navbar />
			<main class="content">{props.children}</main>
		</div>
	)
}

export default AppTemplate
