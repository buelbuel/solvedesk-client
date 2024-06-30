import { JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import './ModalOverflow.scss'

interface ModalOverflowProps {
	children: JSX.Element
	open: () => boolean
	setOpen: (open: boolean) => void
}

/**
 * ModalOverflow component
 *
 * Renders a modal dialog that overlays the content of the page.
 *
 * @param {ModalOverflowProps} props - Component props.
 * @param {() => boolean} props.open - Function that returns whether the modal should be open.
 * @param {(open: boolean) => void} props.setOpen - Function to set the open state of the modal.
 * @param {JSX.Element} props.children - The children elements to be rendered within the modal.
 *
 * @returns {JSX.Element | null} - The rendered modal overflow component.
 * @source src/components/atoms/ModalOverflow.tsx
 *
 * @example
 * ```tsx
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
export default function ModalOverflow(props: ModalOverflowProps): JSX.Element | null {
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
