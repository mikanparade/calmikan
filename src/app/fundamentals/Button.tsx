import { ReactNode } from 'react';

export default function Button(props: {
  buttonKey: (string | number | boolean)[];
  onClick?: (buttonKey: (string | number | boolean)[]) => void;
  children: ReactNode;
}) {
  const { onClick, buttonKey, children } = props;

  const handleClick = () => {
    if (!onClick) {
      return;
    }
    onClick(buttonKey);
  };

  return <button onClick={handleClick}>{children}</button>;
}
