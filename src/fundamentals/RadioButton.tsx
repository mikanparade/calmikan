import { ReactNode } from 'react';

export default function RadioButton(props: {
  buttonKey: (string | number | boolean)[];
  onChange?: (buttonKey: (string | number | boolean)[], name: string, value: string) => void;
  name: string;
  value: string;
  checked: boolean;
  children: ReactNode;
}) {
  const { onChange, buttonKey, children } = props;

  const handleClick = () => {
    if (!onChange) {
      return;
    }
    onChange(buttonKey, props.name, props.value);
  };

  return (
    <label>
      <input
        type='radio'
        onChange={handleClick}
        name={props.name}
        value={props.value}
        checked={props.checked}
      />
      {children}
    </label>
  );
}
