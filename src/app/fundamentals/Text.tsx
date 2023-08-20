export default function Text(props: {
  type?: 'heading' | 'body' | 'small';
  colorName?: 'leaf' | 'orange' | 'gray';
  colorNum?: '7' | '6' | '5';
  content: string;
  className?: string;
}) {
  const { type = 'body', colorName = 'gray', colorNum = '6', className = '' } = props;
  let TypeClass = '';
  switch (props.type) {
    case 'heading':
      TypeClass = 'font-bold';
    case 'small':
      TypeClass = 'text-sm';
  }
  const TextType = props.type;
  return (
    <span className={`${TypeClass} text-${colorName}-l-${colorNum} ${className}`}>
      {props.content}
    </span>
  );
}
