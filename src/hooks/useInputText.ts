import { ChangeEventHandler, useState } from 'react';

interface UseInputText {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const useInputText = (initialValue: string): UseInputText => {
  const [value, setValue] = useState(initialValue);
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setValue(event.currentTarget.value);
  };
  return { value, onChange };
};
