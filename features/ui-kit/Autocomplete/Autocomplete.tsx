import React, {FocusEventHandler} from 'react';
import Input from '../Input'
import styles from './Autocomplete.module.css'

interface SelectItem {
  value: string,
  text: string
}

interface Props {
  name: string,
  value: string,
  onChange: (value: string) => void,
  items: SelectItem[],
  placeholder?: string,
  loading?: boolean,
  disabled?: boolean,
  onSelect?: (item: SelectItem) => void,
}

const Autocomplete: React.FC<Props> = (props) => {
  const {
    name,
    value,
    items,
    loading,
    placeholder,
    disabled,
    onChange,
    onSelect,
  } = props
  const [focused, setFocused] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const opened = items.length > 0 && value && focused && !loading
  const onFocus = () => setFocused(true)
  const onBlur: FocusEventHandler<HTMLElement> = (event: any) => {
    if (!rootRef.current?.contains(event.relatedTarget) && opened) {
      setFocused(false)
    }
  }
  const onSelectItem = (selectedItem: SelectItem) => {
    onChange(selectedItem.text)
    if (onSelect) onSelect(selectedItem)
  }
  return (
    <div ref={rootRef} className={styles.root} onBlur={onBlur}>
      <Input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        disabled={disabled}
      />
      {opened && (
        <div className={styles.dropdown}>
          {items.map(item => (
            <div
              key={item.value}
              className={styles.dropdownItem}
              onClick={() => onSelectItem(item)}
              tabIndex={0}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Autocomplete
