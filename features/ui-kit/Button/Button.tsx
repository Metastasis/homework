import {MouseEventHandler, PropsWithChildren} from 'react';
import styles from './Button.module.css'


interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>,
  type?: 'button' | 'submit',
  disabled?: boolean
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const {
    type = 'button',
    disabled = false,
    onClick,
    children,
  } = props;
  return (
    <button
      className={styles.root}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
