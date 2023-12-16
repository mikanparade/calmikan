import { ChangeEventHandler, FC, ReactNode } from 'react';

interface RadioProps {
  children: ReactNode;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Radio: FC<RadioProps> = (props) => (
  <label>
    <input type='radio' checked={props.checked} onChange={props.onChange} />
    {props.children}
  </label>
);
