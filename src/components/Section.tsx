interface sectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: sectionProps) {
  return (
    <div className='bg-white p-4 rounded-2xl shadow mt-4'>
      <h2 className='font-semibold mb-2'>{title}</h2>
      {children}
    </div>
  );
}

export default Section;
