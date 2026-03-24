import { useState } from 'react';

interface editbaleProps {
  placeholder?: string;
  value: string;
  className?: string;
  type?: string;
  onChange?: () => void;
}

function Editable({ value, className, placeholder, type }: editbaleProps) {
  const [text, setText] = useState(value);
  return (
    <input
      className={`w-full border rounded-xl p-2 ${className}`}
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={placeholder}
      type={type}
    />
  );
}

export default Editable;
