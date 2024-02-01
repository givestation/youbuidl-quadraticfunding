import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import BuidlItem from '../components/BuidlItem';
import CategoriesSelector from '../components/CategoriesSelector';
import { getProjects } from "../utils";
import { useChainContext } from "../utils/Context";

const Dashboard = () => {
  const [tagOfProject, setTagOfProject] = useState('popular');
  const [projects, setProjects] = useState([]);
  // const [matchingPool, setMatchingPool] = useState(null);
  // set tag of project

  const { setReferral } = useChainContext();

  useEffect(() => {
    const loadProjects = async () => {
      const projectsData = await getProjects();
      setProjects(projectsData)
      // const data = await getMatchingPool();
      // setMatchingPool(data)
    }
    loadProjects()

    const pathName = window.location.href;
    const pieces = pathName.split('?r=');
    if (pieces.length == 2) {
      const referral = pieces[1];
      setReferral(referral);
    }
  }, [])

  return (

    <div className='max-w-20xl mx-auto flex relative flex-col space-y-4 xl:space-y-0 xl:flex-row'>
      <div className='flex-1 overflow-hidden space-y-4 md:space-y-6 xl:mr-4'>
        <div className='w-full relative rounded-2xl xl:rounded-3xl bg-gradient-to-b from-Liberty to-Spanish-Violet   py-1.5 px-2 md:p-4 xl:px-6 xl:py-4 flex items-center flex-col xl:flex-row xl:space-x-4'>
          <img
            className='absolute  top-0 left-10 z-0'
            src='/assets/images/pattren.png'
            alt='pattren'
          />

          <div className='flex-1 xl:mt-0 text-left space-y-4 xl:space-y-2 z-10'>
            <div>
              <div className='flex items-center  justify-between'>
                <div className='space-y-4 xl:space-y-0'>
                  <h1 className='flex-1 text-Bright-Gray font-bold text-xl sm:text-2xl xl:text-4xl'>
                    YouBuidl Quadratic Funding
                    <br />
                    Round 1. Matching Pool - $10,000
                  </h1>
                  <h6 className='text-Philipine-Silver font-normal text-xs md:text-sm xl:text-base'>
                    YouBuidl is crowdfunding web3 tool created by GiveStation
                    for developers, creators and teams. 
                  </h6>
                </div>
                <img
                  className='max-w-[8rem] md:max-w-xs xl:hidden'
                  src='/assets/images/rocket.png'
                  alt='rocket'
                />
              </div>
            </div>

            <div className='flex items-center flex-row w-full space-x-1.5 sm:space-x-3 justify-around'>
              <Link
                to='/projects'
                className='w-1/3 text-base text-center bg-Pure-White text-Chinese-Blue rounded-4xl py-2 md:py-3 xl:py-4 sm:font-semibold w-full  xl:font-bold '
              >
                Explore Builds
              </Link>
              <Link
                to='/create-project'
                className='w-1/3 text-center text-base duration-300 text-Philipine-Silver hover:bg-Pure-White hover:text-Chinese-Blue rounded-4xl py-2 md:py-3 xl:py-4 sm:font-semibold w-full  xl:font-bold'
              >
                Submit a project
              </Link>
            </div>
          </div>
          <div className='hidden xl:block   z-10'>
            <img className='' src='/assets/images/rocket.png' alt='rocket' />
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <h1 className='text-Raisin-Black font-semibold text-lg'>
            Trending Buidls
          </h1>
          <div className='flex items-center space-x-4'>
            <svg
              className='cursor-pointer'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.68 18.8C10.8674 18.8 11.83 17.8374 11.83 16.65C11.83 15.4626 10.8674 14.5 9.68 14.5C8.49259 14.5 7.53 15.4626 7.53 16.65C7.53 17.8374 8.49259 18.8 9.68 18.8Z'
                stroke='#43489D'
                strokeWidth='1.2'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M7.53 16.6499H4.5'
                stroke='#43489D'
                strokeWidth='1.2'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M19.5 16.6499H14.17'
                stroke='#43489D'
                strokeWidth='1.2'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M14.31 9.8C15.4974 9.8 16.46 8.83741 16.46 7.65C16.46 6.46259 15.4974 5.5 14.31 5.5C13.1226 5.5 12.16 6.46259 12.16 7.65C12.16 8.83741 13.1226 9.8 14.31 9.8Z'
                stroke='#43489D'
                strokeWidth='1.2'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M16.47 7.6499H19.5'
                stroke='#43489D'
                strokeWidth='1.2'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M4.5 7.6499H9.83'
                stroke='#43489D'
                strokeWidth='1.2'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <svg
              className='cursor-pointer'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle
                cx='4.75'
                cy='12.25'
                r='1.75'
                transform='rotate(-90 4.75 12.25)'
                fill='#43489D'
              />
              <circle
                cx='11.75'
                cy='12.25'
                r='1.75'
                transform='rotate(-90 11.75 12.25)'
                fill='#43489D'
              />
              <circle
                cx='18.75'
                cy='12.25'
                r='1.75'
                transform='rotate(-90 18.75 12.25)'
                fill='#43489D'
              />
            </svg>
          </div>
        </div>
        <CategoriesSelector onSubmit={(args) => {
          setTagOfProject(args)
        }} />
        <div className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {projects?.map((item, index) => (
            <BuidlItem key={index} project={item} tag={tagOfProject} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
