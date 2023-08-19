import { ReactNode } from 'react';

export default function Property(props: { header: ReactNode; children: ReactNode }) {
  return (
    <div>
      {props.header}
      <div className="pl-4">{props.children}</div>
    </div>
  );
}
