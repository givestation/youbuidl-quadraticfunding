import { useState, Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import {  useContractRead,usePrepareContractWrite,useContractWrite } from 'wagmi';
import { formatEther } from 'viem';
import ProjectContractInterface from '../contracts/abi/Project.json';
import Modals from "../components/modals";
import CongratsModalWrapper from "../components/modals/CongratsModalWrapper";
import { useNetwork,useAccount } from 'wagmi';
import CrowdFundingContractInterface from '../contracts/abi/Crowdfunding.json';
import Erc20Json from '../contracts/abi/ERC20.json';
import Loader from '../components/Loader';
import web3 from 'web3';

const addressBnb = "0x70207e6063189A905771739499F2A3991a03E4c0";
const addressEth = "0xcA90Ae5d47F616A8836ae04E1BBcc6267554F591";
const addressArbi = "0xBFb60BEE0E53B70C8B118026711Bb488c63ECA83";

const BuidlDetails = () => {
  const navigate  = useNavigate();
  const { chain, chains } = useNetwork();
  const { address, connector, isConnected } = useAccount();
  const currentLocation  = useLocation();
  const projectContractAddress = currentLocation.pathname?.slice(8,50);
  // Details Modal State
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  // Loading modal
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  // Congrats Contributed Modal State
  const [contributedCongratsModal, setContributedCongratsModal] = useState(true);
  // Congrats Approved Modal State
  const [approvedCongratsModal, setApprovedCongratsModal] = useState(true);
  // set token
  const [contributedAmount, setContributedAmount] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("BUSD");
  const [selectedCryptoAddress, setSelectedCryptoAddress] = useState("0xc66bC634d5b35DbcbBaa62D97559843788036c7d");

  const cryptosBNB = [{name:"BUSD", address:"0xc66bC634d5b35DbcbBaa62D97559843788036c7d"},
                  {name:"USDC", address:"0x5412a933a20d65531B119B224839d160Dc411bdb"},
                  {name:"USDT", address:"0xCa3D1fE4d6310730b79686C3Bd6ADA93f0d87D2D"}
                  ];

  const cryptosETH = [{name:"DAI", address:"0x6b175474e89094c44da98b954eedeac495271d0f"},
                  {name:"USDC", address:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"},
                  {name:"USDT", address:"0xdac17f958d2ee523a2206206994597c13d831ec7"}
                 ];

  const cryptosArbi = [
                  {name:"USDC", address:"0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"},
                  {name:"USDT", address:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9 "}
                ];

  const cryptosOpti = [
                  {name:"USDC", address:"0x7f5c764cbc14f9669b88837ca1490cca17c31607"},
                  {name:"USDT", address:"0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"},
                ];
 

  let defaultEthLink = chain?.id === 97 ? "https://testnet.bscscan.com/address/" 
                  : (chain?.id === 5 ? "https://goerli.etherscan.io/address/" 
                  : (chain?.id === 420 ? "https://goerli-optimism.etherscan.io/address/"
                  : "https://goerli.arbiscan.io/address/"));


//====================Crowdfunding contractConfig===============
let contractConfig = {};
if (chain === undefined){
  console.log("plz connect metamask")
}else{
  contractConfig = {
    address: (chain.id === 97 ? addressBnb : (chain.id === 5 ? addressEth : addressArbi)),
    abi: CrowdFundingContractInterface,
  };
  console.log("ContractConfig Data",contractConfig)
}

//===========stable token Contract Config================
let erc20ContractConfig = {};
erc20ContractConfig = {
  address: selectedCryptoAddress,
  abi: Erc20Json,
};
  
//===========project Contract config==============
  const projectContractConfig = {
    address: projectContractAddress,
    abi: ProjectContractInterface,
  };

  const { data: projectDetails } = useContractRead({
    ...projectContractConfig,
    functionName: 'getProjectDetails',
  });
  console.log('ProjectDetails', projectDetails);

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
    console.log("projecteDetails is undefined!!!");
  }
//=============verify information of project=======
  const { data: isVerified } = useContractRead({
    ...projectContractConfig,
    functionName: 'isVerified',
  });

  console.log("this project is verified?",isVerified)

 //=============Contribute  token===========
  const {
    config: contributeConfig,
    error: contributeConfigError,
    isError: isContributeConfigError,
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'contribute',
    args: [
      projectContractAddress,
      selectedCryptoAddress,
      contributedAmount,
    ],
  });

  const {
    data: contributeReturnData,
    write: contribute,
    error: contributeError,
    isLoading: contributedLoading,
    isSuccess: contributedSucess,
  } = useContractWrite(contributeConfig);

  //=============Approve stable token===========
  const {
    config: erc20ApproveContractConfig,
    error: erc20ApproveConfigError,
    isError: isErc20ContractConfigError,
  } = usePrepareContractWrite({
    ...erc20ContractConfig,
    functionName: 'approve',
    args: [
      projectContractAddress,
      contributedAmount,
    ],
  });

  const {
    data: erc20ApproveReturnData,
    write: approve,
    error: Erc20ApproveError,
    isLoading: approvedLoading,
    isSuccess: approvedSuccess,
  } = useContractWrite(erc20ApproveContractConfig);

  //===========verify Project====================

  const {
    config: verifyProjectConfig,
    error: verifyProjectConfigError,
    isError: isVerifyProjectConfigError,
  } = usePrepareContractWrite({
    ...projectContractConfig,
    functionName: 'setVerification',
    args: [
      true
    ],
  });

  const {
    data: verifyProjectReturnData,
    write: setVerification,
    error: verifyProjectError,
    isSuccess
  } = useContractWrite(verifyProjectConfig);

  useEffect(() => {
    if(isVerified == false){
      setVerification?.();
    }
  },[projectDetails]);

//==========main functions==============

  const onContributedAmount = (e) => {
    setContributedAmount(
      web3.utils.toBigInt(web3.utils.toWei(e.target.value, 'ether'))
    );
  };
  
  const approveToken = async () => {
    console.log("args for approve", projectContractAddress, contributedAmount)
    approve?.();
  }

  const contributeSmart = async () => {
    console.log( "args for Contribute Functions!", projectContractAddress, selectedCryptoAddress, contributedAmount )
    contribute?.();
  };

  console.log("current currency", selectedCrypto, contributedAmount, selectedCryptoAddress);
  console.log("for contribute",contributeConfigError)

  return (
    <>
      <Modals showModal={showDetailsModal} setShowModal={setShowDetailsModal}>
        <div className="max-w-sm rounded-2xl bg-Pure-White">
          <img
            src={projectCover ? projectCover : "https://images.pexels.com/photos/1178758/pexels-photo-1178758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            alt="dog"
          />
          <div className="px-3 pt-3 pb-1.5 space-y-4">
            <div className="space-y-1">
              <h1 className="flex items-center space-x-2 text-Rich-Black font-normal text-sm">
                <span>Grant title - {title}</span>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2717 7.6074L14.3083 6.48823C14.1242 6.27573 13.9754 5.87907 13.9754 5.59573V4.39157C13.9754 3.64073 13.3592 3.02448 12.6083 3.02448H11.4042C11.1279 3.02448 10.7242 2.87573 10.5117 2.69157L9.3925 1.72823C8.90375 1.31032 8.10334 1.31032 7.6075 1.72823L6.49542 2.69865C6.28292 2.87573 5.87917 3.02448 5.60292 3.02448H4.3775C3.62667 3.02448 3.01042 3.64073 3.01042 4.39157V5.60282C3.01042 5.87907 2.86167 6.27573 2.68459 6.48823L1.72834 7.61448C1.3175 8.10323 1.3175 8.89657 1.72834 9.38532L2.68459 10.5116C2.86167 10.7241 3.01042 11.1207 3.01042 11.397V12.6082C3.01042 13.3591 3.62667 13.9753 4.3775 13.9753H5.60292C5.87917 13.9753 6.28292 14.1241 6.49542 14.3082L7.61459 15.2716C8.10334 15.6895 8.90375 15.6895 9.39959 15.2716L10.5188 14.3082C10.7313 14.1241 11.1279 13.9753 11.4113 13.9753H12.6154C13.3663 13.9753 13.9825 13.3591 13.9825 12.6082V11.4041C13.9825 11.1278 14.1313 10.7241 14.3154 10.5116L15.2788 9.3924C15.6896 8.90365 15.6896 8.09615 15.2717 7.6074ZM11.4467 7.16115L8.02542 10.5824C7.92625 10.6816 7.79167 10.7382 7.65 10.7382C7.50834 10.7382 7.37375 10.6816 7.27459 10.5824L5.56042 8.86823C5.355 8.66282 5.355 8.32282 5.56042 8.1174C5.76584 7.91198 6.10584 7.91198 6.31125 8.1174L7.65 9.45615L10.6958 6.41032C10.9013 6.2049 11.2413 6.2049 11.4467 6.41032C11.6521 6.61573 11.6521 6.95573 11.4467 7.16115Z"
                    fill="#74D12A"
                  />
                </svg>
              </h1>
              <h3 className="text-Rich-Black font-normal text-sm">
                Creator - {projectStarter?.slice(0, 10) + "..." + projectStarter?.slice(38, 42)}
              </h3>
              <p className="bg-Chinese-Blue inline text-Pure-White rounded-lg text-xs py-0.5 px-4">
                WEB3
              </p>
            </div>
            <div className="text-Eire-Black space-y-0.5">
              <div className="flex justify-center ">
                <h2 className="font-medium text-base flex-1 text-center">
                  Contributing
                </h2>
                <h2 className="font-medium text-base flex-1 text-center">
                  {contributedAmount}
                </h2>
              </div>
              <div className="flex justify-center ">
                <h2 className="font-medium text-base flex-1 text-center">
                  {selectedCrypto} Reward
                </h2>
                <h2 className="font-medium text-base flex-1 text-center">
                  0.0045
                </h2>
              </div>
              <div className="flex justify-center ">
                <h2 className="font-medium text-base flex-1 text-center">
                  GVST Reward
                </h2>
                <h2 className="font-medium text-base flex-1 text-center">
                  0.0045
                </h2>
              </div>
              <div className="flex justify-center ">
                <h2 className="font-medium text-base flex-1 text-center">
                  Total
                </h2>
                <h2 className="font-medium text-base flex-1 text-center">
                  0.0045
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 font-semibold text-base">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-Chinese-Blue border-2 border-Chinese-Blue flex-1 py-2 rounded-4xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  approveToken();
                }}
                className="bg-Chinese-Blue flex-1 border border-Chinese-Blue text-Pure-White py-2 rounded-4xl"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  contributeSmart();
                }}
                className="bg-Chinese-Blue flex-1 border border-Chinese-Blue text-Pure-White py-2 rounded-4xl"
              >
                Contribute
              </button>
              
            </div>
            <hr className="h-1 mx-auto w-4/12 rounded-full bg-Pure-Black" />
          </div>
        </div>
      </Modals>

      {/* Approved Modal loading and congratulation */}
      {approvedLoading && <Loader showModal={true} setShowModal={setShowLoadingModal}/>}
      {approvedSuccess && 
        <Modals
          showModal={approvedCongratsModal}
          setShowModal={setApprovedCongratsModal}
        >
          <CongratsModalWrapper>
            {" "}
            <div className="space-y-2 py-6">
              <h1 className="text-Bright-Gray font-medium text-xl">
                Congratulation!
              </h1>
              <h4 className="text-Bright-Gray/90 font-normal text-sm">
                You have successfully approved {contributedAmount} {selectedCrypto}
                <span className="font-semibold"> 0.45 USDT</span> to this project.
                <br />
                Kindly check the reward page to claim your{" "}
                <span className="font-semibold"> GVST</span>
              </h4>
            </div>
            <button
              onClick={() => setApprovedCongratsModal(false)}
              className="bg-Pure-White text-Pure-Black text-sm font-medium rounded-xl py-2 px-6"
            >
              Close
            </button>
          </CongratsModalWrapper>
        </Modals>
      }

      {/* Contributed Modal loading and congratulation*/}
      {contributedLoading && <Loader showModal={true} setShowModal={setShowLoadingModal}/>}
      {contributedSucess && 
        <Modals
          showModal={contributedCongratsModal}
          setShowModal={setContributedCongratsModal}
        >
          <CongratsModalWrapper>
            {" "}
            <div className="space-y-2 py-6">
              <h1 className="text-Bright-Gray font-medium text-xl">
                Congratulation!
              </h1>
              <h4 className="text-Bright-Gray/90 font-normal text-sm">
                You have successfully contributed {contributedAmount} {selectedCrypto}
                <span className="font-semibold"> 0.45 USDT</span> to this project.
                <br />
                Kindly check the reward page to claim your{" "}
                <span className="font-semibold"> GVST</span>
              </h4>
            </div>
            <button
              onClick={() => setContributedCongratsModal(false)}
              className="bg-Pure-White text-Pure-Black text-sm font-medium rounded-xl py-2 px-6"
            >
              Close
            </button>
          </CongratsModalWrapper>
        </Modals>
      }
      
      <div className="space-y-4  max-w-5xl mx-auto">
        <h1 className="text-Raisin-Black font-semibold text-xl">
          Buidl Details
        </h1>
        <div className="rounded-xl md:rounded-4xl overflow-hidden bg-Pure-White shadow-details">
          <div className=" w-full relative">
            <img
              className=" max-h-96 w-full object-cover"
              src={projectCover ? projectCover : "https://images.pexels.com/photos/1178758/pexels-photo-1178758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
              alt="dog"
            />
            <div className="absolute bottom-4 px-4 sm:px-10">
              <div className="flex items-center space-x-1">
                <h1 className="text-Pure-White font-semibold text-xl">
                  {title}
                </h1>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2717 7.60764L14.3083 6.48848C14.1242 6.27598 13.9754 5.87931 13.9754 5.59598V4.39181C13.9754 3.64098 13.3592 3.02473 12.6083 3.02473H11.4042C11.1279 3.02473 10.7242 2.87598 10.5117 2.69181L9.3925 1.72848C8.90375 1.31056 8.10334 1.31056 7.6075 1.72848L6.49542 2.69889C6.28292 2.87598 5.87917 3.02473 5.60292 3.02473H4.3775C3.62667 3.02473 3.01042 3.64098 3.01042 4.39181V5.60306C3.01042 5.87931 2.86167 6.27598 2.68459 6.48848L1.72834 7.61473C1.3175 8.10348 1.3175 8.89681 1.72834 9.38556L2.68459 10.5118C2.86167 10.7243 3.01042 11.121 3.01042 11.3972V12.6085C3.01042 13.3593 3.62667 13.9756 4.3775 13.9756H5.60292C5.87917 13.9756 6.28292 14.1243 6.49542 14.3085L7.61459 15.2718C8.10334 15.6897 8.90375 15.6897 9.39959 15.2718L10.5188 14.3085C10.7313 14.1243 11.1279 13.9756 11.4113 13.9756H12.6154C13.3663 13.9756 13.9825 13.3593 13.9825 12.6085V11.4043C13.9825 11.1281 14.1313 10.7243 14.3154 10.5118L15.2788 9.39264C15.6896 8.90389 15.6896 8.09639 15.2717 7.60764ZM11.4467 7.16139L8.02542 10.5826C7.92625 10.6818 7.79167 10.7385 7.65 10.7385C7.50834 10.7385 7.37375 10.6818 7.27459 10.5826L5.56042 8.86848C5.355 8.66306 5.355 8.32306 5.56042 8.11764C5.76584 7.91223 6.10584 7.91223 6.31125 8.11764L7.65 9.45639L10.6958 6.41056C10.9013 6.20514 11.2413 6.20514 11.4467 6.41056C11.6521 6.61598 11.6521 6.95598 11.4467 7.16139Z"
                    fill="#74D12A"
                  />
                </svg>
              </div>
              <div className="flex items-center space-x-1">
                <img src="/assets/images/avatar-4.png" alt="avatar" />
                <h3 className="text-Bright-Gray font-medium text-xs">
                  {projectStarter?.slice(0, 10) + "..." + projectStarter?.slice(38, 42)}
                </h3>
              </div>
            </div>
            <div className="absolute top-4 flex items-center justify-between w-full px-4 sm:px-10">
              <div
                onClick={() => {
                  navigate(-1);
                }}
                className="bg-Steel-Blue rounded-lg p-2 bg-opacity-30 shadow-sm cursor-pointer"
              >
                <svg
                  width="31"
                  height="32"
                  viewBox="0 0 31 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.8"
                    d="M24.3287 15.979H6.74658"
                    stroke="white"
                    strokeWidth="2.51174"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    opacity="0.8"
                    d="M15.5377 24.7701L6.74658 15.9791L15.5377 7.18799"
                    stroke="white"
                    strokeWidth="2.51174"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <a
                href = {defaultEthLink?.concat("",projectContractAddress)}
                className="bg-Chinese-Blue text-Pure-White rounded-md text-xs py-0.5 px-2"
              >
                view on explorer
              </a>
            </div>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-Philipine-Gray font-normal text-base">
                  Raised so far
                </h4>
                <h1 className="text-Vampire-Black font-semibold text-xl">
                  ${formatEther(currentAmount === undefined ? 0 : currentAmount ) || 0}
                  <span className="text-Philipine-Gray font-normal text-sm">
                    0%
                  </span>
                </h1>
              </div>
              <div>
                <h4 className="text-Philipine-Gray font-normal text-base">
                  Target
                </h4>
                <h1 className="text-Vampire-Black font-semibold text-xl">
                  ${formatEther(goalAmount === undefined ? 0 : goalAmount)}
                </h1>
              </div>
            </div>

            <div className="bg-Steel-Blue h-2 rounded-md w-full relative">
              <div
                className={`w-[85%] h-full bg-Chinese-Blue rounded-md`}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.6071 22.6983V20.6052C21.6071 19.4949 21.1661 18.4301 20.381 17.6451C19.5959 16.86 18.5312 16.4189 17.4209 16.4189H9.04844C7.93818 16.4189 6.8734 16.86 6.08833 17.6451C5.30326 18.4301 4.86221 19.4949 4.86221 20.6052V22.6983"
                    stroke="#ADADAD"
                    strokeWidth="1.25587"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.2349 12.2328C15.5469 12.2328 17.4211 10.3586 17.4211 8.04658C17.4211 5.73459 15.5469 3.86035 13.2349 3.86035C10.9229 3.86035 9.04865 5.73459 9.04865 8.04658C9.04865 10.3586 10.9229 12.2328 13.2349 12.2328Z"
                    stroke="#ADADAD"
                    strokeWidth="1.25587"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-Vampire-Black font-normal text-lg">117K</h3>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5587 23.0239C18.3387 23.0239 23.0243 18.3383 23.0243 12.5583C23.0243 6.77837 18.3387 2.09277 12.5587 2.09277C6.77873 2.09277 2.09314 6.77837 2.09314 12.5583C2.09314 18.3383 6.77873 23.0239 12.5587 23.0239Z"
                    stroke="#ADADAD"
                    strokeWidth="1.25587"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5586 6.2793V12.5586L16.7448 14.6518"
                    stroke="#ADADAD"
                    strokeWidth="1.25587"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-Vampire-Black font-normal text-lg">
                  {completedTime} days left
                </h3>
              </div>
            </div>

            <div>
              <h1 className="text-Vampire-Black font-semibold text-xl">
                Description
              </h1>
              <p className="text-Nickle font-normal text-sm sm:text-base">
                {desc}
                <br />
                <span className="text-Vampire-Black font-semibold cursor-pointer text-base">
                  Read more
                </span>
              </p>
            </div>

            <div className="flex w-full items-center justify-between flex-col space-y-4 sm:space-y-0 sm:flex-row">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-Ghost-White shadow-3xl p-2 cursor-pointer">
                  <svg
                    width="27"
                    height="31"
                    viewBox="0 0 27 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.6154 29.8334V24.5573C18.6635 23.9072 18.5809 23.2537 18.3731 22.6401C18.1653 22.0266 17.8371 21.4672 17.4102 20.999C21.4359 20.5218 25.6667 18.8994 25.6667 11.4556C25.6663 9.55213 24.9778 7.72168 23.7436 6.34307C24.328 4.67776 24.2867 2.83703 23.6282 1.20328C23.6282 1.20328 22.1154 0.726107 18.6154 3.22102C15.6769 2.37414 12.5795 2.37414 9.64102 3.22102C6.14102 0.726107 4.6282 1.20328 4.6282 1.20328C3.9697 2.83703 3.92838 4.67776 4.51281 6.34307C3.26938 7.7319 2.58015 9.5789 2.58973 11.4965C2.58973 18.8858 6.8205 20.5082 10.8461 21.0399C10.4243 21.5034 10.099 22.0561 9.89141 22.6621C9.68378 23.2682 9.59846 23.9139 9.64102 24.5573V29.8334M9.64102 25.7434C3.23076 27.7884 3.23076 22.335 0.666656 21.6534L9.64102 25.7434Z"
                      stroke="#006ED4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="rounded-full bg-Ghost-White shadow-3xl p-2 cursor-pointer">
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.6667 1.33325L12.6667 16.3333"
                      stroke="#229ED9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M27.6667 1.33325L18.3333 27.9999L13 15.9999L1 10.6666L27.6667 1.33325Z"
                      stroke="#229ED9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex w-full sm:w-auto flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">


                <div className="rounded-4xl shadow-details px-4 py-2 flex items-center">
                  <input className="outline-none max-w-[124px]  " placeholder="Enter amount"  onChange={onContributedAmount}/>
                  <Menu as="div" className="relative">
                    <div className="h-8">
                      <Menu.Button className="flex md:inline-flex justify-between items-center  space-x-2 sm:space-x-4 w-full border-Light-Slate-Gray/90 text-Light-Slate-Gray ">
                        <img src={`/assets/icons/${selectedCrypto}.svg`} alt={selectedCrypto} />
                        <div className="bg-Chinese-Blue rounded-lg h-7 w-7 flex items-center justify-center">
                          <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.8382 8.11719H5.16159C4.6614 8.11719 4.3821 8.64531 4.69187 9.00586L13.0301 18.6746C13.2688 18.9514 13.7284 18.9514 13.9696 18.6746L22.3079 9.00586C22.6176 8.64531 22.3384 8.11719 21.8382 8.11719Z" fill="white" />
                          </svg>
                        </div>
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className={`absolute w-full overflow-hidden mt-1 origin-top-right shadow-details bg-Pure-White bottom-14`}>
                        <div className="font-medium text-sm text-Light-Slate-Gray">
                          {
                            (chain.id === 97 ? cryptosBNB : (chain.id === 5 ? cryptosETH : (chain.id === 420 ? cryptosOpti : cryptosArbi))).map((crypto,index) => crypto.name !== selectedCrypto && <Menu.Item key={crypto.name}
                              onClick={() => {
                                setSelectedCrypto(crypto.name);
                                setSelectedCryptoAddress(crypto.address);
                              }}
                              as="div"
                              className=" cursor-pointer hover:bg-Light-Slate-Gray/5 py-1 flex items-center justify-between space-x-4 border-l-4 border-Pure-White duration-300 hover:border-Chinese-Blue"
                            >
                              <img src={`/assets/icons/${crypto.name}.svg`} alt={crypto.name} />
                            </Menu.Item>
                            )
                          }
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <button
                  onClick={() => {
                    setShowDetailsModal(true);
                  }}
                  className="bg-Chinese-Blue w-full sm:w-auto text-Pure-White rounded-4xl py-1 px-2.5 font-medium text-lg"
                >
                  Contribute
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {address === projectStarter}
          <Link
           
            to={(address === projectStarter) ? `/buidls/${projectContractAddress}/widthdraw-request` : `/buidls/${projectContractAddress}/widthdraw`} 
            className="text-Nickle text-center flex items-center space-x-2"
          >
            <span>{address === projectStarter ? "No withdrawal request for this campaign" : "Withdrawal request for this campaign"}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM7 8H6V6H9V11H10V13H7V8ZM9 5V3H7V5H9Z"
                fill="#B70505"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BuidlDetails;
