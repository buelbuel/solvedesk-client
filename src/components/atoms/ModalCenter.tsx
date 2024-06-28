// src/components/organisms/ModalCenter.tsx
import { Portal } from 'solid-js/web'
import './ModalCenter.scss'

const ModalCenter = (props: { children: any; open: boolean; setOpen: (open: boolean) => void }) => {
	return (
		<Portal mount={document.body}>
			{props.open && (
				<>
					<div class="overlay" onClick={() => props.setOpen(false)} />
					<div class="modal-center">{props.children}</div>
				</>
			)}
		</Portal>
	)
}

export default ModalCenter
