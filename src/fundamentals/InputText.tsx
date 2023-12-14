import { ChangeEvent } from 'react';

export default function InputText(props: {
  buttonKey: (string | number | boolean)[];
  onChange?: (buttonKey: (string | number | boolean)[], value: string) => void;
  onEnter?: (buttonKey: (string | number | boolean)[], value: string) => void;
  className?: string;
  value: string;
}) {
  const { buttonKey, onChange, onEnter, className = '', value } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }
    onChange(buttonKey, e.currentTarget.value);
  };

  return (
    <label className={className}>
      <input type='text' onChange={handleChange} value={value} />
    </label>
  );
}
