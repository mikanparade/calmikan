import { ChangeEventHandler, FC, ReactNode } from 'react';

interface CheckboxProps {
  children: ReactNode;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: FC<CheckboxProps> = (props) => (
  <label className='w-full flex flex-row gap-2 py-1 px-2'>
    <input type='checkbox' checked={props.checked} onChange={props.onChange} />
    {props.children}
  </label>
);
