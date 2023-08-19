export default function InputText(props: {
  onChange: (buttonKey: (string | number | boolean)[]) => void;
  onEnter: (buttonKey: (string | number | boolean)[]) => void;
  value: string;
}) {
  return <input type="text" />;
}
