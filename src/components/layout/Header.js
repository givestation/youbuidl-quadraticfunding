import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const iconStyle = { color: '#364C6F', fontSize: '2rem', background: '#fffff' };

const Header = ({ setShowSideBar }) => {
  return (
    <div className='bg-Pure-White flex items-center space-x-2  w-full p-3 md:rounded-2xl'>
      <div className='md:hidden '>
        <GiHamburgerMenu
          onClick={() => {
            setShowSideBar(true);
          }}
          style={iconStyle}
        />
      </div>
      <div className='flex-1 flex items-center  space-x-4 lg:space-x-8'>
        <div className='flex-1 sm:flex-none'>
          <Link to={'/'}>
            <img
              className='cursor-pointer'
              src='/assets/icons/youbuild.svg'
              alt='youbuild'
            />
          </Link>
        </div>
        <div className='bg-Anti-Flash-White rounded-4xl flex-1 hidden sm:flex items-center space-x-2 p-4'>
          <svg
            width='13'
            height='13'
            viewBox='0 0 13 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.06043 10.914C8.74108 10.914 10.9142 8.74093 10.9142 6.06028C10.9142 3.37964 8.74108 1.20654 6.06043 1.20654C3.37979 1.20654 1.2067 3.37964 1.2067 6.06028C1.2067 8.74093 3.37979 10.914 6.06043 10.914Z'
              stroke='#727272'
              strokeWidth='1.3'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M9.49515 9.49463L12.3337 12.3331'
              stroke='#727272'
              strokeWidth='1.3'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <input
            className='bg-[transparent] w-full outline-none font-normal text-sm placeholder-Nickle'
            placeholder='search'
          />
        </div>
        {/* <div className='relative cursor-pointer'>
          <svg
            width='35'
            height='34'
            viewBox='0 0 35 34'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M17.5284 4.12256C12.8392 4.12256 9.0284 7.93339 9.0284 12.6226V16.7167C9.0284 17.5809 8.66006 18.8984 8.2209 19.6351L6.59173 22.3409C5.5859 24.0126 6.28006 25.8684 8.12173 26.4917C14.2276 28.5317 20.8151 28.5317 26.9209 26.4917C28.6351 25.9251 29.3859 23.8992 28.4509 22.3409L26.8217 19.6351C26.3967 18.8984 26.0284 17.5809 26.0284 16.7167V12.6226C26.0284 7.94756 22.2034 4.12256 17.5284 4.12256Z'
              stroke='#818283'
              strokeWidth='2'
              strokeMiterlimit='10'
              strokeLinecap='round'
            />
            <path
              d='M20.1492 4.53354C19.71 4.40604 19.2567 4.30687 18.7892 4.2502C17.4292 4.0802 16.1259 4.17937 14.9075 4.53354C15.3184 3.4852 16.3384 2.74854 17.5284 2.74854C18.7184 2.74854 19.7384 3.4852 20.1492 4.53354Z'
              stroke='#818283'
              strokeWidth='2'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M21.7784 27.0015C21.7784 29.339 19.8659 31.2515 17.5284 31.2515C16.3667 31.2515 15.29 30.7698 14.525 30.0048C13.76 29.2398 13.2784 28.1631 13.2784 27.0015'
              stroke='#818283'
              strokeWidth='2'
              strokeMiterlimit='10'
            />
          </svg>
          <h5 className='absolute top-1 -right-2.5 text-xs bg-Red-RYB text-Pure-White px-1.5 rounded-full'>
            +8
          </h5>
        </div> */}
        <div className='flex items-center md:space-x-4'>
          <div className='hidden md:block text-right'>
            {/* <ConnectButton /> */}
            {/* <h2 className='text-Gray text-lg font-medium'>0XDEre34fr..</h2>
            <h6 className='text-Spanish-Gray font-normal text-xs'>
              @soroushnrz
            </h6> */}
          </div>
          {/* <img src='/assets/icons/metamask.svg' alt='metamask' /> */}
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
