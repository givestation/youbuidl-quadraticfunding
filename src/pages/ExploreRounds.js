import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CategoriesSelector from '../components/CategoriesSelector';
import { getMatchingPool, getProjects } from "../utils";

const Dashboard = () => {
  const [tagOfProject, setTagOfProject] = useState('popular');
  const [projects, setProjects] = useState([]);
  // const [matchingPool, setMatchingPool] = useState(null);
  // set tag of project

  useEffect(() => {
    const loadProjects = async () => {
      const projectsData = await getProjects();
      setProjects(projectsData)
      // const data = await getMatchingPool();
      // setMatchingPool(data)
    }
    loadProjects()
  }, [])
  return (

    <><div></div><div className='max-w-20xl mx-auto flex relative flex-col space-y-4 xl:space-y-0 xl:flex-row'>
      <div className='flex-1 overflow-hidden space-y-4 md:space-y-6 xl:mr-4'>
        <div className='w-full relative rounded-2xl xl:rounded-3xl bg-gradient-to-b from-Liberty to-Spanish-Violet   py-1.5 px-2 md:p-4 xl:px-6 xl:py-4 flex items-center flex-col xl:flex-row xl:space-x-4'>
          <img
            className='absolute  top-0 left-10 z-0'
            src='/assets/images/pattren.png'
            alt='pattren' />

          <div className='flex-1 xl:mt-0 text-left space-y-4 xl:space-y-2 z-10'>
            <div>
              <div className='flex items-center  justify-between'>
                <div className='space-y-4 xl:space-y-0'>
                  <h1 className='flex-1 text-Bright-Gray font-bold text-xl sm:text-2xl xl:text-4xl'>
                    Explore QF Round on Youbuidl.
                    <br />
                    Current round: 1
                    Matching Pool - $10,000
                  </h1>
                  <h6 className='text-Philipine-Silver font-normal text-xs md:text-sm xl:text-base'>
                    YouBuidl is crowdfunding web3 tool created by GiveStation
                    for developers, creators and teams.
                  </h6>
                </div>
                <img
                  className='max-w-[8rem] md:max-w-xs xl:hidden'
                  src='/assets/images/rocket.png'
                  alt='rocket' />
              </div>
            </div>

            <div className='flex items-center flex-row w-full space-x-1.5 sm:space-x-3 justify-around'>
              <Link
                to='/projects'
                className='w-1/3 text-base text-center bg-Pure-White text-Chinese-Blue rounded-4xl py-2 md:py-3 xl:py-4 sm:font-semibold w-full  xl:font-bold '
              >
                Explore Rounds
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
          

          <div className='flex items-center space-x-4'>
          </div>
        </div>

        <div className="flex items-center overflow-x-auto flex-nowrap space-x-8 lg:space-x-10 xlspace-x-20">
        <details class="group transition-all duration-150 h-10 open:h-28 overflow-hidden w-56">
        <summary class="transition-all duration-500 flex cursor-pointer items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>

          <span class="ml-3 text-sm font-medium"> Sort by Networks</span>

          <span class="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </span>
        </summary>

        <nav class="mt-1.5 ml-8 flex flex-col transition-all duration-500">
          <a href="" class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>

            <span class="ml-3 text-sm font-medium">Arbitrum</span>
          </a>

          <a href="" class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>

            <span class="ml-3 text-sm font-medium">Arbitrum</span>
          </a>

          <a href="" class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <span class="ml-3 text-sm font-medium"> Optimism </span>
          </a>

          <a href="" class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <span class="ml-3 text-sm font-medium"> Optimism </span>
          </a>

          <a href="" class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <span class="ml-3 text-sm font-medium"> Optimism </span>
          </a>

          <a href="" class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <span class="ml-3 text-sm font-medium"> Optimism </span>
          </a>
        </nav>
      </details>
      {/* <div className="flex items-center  cursor-pointer"> */}
      <button className="flex items-center space-x-4"
          onClick={() => {onSubmit('popular')}}>
          <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          </div>
          <h3 className="text-Spanish-Gray">Sort</h3>
        </button>
        <button className="flex items-center space-x-4"
          onClick={() => {onSubmit('ai')}}>
          <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          </div>
          <input id="link-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

          <h3 className="text-Spanish-Gray">Active</h3>
        </button>
      {/* </div> */}
      <button className="flex items-center space-x-4"
          onClick={() => {onSubmit('ai')}}>
          <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          </div>
          <input id="link-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

          <h3 className="text-Spanish-Gray">Upcoming</h3>
        </button>
        <button className="flex items-center space-x-4"
          onClick={() => {onSubmit('ai')}}>
          <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          </div>
          <input id="link-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

          <h3 className="text-Spanish-Gray">Ended</h3>
        </button>
        <button className="flex items-center space-x-4"
          onClick={() => {onSubmit('ai')}}>
          <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          </div>
          <input id="link-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

          <h3 className="text-Spanish-Gray">AI</h3>
        </button>
    </div>
    



        <section class="py-20">
          <div class="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
            <article class="rounded-xl bg-white p-1 shadow-lg hover:shadow-xl">
              <a href="#">
                <div class="relative flex items-end overflow-hidden rounded-xl">
                  <img src="/assets/images/ai-cryptocurrencies-cover.jpg.jpg" alt="Hotel Photo" />
                  <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                  <div className="flex items-center text-xs w-fit rounded-xl p-1 gap-0.5" style={{ background: "#CDEDFF" }}>
                <div><img src="/assets/images/oplogosmall.png" alt="" /></div>
                <div style={{ color: "#00000" }}>200 Projects</div>
              </div>
                  </div>
                </div>

                <div class="mt-1 p-2">
                  <h2 class="text-slate-700">YouBuidl Builders Grants</h2>
                  <p class="text-slate-400 mt-1 text-sm">This round was created to empower Optimism developers.</p>

                  <div className='flex items-center justify-between'>
              <h3 className=' font-normal text-xs flex items-center gap-0.8'>
                <div style={{ color: "#00000", background: "#DAFFB2" }} className="bg-gray-400 rounded p-0.8"><span class="text-lg font-bold text-blue-500">$50,000</span>
                      <span class="text-slate-400 text-sm"> | Match</span></div>
                <div className='text-Vampire-Black mt-1'>
                </div>
              </h3>

                    <div class="relative flex items-end overflow-hidden rounded-xl">
                    <button type="button" class="text-white bg-blue-0 hover:bg-blue-0 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 7 7" fill="none">
                    <ellipse cx="3.43124" cy="3.01465" rx="3.27187" ry="3.01465" fill="#12D69B" />
                  </svg>
Ends in 3 days
</button>
                    </div>
                  </div>
                </div>
              </a>
            </article>

            <article class="rounded-xl bg-white p-1 shadow-lg hover:shadow-xl">
              <a href="#">
                <div class="relative flex items-end overflow-hidden rounded-xl">
                  <img src="/assets/images/ai-cryptocurrencies-cover.jpg.jpg" alt="Hotel Photo" />
                  <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                  <div className="flex items-center text-xs w-fit rounded-xl p-1 gap-0.5" style={{ background: "#CDEDFF" }}>
                <div><img src="/assets/images/arbitrum.png" alt="" /></div>
                <div style={{ color: "#00000" }}>200 Projects</div>
              </div>
                  </div>
                </div>

                <div class="mt-1 p-2">
                  <h2 class="text-slate-700">YouBuidl Builders Grants</h2>
                  <p class="text-slate-400 mt-1 text-sm">This round was created to empower Optimism developers.</p>

                  <div className='flex items-center justify-between'>
              <h3 className=' font-normal text-xs flex items-center gap-0.7'>
                <div style={{ color: "#00000", background: "#DAFFB2" }} className="bg-gray-400 rounded p-0.8"><span class="text-lg font-bold text-blue-500">$50,000</span>
                      <span class="text-slate-400 text-sm"> | Match</span></div>
                <div className='text-Vampire-Black mt-1'>
                </div>
              </h3>

              <div class="relative flex items-end overflow-hidden rounded-xl">
                    <button type="button" class="text-white bg-blue-0 hover:bg-blue-0 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 7 7" fill="none">
                    <ellipse cx="3.43124" cy="3.01465" rx="3.27187" ry="3.01465" fill="#12D69B" />
                  </svg>
Ends in 3 days
</button>
                    </div>
                  </div>
                </div>
              </a>
            </article>

            <article class="rounded-xl bg-white p-1 shadow-lg hover:shadow-xl">
              <a href="#">
                <div class="relative flex items-end overflow-hidden rounded-xl">
                  <img src="/assets/images/ai-cryptocurrencies-cover.jpg.jpg" alt="Hotel Photo" />
                  <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                  <div className="flex items-center text-xs w-fit rounded-xl p-1 gap-0.5" style={{ background: "#CDEDFF" }}>
                <div><img src="/assets/images/oplogosmall.png" alt="" /></div>
                <div style={{ color: "#00000" }}>200 Projects</div>
              </div>
                  </div>
                </div>

                <div class="mt-1 p-2">
                  <h2 class="text-slate-700">YouBuidl Builders Grants</h2>
                  <p class="text-slate-400 mt-1 text-sm">This round was created to empower Optimism developers.</p>

                  <div className='flex items-center justify-between'>
              <h3 className=' font-normal text-xs flex items-center gap-0.7'>
                <div style={{ color: "#00000", background: "#DAFFB2" }} className="bg-gray-400 rounded p-0.8"><span class="text-lg font-bold text-blue-500">$50,000</span>
                      <span class="text-slate-400 text-sm"> | Match</span></div>
                <div className='text-Vampire-Black mt-1'>
                </div>
              </h3>

              <div class="relative flex items-end overflow-hidden rounded-xl">
                    <button type="button" class="text-white bg-blue-0 hover:bg-blue-0 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 7 7" fill="none">
                    <ellipse cx="3.43124" cy="3.01465" rx="3.27187" ry="3.01465" fill="#12D69B" />
                  </svg>
Ends in 3 days
</button>
                    </div>
                  </div>
                </div>
              </a>
            </article>
          </div>
        </section>
      </div>
    </div></>
  );
};

export default Dashboard;
