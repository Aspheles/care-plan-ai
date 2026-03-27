import { Oval } from 'react-loader-spinner';

interface LoadingProps {
  text: string;
}

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className='flex justify-center items-center text-center flex-col mt-4'>
      <p className='text-lg font-semibold'>{text}</p>

      <div className='mt-4'>
        <Oval
          height={70}
          width={70}
          color='#ffff'
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor='#1D4ED8'
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    </div>
  );
};

export default Loading;
