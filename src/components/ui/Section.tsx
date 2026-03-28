interface sectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

function Section({ title, children, className }: sectionProps) {
  return (
    <div className={`bg-white p-4 rounded-2xl shadow mt-4 ${className}`}>
      <h2 className='font-semibold mb-2'>{title}</h2>
      {children}
    </div>
  );
}

export default Section;
