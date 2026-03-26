interface editbaleProps {
  placeholder?: string;
  value: string;
  className?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

function Editable({
  className,
  placeholder,
  type,
  onChange,
  value,
  name,
}: editbaleProps) {
  return (
    <input
      className={`w-full border rounded-xl p-2 ${className}`}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
}

export default Editable;
