export default function Icon(props: {
  name: string;
  type?: 'filled' | 'outlined';
  size?: 'sm' | 'md';
  className?: string;
}) {
  const { type = 'outlined', size = 'md', className = '' } = props;
  const typeClassName = type === 'filled' ? 'icon-filled' : 'icon-outlined';
  return <span className={`${typeClassName} ${className}`}>{props.name}</span>;
}
