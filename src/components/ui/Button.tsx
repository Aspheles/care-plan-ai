interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, disabled, className, onClick }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`flex-1 rounded-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
