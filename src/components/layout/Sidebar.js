import { RiCloseCircleLine } from 'react-icons/ri';
import Navbar from './Navbar';
import useWindowPosition from '../../hooks/useWindowPosition';
import { useAccountModal } from '@rainbow-me/rainbowkit';

const iconStyle = { color: '#364C6F', fontSize: '2rem', background: '#fffff' };

const Sidebar = ({ showSideBar, setShowSideBar }) => {
  const scrollPosition = useWindowPosition();
  const { openAccountModal } = useAccountModal();

  return (
    <div
      className={` ${
        showSideBar ? ' left-0 ' : ' -left-80 '
      } top-0 bottom-0  fixed ${
        scrollPosition === 0
          ? 'md:top-28 md:bottom-4 '
          : 'md:top-[4.5rem] md:bottom-0'
      }  md:left-6  duration-300  bg-[#ffffff] z-40 w-64 border-r md:rounded-2xl border-[#F0F0F0]  flex flex-col justify-between`}
    >
      <div
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
        className='absolute md:hidden top-10 -right-4 bg-[#ffffff] rounded-full border-r border-[#F0F0F0]'
      >
        <RiCloseCircleLine style={iconStyle} />
      </div>
      <div className='h-full flex flex-col px-4 md:px-8 py-6'>
        <div className='flex-1 space-y-8 md:space-y-0'>
          <img
            className='md:hidden'
            src='/assets/icons/youbuild.svg'
            alt='youbuild'
          />
          <Navbar setShowSideBar={setShowSideBar} />
        </div>
        <button className='flex items-center space-x-2 font-semibold text-xl text-Chinese-Blue'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2.17804 0.0150146C2.20294 0.0130005 2.224 0 2.25 0H12.9999C14.6539 0 15.9999 1.34601 15.9999 3V3.99994C15.9999 4.552 15.5521 5.00006 15 5.00006C14.4479 5.00006 14.0001 4.552 14.0001 3.99994V3C14.0001 2.44904 13.5511 2.00006 12.9999 2.00006H8.341L8.64606 2.10205C9.45593 2.38202 9.99994 3.14502 9.99994 3.99994V18.9999H12.9999C13.5511 18.9999 14.0001 18.551 14.0001 18V15.9999C14.0001 15.4481 14.4479 15 15 15C15.5521 15 15.9999 15.4481 15.9999 15.9999V18C15.9999 19.654 14.6539 21 12.9999 21H9.99994V21.9999C9.99994 23.103 9.10309 24 8.00006 24C7.78601 24 7.58295 23.9691 7.36304 23.9009L1.35498 21.8979C0.544007 21.618 3.57627e-07 20.855 3.57627e-07 20.0001V2.00006C3.57627e-07 0.834045 1.00507 -0.0800171 2.17804 0.0150146Z'
              fill='#00a4ff'
            />
            <path
              d='M13.2931 9.29297L17.293 5.29303C17.579 5.00702 18.009 4.92096 18.3831 5.07605C18.756 5.23096 18.9999 5.59607 18.9999 6V9H23.0001C23.5519 9 24 9.44806 24 9.99994C24 10.552 23.5519 11.0001 23.0001 11.0001H18.9999V14.0001C18.9999 14.404 18.756 14.7689 18.3831 14.924C18.009 15.0789 17.579 14.993 17.293 14.707L13.2931 10.7069C12.902 10.316 12.902 9.68408 13.2931 9.29297Z'
              fill='#00a4ff'
            />
          </svg>

          <span onClick={openAccountModal}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
