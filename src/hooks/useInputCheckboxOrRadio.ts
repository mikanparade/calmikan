import { ChangeEventHandler, useState } from 'react';

interface UseInputCheckboxOrRadio {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const useInputCheckboxOrRadio = (initialValue: boolean): UseInputCheckboxOrRadio => {
  const [checked, setChecked] = useState(initialValue);
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setChecked(event.currentTarget.checked);
  };
  return { checked, onChange };
};
