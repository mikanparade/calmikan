import { ChangeEventHandler, ReactNode, useState } from 'react';

interface UseCheckboxesParams<T> {
  selections: { value: T; label: ReactNode }[];
  selected: T[];
}

interface IUseCheckboxes<T> {
  value: T[];
  props: {
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: T;
    label: ReactNode;
  }[];
}

export const useCheckboxes = <T>(params: UseCheckboxesParams<T>): IUseCheckboxes<T> => {
  const { selections, selected } = params;

  const [value, setValue] = useState(selected);

  const props: IUseCheckboxes<T>['props'] = selections.map((selection) => ({
    checked: value.includes(selection.value),
    onChange: (event) => {
      if (event.currentTarget.checked) {
        setValue([...value, selection.value]);
      } else {
        setValue(value.filter((item) => item !== selection.value));
      }
    },
    value: selection.value,
    label: selection.label,
  }));

  return { value, props };
};
