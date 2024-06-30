import { JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import './ModalCenter.scss'

interface ModalCenterProps {
	children: JSX.Element | JSX.Element[]
	open: boolean
	setOpen: (open: boolean) => void
}

/**
 * ModalCenter component
 *
 * A centered modal component that renders its children within a portal into the document body.
 *
 * @param {ModalCenterProps} props - Component props.
 * @param {boolean} props.open - Determines if the modal is open or closed.
 * @param {(open: boolean) => void} props.setOpen - Function to set the modal open state.
 * @param {JSX.Element | JSX.Element[]} props.children - The content to be displayed within the modal.
 *
 * @returns {JSX.Element | null} - The rendered modal component or null if not open.
 * @source src/components/organisms/ModalCenter.tsx
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = createSignal(false);
 *
 * return (
 *   <ModalCenter open={isOpen()} setOpen={setIsOpen}>
 *     <>
 *       <h2>Modal Title</h2>
 *       <p>Modal content goes here.</p>
 *       <button onClick={() => setIsOpen(false)}>Close Modal</button>
 *     </>
 *   </ModalCenter>
 * );
 * ```
 */
export default function ModalCenter(props: ModalCenterProps) {
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
