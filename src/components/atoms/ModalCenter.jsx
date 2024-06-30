import { Portal } from 'solid-js/web'
import './ModalCenter.scss'

/**
 * @typedef {Object} ModalCenterProps
 * @property {JSX.Element | JSX.Element[]} children - The content to be displayed within the modal.
 * @property {boolean} open - Determines if the modal is open or closed.
 * @property {(open: boolean) => void} setOpen - Function to set the modal open state.
 */

/**
 * ModalCenter component
 *
 * A centered modal component that renders its children within a portal into the document body.
 *
 * @param {ModalCenterProps} props - Component props.
 * @returns {JSX.Element | null} - The rendered modal component or null if not open.
 * @source src/components/organisms/ModalCenter.jsx
 *
 * @example
 * ```jsx
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
export default function ModalCenter(props) {
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
