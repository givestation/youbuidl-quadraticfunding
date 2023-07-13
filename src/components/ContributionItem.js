import ProjectContractInterface from '../contracts/abi/Project.json';
import {  useContractRead, useNetwork } from 'wagmi';
import { useState, useEffect} from 'react';
import { formatEther } from 'viem';

const ContributionItem = ({ contractAddress }) => {

  const { chain, chains } = useNetwork()
  

  let defaultEthLink = chain?.id === 97 ? "https://testnet.bscscan.com/address/" 
                  : (chain?.id === 5 ? "https://goerli.etherscan.io/address/" 
                  : (chain?.id === 420 ? "https://goerli-optimism.etherscan.io/address/"
                  : "https://goerli.arbiscan.io/address/"));

  
  console.log("contract addresss", contractAddress)
  const projectContractConfig = {
    address: contractAddress,
    abi: ProjectContractInterface,
  };

  const { data: projectDetails } = useContractRead({
    ...projectContractConfig,
    functionName: 'getProjectDetails',
  });

  let projectStarter; 
  let minContribution ;
  let projectDeadline;
  let goalAmount ;
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
      minContribution = projectDetails[1];
      projectDeadline = projectDetails[2];
      goalAmount = projectDetails[3];
      completedTime = projectDetails[4];
      currentAmount = projectDetails[5];
      title = projectDetails[6];
      desc = projectDetails[7];
      currentState = projectDetails[8];
      balance = projectDetails[9];
      website = projectDetails[10];
      social = projectDetails[11];
      github = projectDetails[12];
      projectCover = projectDetails[13];
    }else{
      console.log("projectDetails is undefined");

    }

  useEffect(() => {
    console.log("adfsdf")
  },[projectDetails]);
  console.log(projectDetails  )
  return (
    <div className="bg-Anti-Flash-White rounded-3xl shadow-details p-2 flex items-center justify-between flex-col space-y-2 sm:space-y-0 sm:flex-row">
      <div className="flex items-center  w-full sm:w-fit space-x-2">
        <div className="bg-Pure-Black p-2 rounded-2xl w-1/5">
          <img src={projectCover} alt="contribution" />
        </div>
        <div className="space-y-2">
          <h1 className="text-Davy-Grey text-lg font-medium">{title} </h1>
          <h4 className="text-Davy-Grey text-sm font-normal">
            {desc?.slice(0, 50)}
            <br />
           
          </h4>
        </div>
      </div>
      <div className="space-y-1 w-full flex   text-center items-center sm:flex-col sm:w-fit">
        <h3 className="bg-Chinese-Blue flex-1 sm:px-10  rounded-full py-2.5 text-center text-Pure-White/95">
          <span >
            ${formatEther(goalAmount === undefined ? 0 : goalAmount)}
          </span>
        </h3>
        <a href = {defaultEthLink?.concat("",contractAddress)} className="text-Davy-Grey flex-1 text-sm">view campagin</a>
      </div>
    </div>
  );
};

export default ContributionItem;
