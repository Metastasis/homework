import {
  ChangeEvent,
  FocusEventHandler,
  useCallback
} from 'react';
import styles from './Input.module.css'


interface InputProps {
  name: string,
  onChange: (value: string) => void,
  value: string,
  placeholder?: string,
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const Input = (props: InputProps) => {
  const {name, placeholder, value, onFocus, onBlur, onChange} = props
  const onChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange]
  );
  return (
    <input
      className={styles.input}
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChangeValue}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default Input
