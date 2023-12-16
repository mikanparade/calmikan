import { ChangeEventHandler, FC, ReactNode } from 'react';

interface CheckboxProps {
  children: ReactNode;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: FC<CheckboxProps> = (props) => (
  <label>
    <input type='checkbox' checked={props.checked} onChange={props.onChange} />
    {props.children}
  </label>
);
