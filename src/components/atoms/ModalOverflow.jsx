import { Portal } from 'solid-js/web'
import './ModalOverflow.scss'

/**
 * @typedef {Object} ModalOverflowProps
 * @property {JSX.Element} children - The children elements to be rendered within the modal.
 * @property {() => boolean} open - Function that returns whether the modal should be open.
 * @property {(open: boolean) => void} setOpen - Function to set the open state of the modal.
 */

/**
 * ModalOverflow component
 *
 * Renders a modal dialog that overlays the content of the page.
 *
 * @param {ModalOverflowProps} props - Component props.
 * @returns {JSX.Element | null} - The rendered modal overflow component.
 * @source src/components/atoms/ModalOverflow.jsx
 *
 * @example
 * ```jsx
 * const [isOpen, setIsOpen] = createSignal(false);
 *
 * return (
 *   <ModalOverflow open={isOpen()} setOpen={setIsOpen}>
 *     <>
 *       <h2>Modal Title</h2>
 *       <p>Modal content goes here.</p>
 *       <button onClick={() => setIsOpen(false)}>Close Modal</button>
 *     </>
 *   </ModalOverflow>
 * );
 * ```
 */
export default function ModalOverflow(props) {
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
