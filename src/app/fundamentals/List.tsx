import { ReactNode } from 'react';

export default function List(props: {
  direction: 'horizontal' | 'vertical';
  forControl: boolean;
  paddingX: number;
  paddingY: number;
  gap: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'evenly' | 'around';
  width?: 'max' | 'full' | number;
  className?: string;
  children: ReactNode;
}) {
  const { align = 'stretch', justify = 'between', width = 'full', className = '' } = props;
  const directionClassName = props.direction === 'horizontal' ? 'flex-row' : 'flex-column';
  const paddingXClassName = `px-${props.paddingX}`;
  const paddingYClassName = `py-${props.paddingY}`;
  const gapClassName = `gap-${props.gap}`;
  const alignClassName = `items-${align}`;
  const justifyClassName = `justify-${justify}`;
  const widthClassName = `w-${width}`;
  return (
    <div
      className={`flex ${directionClassName} ${paddingXClassName} ${paddingYClassName} ${gapClassName} ${alignClassName} ${justifyClassName} ${widthClassName} ${className}`}
    >
      {props.children}
    </div>
  );
}
