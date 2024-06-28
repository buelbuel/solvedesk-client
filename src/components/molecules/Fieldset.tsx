// components/molecules/Fieldset.tsx
import { JSX } from 'solid-js';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import './Fieldset.scss';

interface FieldsetProps {
  labelFor: string;
  labelText: string;
  inputType?: string;
  inputValue?: string;
  inputPlaceholder?: string;
  inputAutocomplete?: string;
  onInput?: (e: Event) => void;
  children?: JSX.Element | JSX.Element[];
  className?: string;
}

const Fieldset = (props: FieldsetProps) => {
  const {
    labelFor,
    labelText,
    inputType,
    inputValue,
    inputPlaceholder,
    inputAutocomplete,
    onInput,
    children,
    className,
  } = props;

  const defaultOnInput = (_: Event) => {};

  return (
    <fieldset class={`fieldset ${className || ''}`}>
      {labelText && <Label for={labelFor}>{labelText}</Label>}

      {inputType && (
        <Input
          type={inputType}
          value={inputValue || ''}
          placeholder={inputPlaceholder}
          autocomplete={inputAutocomplete}
          onInput={onInput || defaultOnInput}
        />
      )}
      {children}
    </fieldset>
  );
};

export default Fieldset;
