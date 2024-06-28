// components/molecules/FormInput.tsx
import Input from 'components/atoms/Input';
import './FormInput.scss';
import { JSX } from 'solid-js';

interface FormInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const FormInput = (props: FormInputProps) => {
  const { className, ...rest } = props;
  return <Input {...rest} className={`form-input-field ${className || ''}`} />;
};

export default FormInput;