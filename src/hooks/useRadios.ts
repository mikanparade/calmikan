import { ChangeEventHandler, ReactNode, useState } from 'react';

interface UseRadioParams<T> {
  selections: { value: T; label: ReactNode }[];
  selected: T;
}

interface IUseRadios<T> {
  value: T;
  props: {
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: T;
    label: ReactNode;
  }[];
}

export const useRadios = <T>(params: UseRadioParams<T>): IUseRadios<T> => {
  const { selections, selected } = params;

  const [value, setValue] = useState(selected);

  const props: IUseRadios<T>['props'] = selections.map((selection) => ({
    checked: selection.value === value,
    onChange: (event) => {
      if (event.currentTarget.checked) {
        setValue(selection.value);
      }
    },
    value: selection.value,
    label: selection.label,
  }));

  return { value, props };
};
