import { JSX } from 'solid-js'
import './Loading.scss'

/**
 * Loading component
 *
 * This component renders a simple loading indicator.
 *
 * @returns {JSX.Element} - The rendered loading indicator.
 * @source src/components/atoms/Loading.tsx
 *
 * @example
 * ```tsx
 * <Loading />
 * ```
 */
export default function Loading(): JSX.Element {
	return <span class="loading">Loading...</span>
}
