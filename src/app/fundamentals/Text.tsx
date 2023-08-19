export default function Text(props: { type: 'heading' | 'body' | 'small'; content: string }) {
  return <p>{props.content}</p>;
}
