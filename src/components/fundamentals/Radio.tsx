import { ChangeEventHandler, FC, ReactNode } from 'react';

interface RadioProps {
  children: ReactNode;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Radio: FC<RadioProps> = (props) => (
  <label className='w-full flex flex-row gap-2 py-1 px-2'>
    <input type='radio' checked={props.checked} onChange={props.onChange} />
    {props.children}
  </label>
);
