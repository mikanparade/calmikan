export default function Icon(props: {
  name: string;
  type?: 'filled' | 'outlined';
  size?: 'sm' | 'md';
}) {
  const { type = 'outlined', size = 'md' } = props;
  const typeClassName = type === 'filled' ? 'icon-filled' : 'icon-outlined';
  return <span className={`${type}`}>{props.name}</span>;
}
