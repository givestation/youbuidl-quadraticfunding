import ProjectContractInterface from '../abi/Project.json';
import {  useContractRead, useNetwork , useAccount} from 'wagmi';
import { useState, useEffect} from 'react';
import { formatEther,formatUnits } from 'viem';

const ContributionItem = ({ contractAddress }) => {

  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount();

  

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
  let noOfContributors;
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

  const { data: realContributors } = useContractRead({
    ...projectContractConfig,
    functionName: 'contributiors',
    args:[
      address
    ]
  });

  useEffect(() => {
    console.log("adfsdf")
  },[projectDetails]);
  console.log("show Project Details!",projectDetails)
  console.log("show contributed amount!",realContributors)
  return (
    Number(realContributors) !== 0 ?
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
            ${formatUnits?.(realContributors === undefined ? 0 : Number(realContributors),(chain?.id === 56 || chain?.id === 1 ? 18 : 6))}
          </span>
        </h3>
        <a href = {defaultEthLink?.concat("",contractAddress)} className="text-Davy-Grey flex-1 text-sm">View Project</a>
      </div>
    </div> : <div></div>
  );
};

export default ContributionItem;
