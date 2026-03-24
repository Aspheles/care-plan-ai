import { Oval } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='flex justify-center mt-2'>
      <Oval
        height={70}
        width={70}
        color='blue'
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='blue'
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loading;
