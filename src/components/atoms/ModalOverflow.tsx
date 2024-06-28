import { Portal } from 'solid-js/web'

import './ModalOverflow.scss'

const ModalOverflow = (props: { children: any; open: () => boolean; setOpen: (open: boolean) => void }) => {
	return (
		<Portal mount={document.body}>
			{props.open() && (
				<>
					<div class="overlay" onClick={() => props.setOpen(false)} />
					<dialog class="modal-overflow">{props.children}</dialog>
				</>
			)}
		</Portal>
	)
}

export default ModalOverflow
