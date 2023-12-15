import { ReactNode } from 'react';

export default function Button(props: {
  buttonKey: (string | number | boolean)[];
  onClick?: (buttonKey: (string | number | boolean)[]) => void;
  className?: string;
  children: ReactNode;
}) {
  const { onClick, buttonKey, className = '', children } = props;

  const handleClick = () => {
    if (!onClick) {
      return;
    }
    onClick(buttonKey);
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
