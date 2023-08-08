import { Link } from 'react-router-dom';
import ProjectContractInterface from '../contracts/abi/Project.json';
import {  useContractRead, useNetwork,useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { formatEther, formatUnits } from 'viem';
import { useState, useEffect} from 'react';
import { Loader } from './Loader'

const BuidlItem = ({ contractAddress , index, tag}) => {
  const { address, connector, isConnected } = useAccount();
  const { chain, chains } = useNetwork()
  let defaultEthLink = chain?.id === 56 ? "https://bscscan.com/address/" 
                  : (chain?.id === 1 ? "https://etherscan.io/address/" 
                  : (chain?.id === 10 ? "https://optimistic.etherscan.io/address/"
                  : "https://arbiscan.io/address/"));

  console.log("contract addresss", contractAddress)
  const projectContractConfig = {
    address: contractAddress,
    abi: ProjectContractInterface,
  };

  const { data: projectDetails } = useContractRead({
    ...projectContractConfig,
    functionName: 'getProjectDetails',
  });

  

  const { data: isRevealed } = useContractRead({
    ...projectContractConfig,
    functionName: 'isRevealed',
  });

  const { data: isVerified } = useContractRead({
    ...projectContractConfig,
    functionName: 'isVerified',
  });

  const { data: filterTags } = useContractRead({
    ...projectContractConfig,
    functionName: 'filterTags',
  });

  const { data: realContribitors } = useContractRead({
    ...projectContractConfig,
    functionName: 'contributiors',
    args:[
      address
    ]
  });
  console.log("this client is contributed?",realContribitors)
  console.log('IS REVEALED', isRevealed);
  console.log('IS VERIFIED', isVerified);
  useEffect(() => {
    console.log("adfsdf")
  },[projectDetails]);
  console.log(projectDetails  );

   
  // let projectStarter = projectDetails[0];
  // let minContribution = projectDetails[1];
  // let projectDeadline = projectDetails[2];
  // let goalAmount = projectDetails[3];
  // let completedTime = projectDetails[4];
  // let currentAmount = projectDetails[5];
  // let title = projectDetails[6];
  // let desc = projectDetails[7];
  // let currentState = projectDetails[8];
  // let balance = projectDetails[9];
  // let website = projectDetails[10];
  // let social = projectDetails[11];
  // let github = projectDetails[12];
  // let projectCover = projectDetails[13];

  let projectStarter; 
  let minContribution ;
  let projectDeadline;
  let goalAmount ;
  let noOfContributors;
  let completedTime ;
  let currentAmount ;
  let title;
  let desc ;
  let currentState; 
  let balance ;
  let website ;
  let social ;
  let github;
  let projectCover;
  console.log('goalAmount', projectDetails);

 
    if(projectDetails !== undefined ){
      projectStarter = projectDetails[0];
      projectDeadline = projectDetails[3];
      goalAmount = projectDetails[4];
      noOfContributors= projectDetails[5];
      completedTime = projectDetails[6];
      currentAmount = projectDetails[7];
      title = projectDetails[8];
      desc = projectDetails[9];
      currentState = projectDetails[10];
      balance = projectDetails[11];
      website = projectDetails[12];
      social = projectDetails[13];
      github = projectDetails[14];
      projectCover = projectDetails[15];
    }else{
      console.log("projectDetails is undefined");

    }

  // const projectStarter = 1241234135123124;
  // const minContribution = 1241234135123124;
  // const projectDeadline = 1241234135123124;
  // const goalAmount = 1241234135123124;
  // const completedTime = 1241234135123124;
  // const currentAmount = 1241234135123124;
  // const title = 1241234135123124;
  // const desc = 1241234135123124;
  // const currentState = 1241234135123124;
  // const balance = 1241234135123124;
  // const website = 1241234135123124;
  // const social = 1241234135123124;
  // const github = 1241234135123124;
  // const projectCover = 1241234135123124;

  console.log('tags', filterTags);
  console.log((Number(currentAmount)/Number(goalAmount)*100).toFixed(2),"=-===-=-=-=-")
  console.log(formatUnits?.( Number(goalAmount),(chain?.id === 56 || chain?.id === 1 ? 18 : 6)))


  return (
    (tag === filterTags || tag === 'popular') && isRevealed ?
    
    <div className='rounded-3xl bg-Ghost-White shadow-details overflow-hidden'>
      <img className='w-full object-cover' src={projectCover} alt='code' />
      <div className='p-2 space-y-2'>
        <Link to={`/buidls/${contractAddress}/${index}`}>
          <h1 className='text-Davy-Grey font-semibold text-sm flex items-center space-x-1'>
            <span>{title}</span>
            <svg
              width='17'
              height='17'
              viewBox='0 0 17 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {isVerified &&
                <path
                d='M15.2716 7.60764L14.3083 6.48848C14.1241 6.27598 13.9754 5.87931 13.9754 5.59598V4.39181C13.9754 3.64098 13.3591 3.02473 12.6083 3.02473H11.4041C11.1279 3.02473 10.7241 2.87598 10.5116 2.69181L9.39246 1.72848C8.90371 1.31056 8.10329 1.31056 7.60746 1.72848L6.49537 2.69889C6.28287 2.87598 5.87912 3.02473 5.60287 3.02473H4.37746C3.62662 3.02473 3.01037 3.64098 3.01037 4.39181V5.60306C3.01037 5.87931 2.86162 6.27598 2.68454 6.48848L1.72829 7.61473C1.31746 8.10348 1.31746 8.89681 1.72829 9.38556L2.68454 10.5118C2.86162 10.7243 3.01037 11.121 3.01037 11.3972V12.6085C3.01037 13.3593 3.62662 13.9756 4.37746 13.9756H5.60287C5.87912 13.9756 6.28287 14.1243 6.49537 14.3085L7.61454 15.2718C8.10329 15.6897 8.90371 15.6897 9.39954 15.2718L10.5187 14.3085C10.7312 14.1243 11.1279 13.9756 11.4112 13.9756H12.6154C13.3662 13.9756 13.9825 13.3593 13.9825 12.6085V11.4043C13.9825 11.1281 14.1312 10.7243 14.3154 10.5118L15.2787 9.39264C15.6895 8.90389 15.6895 8.09639 15.2716 7.60764ZM11.4466 7.16139L8.02537 10.5826C7.92621 10.6818 7.79162 10.7385 7.64996 10.7385C7.50829 10.7385 7.37371 10.6818 7.27454 10.5826L5.56037 8.86848C5.35496 8.66306 5.35496 8.32306 5.56037 8.11764C5.76579 7.91223 6.10579 7.91223 6.31121 8.11764L7.64996 9.45639L10.6958 6.41056C10.9012 6.20514 11.2412 6.20514 11.4466 6.41056C11.652 6.61598 11.652 6.95598 11.4466 7.16139Z'
                fill='#74D12A'
              />
              }
              
            </svg>
          </h1>
        </Link>
        <div>
          <h3 className='text-Davy-Grey font-medium text-sm'>Description</h3>
          <p className='text-Nickle font-normal text-xs'>
            {desc?.slice(0, 50)}
            {/* {desc.length > 1000 && (
              <span className='text-Vampire-Black cursor-pointer'>
                Read more
              </span>
            )} */}
          </p>
        </div>
        <div className='space-y-1'>
          <div className='bg-Steel-Blue h-2 rounded-md w-full relative'>
            <div 
            style={{width: `${(Number(currentAmount) / Number(goalAmount) * 100).toFixed(2)}%`}}
            className={`h-full bg-Chinese-Blue rounded-md`}></div>
          </div>
          <div className='flex items-center justify-between'>
            <h3 className='text-Philipine-Gray font-normal text-xs'>
              Raised:{' '}
              <span className='text-Vampire-Black'>
                ${formatUnits?.(currentAmount === undefined ? 0 : (currentAmount), (chain?.id === 56 || chain?.id === 1 ? 18 : 6) ) || 0}
              </span>
            </h3>
            <h3 className='text-Philipine-Gray font-normal text-xs'>
              Target:{' '}
              <span className='text-Vampire-Black'>
                ${formatUnits?.(goalAmount === undefined ? 0 : (goalAmount),(chain?.id === 56 || chain?.id === 1 ? 18 : 6))}
              </span>
            </h3>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1'>
            <img src='/assets/icons/identicon.svg' width={25} height={25} alt='avatar' className='rounded-2xl	' />
            <a
              href = {defaultEthLink?.concat("",contractAddress)}
              className='text-Davy-Grey font-medium text-xs'
            >
              {projectStarter?.slice(0, 15)}...
            </a>
            <svg
              width='17'
              height='17'
              viewBox='0 0 17 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15.2717 7.60764L14.3083 6.48848C14.1242 6.27598 13.9754 5.87931 13.9754 5.59598V4.39181C13.9754 3.64098 13.3592 3.02473 12.6083 3.02473H11.4042C11.1279 3.02473 10.7242 2.87598 10.5117 2.69181L9.3925 1.72848C8.90375 1.31056 8.10334 1.31056 7.6075 1.72848L6.49542 2.69889C6.28292 2.87598 5.87917 3.02473 5.60292 3.02473H4.3775C3.62667 3.02473 3.01042 3.64098 3.01042 4.39181V5.60306C3.01042 5.87931 2.86167 6.27598 2.68459 6.48848L1.72834 7.61473C1.3175 8.10348 1.3175 8.89681 1.72834 9.38556L2.68459 10.5118C2.86167 10.7243 3.01042 11.121 3.01042 11.3972V12.6085C3.01042 13.3593 3.62667 13.9756 4.3775 13.9756H5.60292C5.87917 13.9756 6.28292 14.1243 6.49542 14.3085L7.61459 15.2718C8.10334 15.6897 8.90375 15.6897 9.39959 15.2718L10.5188 14.3085C10.7313 14.1243 11.1279 13.9756 11.4113 13.9756H12.6154C13.3663 13.9756 13.9825 13.3593 13.9825 12.6085V11.4043C13.9825 11.1281 14.1313 10.7243 14.3154 10.5118L15.2788 9.39264C15.6896 8.90389 15.6896 8.09639 15.2717 7.60764ZM11.4467 7.16139L8.02542 10.5826C7.92625 10.6818 7.79167 10.7385 7.65 10.7385C7.50834 10.7385 7.37375 10.6818 7.27459 10.5826L5.56042 8.86848C5.355 8.66306 5.355 8.32306 5.56042 8.11764C5.76584 7.91223 6.10584 7.91223 6.31125 8.11764L7.65 9.45639L10.6958 6.41056C10.9013 6.20514 11.2413 6.20514 11.4467 6.41056C11.6521 6.61598 11.6521 6.95598 11.4467 7.16139Z'
                fill='#74D12A'
              />
            </svg>
          </div>

          <Link
            to={`/buidls/${contractAddress}/${index}`}
            className='bg-Chinese-Blue text-Pure-White rounded-lg text-xs py-0.5
            px-2'
          >
            {' '}
            Contribute
          </Link>
        </div>
      </div>
    </div>
    : ''
  );
};

export default BuidlItem;
