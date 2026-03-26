interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({
  children,
  disabled,
  className,
  onClick,
  type,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`flex-1 rounded-xl ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
