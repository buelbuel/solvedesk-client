// components/atoms/Input.tsx
import { JSX } from 'solid-js';
import './Input.scss';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = (props: InputProps) => {
  const { className, ...rest } = props;
  return <input {...rest} class={`input ${className || ''}`} />;
};

export default Input;
