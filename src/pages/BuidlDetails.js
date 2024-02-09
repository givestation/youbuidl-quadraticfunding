import { useState, Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { readContract, writeContract, waitForTransaction, watchContractEvent } from "@wagmi/core";
import { formatUnits } from 'viem';
import ProjectContractInterface from '../abi/Project.json';
import Modals from "../components/modals";
import CongratsModalWrapper from "../components/modals/CongratsModalWrapper";
import { useNetwork, useAccount } from 'wagmi';
import CrowdFundingContractInterface from '../abi/Crowdfunding.json';
import QFRoundsContractInterface from '../abi/QFRounds.json';
import Erc20Json from '../abi/ERC20.json';
import Loader from '../components/Loader';
import web3 from 'web3';
import { bscId, contractAddresses, contriTokens, defaultEthLink, qfRoundsAddresses } from "../utils/constant";
import { getProject } from "../utils";
import { useChainContext } from "../utils/Context";

const BuidlDetails = () => {
  const navigate = useNavigate();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const currentLocation = useLocation();
  const projectContractAddress = currentLocation.pathname?.slice(8, 50);
  const projectId = currentLocation.pathname?.slice(51, 52);
  // Details Modal State
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showloader, setshowloader] = useState(false)
  // Details Modal State
  const [showDescModal, setShowDescModal] = useState(false);
  // Loading modal
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  // Congrats Approved Modal State
  const [approvedCongratsModal, setApprovedCongratsModal] = useState(true);
  // Congrats Contributed Modal State
  const [contributedCongratsModal, setContributedCongratsModal] = useState(true);
  // change State
  const [restHours, setRestHours] = useState(0);
  const [restDays, setRestDays] = useState(0);

  const {
    referral,
  } = useChainContext();

  // set token
  const [contributedAmount, setContributedAmount] = useState(0);
  const [contributedNumAmount, setContributedNumAmount] = useState(0);
  const [rewardCalculat, setRewardCalculat] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("USDC");
  const [projectDetails, setProjectDetails] = useState(undefined)
  const [selectedCryptoAddress, setSelectedCryptoAddress] = useState(contriTokens[chain?.id][1]?.address);

  const [crowdFundingConf, setCrowdFundingConf] = useState({});
  const [qfRoundsConf, setQFRoundsConf] = useState({});
  const [erc20Conf, setERC20Conf] = useState(null)

  const [isContributing, setIsContributing] = useState(false);
  const [contributeSucc, setContributeSucc] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [approveSucc, setApproveSucc] = useState(false);

  //===========project Contract config==============
  const projectContractConfig = {
    address: projectContractAddress,
    abi: ProjectContractInterface,
  };

  const { data: realContributors } = useContractRead({
    ...projectContractConfig,
    functionName: 'contributiors',
    args: [
      address
    ]
  });

  //=============withdraw request check=======
  const { data: wrChecking } = useContractRead({
    ...projectContractConfig,
    functionName: 'showDetailOfWR',
    args: [
      projectId
    ]
  });

  //==========main functions==============

  const onContributedAmount = (e) => {
    setContributedAmount(
      web3.utils.toBigInt(web3.utils.toWei(e.target.value, (chain?.id === bscId ? 'ether' : 'mwei')))
    );
    setContributedNumAmount(e.target.value);

    if (e.target.value >= 3 && e.target.value <= 5) {
      setRewardCalculat(0.002)
    }

    if (e.target.value > 5 && e.target.value <= 10) {
      setRewardCalculat(0.003)
    }
    if (e.target.value > 10 && e.target.value <= 50) {
      setRewardCalculat(0.005)
    }
    if (e.target.value > 50) {
      setRewardCalculat(0.08)
    }
  };

  const contributeSmart = async () => {
    setIsContributing(true)
    try {
      let hash;
      if (projectDetails?.isOnQF) {
        hash = (await writeContract({
          mode: "recklesslyUnprepared",
          ...qfRoundsConf,
          functionName: "qfContribute",
          args: [projectContractAddress, referral != "" ? window.atob(referral) : address, selectedCryptoAddress, contributedAmount],
        })).hash;
      } else {
        hash = (await writeContract({
          mode: "recklesslyUnprepared",
          ...crowdFundingConf,
          functionName: "contribute",
          args: [projectContractAddress, referral != "" ? window.atob(referral) : address, selectedCryptoAddress, contributedAmount],
        })).hash;
      }

      const data = await waitForTransaction({ hash });
      if (data.status == "success")
        setContributeSucc(true)

    } catch (e) {
      setContributeSucc(false)
      console.log(e);
    }
    setIsContributing(false)
  };

  const calculatingDate = () => {
    const timestampMillis = Date.now();

    const daysLeft = Math.floor((Number(projectDetails?.projectDeadline) - Number(timestampMillis / 1000)) / (24 * 60 * 60));
    const hoursLeft = Math.floor(((Number(projectDetails?.projectDeadline) - Number(timestampMillis / 1000)) % (24 * 60 * 60)) / 3600);
    console.log(daysLeft, hoursLeft, "data of total")
    // let hours = dataObj.getUTCHours();
    setRestDays(daysLeft);
    setRestHours(hoursLeft)
    console.log(daysLeft.toString(), "letft days")
  };

  const approveToken = async () => {
    setIsApproving(true)
    try {
      const { hash } = await writeContract({
        mode: "recklesslyUnprepared",
        ...erc20Conf,
        functionName: "approve",
        args: [projectContractAddress, contributedAmount],
      });

      const data = await waitForTransaction({ hash });
      if (data.status == "success") {
        await getApporved()
        setApproveSucc(true);
      }

    } catch (e) {
      console.log(e, "error in Approve");
    }
    setIsApproving(false)
  }

  const getApporved = async () => {
    const allowance = await readContract({
      ...erc20Conf,
      functionName: "allowance",
      args: [address, projectContractAddress],
    });

    const amount = formatUnits(allowance, chain?.id === bscId ? 18 : 6)

    if (+amount >= contributedNumAmount) setIsApproved(true)
    else setIsApproved(false)
  }

  const initProjectDetails = async () => {
    const data = await getProject(projectContractAddress, chain?.id)
    if (data)
      setProjectDetails(data);
    else
      navigate(-1)
  }

  useEffect(() => {
    if (chain != undefined)
      initProjectDetails()
    else
      navigate(-1)
  }, [chain])

  useEffect(() => {
    if (projectDetails)
      calculatingDate();
  }, [projectDetails]);

  useEffect(() => {
    if (chain) {
      setCrowdFundingConf({
        address: contractAddresses[chain?.id],
        abi: CrowdFundingContractInterface,
      });
      setQFRoundsConf({
        address: qfRoundsAddresses[chain?.id],
        abi: QFRoundsContractInterface,
      });
    }
  }, [chain])

  useEffect(() => {
    setERC20Conf({
      address: selectedCryptoAddress,
      abi: Erc20Json,
    })
  }, [selectedCryptoAddress])

  useEffect(() => {
    if (chain && erc20Conf) {
      getApporved()
    }
  }, [contributedAmount, selectedCryptoAddress])

  return (
    <>
      {
        showloader && (
          <div style={{ background: "#000000cc", position: "fixed", display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", zIndex: "999999999999", left: "0", top: "0" }}>
            <div className="flex justify-center" style={{ width: "100px" }}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><radialGradient id='a12' cx='.66' fx='.66' cy='.3125' fy='.3125' gradientTransform='scale(1.5)'><stop offset='0' stop-color='#00A4FF'></stop><stop offset='.3' stop-color='#00A4FF' stop-opacity='.9'></stop><stop offset='.6' stop-color='#00A4FF' stop-opacity='.6'></stop><stop offset='.8' stop-color='#00A4FF' stop-opacity='.3'></stop><stop offset='1' stop-color='#00A4FF' stop-opacity='0'></stop></radialGradient><circle transform-origin='center' fill='none' stroke='url(#a12)' stroke-width='22' stroke-linecap='round' stroke-dasharray='200 1000' stroke-dashoffset='0' cx='100' cy='100' r='70'><animateTransform type='rotate' attributeName='transform' calcMode='spline' dur='2' values='360;0' keyTimes='0;1' keySplines='0 0 1 1' repeatCount='indefinite'></animateTransform></circle><circle transform-origin='center' fill='none' opacity='.2' stroke='#00A4FF' stroke-width='22' stroke-linecap='round' cx='100' cy='100' r='70'></circle></svg>
            </div>
          </div>
        )
      }

      <Modals showModal={showDetailsModal} setShowModal={setShowDetailsModal}>
        <div className="max-w-sm rounded-2xl bg-Pure-White">
          <img
            className="h-52 object-cover rounded-xl"
            src={projectDetails ? projectDetails.projectCoverUrl : "#"}
            alt=""
          />
          <div className="px-3 pt-3 pb-1.5 space-y-4">
            <div className="space-y-1">
              <h1 className="flex items-center space-x-2 text-Rich-Black font-normal text-sm">
                <span>Grant title - {projectDetails?.title}</span>
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
                Creator - {projectDetails?.creator?.slice(0, 10) + "..." + projectDetails?.creator?.slice(38, 42)}
              </h3>
              <div className="flex items-center text-xs w-fit rounded-xl p-1 gap-0.5" style={{ background: "#CDEDFF" }}>
                <div><img src="/assets/images/popularity 1.png" alt="" /></div>
                <div style={{ color: "#3EA7E1" }}>Popular</div>
              </div>
            </div>
            <div className="text-Eire-Black space-y-0.5 w-4/5 m-auto">
              <div className="flex justify-between ">
                <h2 className="font-medium text-base flex-1 ">
                  Contributing
                </h2>
                <h2 className="font-medium text-base flex-1 text-right">
                  {contributedNumAmount} {selectedCrypto}
                </h2>
              </div>
              {projectDetails?.isOnQF && (
                <div className="flex justify-center ">
                  <h2 className="font-medium text-base flex-1 ">
                    QF Matching
                  </h2>
                  <h2 className="font-medium text-base flex-1 text-right" style={{ color: "#12D69B" }}>
                    ${projectDetails ? (chain?.id === bscId ? Math.round(projectDetails.qfRaised / 10 ** 18) : Math.round(projectDetails.qfRaised / 10 ** 6)) : 0}
                  </h2>
                </div>
              )}
              <div className="flex justify-center ">
                <h2 className="font-medium text-base flex-1 ">
                  {chain?.nativeCurrency?.symbol}  Reward
                </h2>
                <h2 className="font-medium text-base flex-1 text-right" >
                  {rewardCalculat} {chain?.nativeCurrency?.symbol}
                </h2>
              </div>
              <div className="flex justify-center ">
                <h2 className="font-medium text-base flex-1 ">
                  GivePoints Reward
                </h2>
                <h2 className="font-medium text-base flex-1 text-right">
                  {contributedNumAmount} {selectedCrypto}
                </h2>
              </div>
              <div className="flex justify-center !mt-5">
                <h2 className="font-medium text-base flex-1 text-center ">
                  Total
                </h2>
                <h2 className="font-medium text-base flex-1 text-right">
                  {contributedNumAmount} {selectedCrypto}
                </h2>
              </div>

            </div>
            <div className="flex items-center space-x-4 font-semibold text-base">
              <button
                style={{ border: "1px solid #D0D5DD", }}
                onClick={() => setShowDetailsModal(false)}
                className="border-2 border-Chinese-Blue flex-1 py-2 rounded-4xl"
              >
                Cancel
              </button>
              {isApproved ? (
                <button
                  disabled={contributedAmount === 0 ? true : false}
                  onClick={() => {
                    contributeSmart();
                  }}
                  style={{ background: "#3EA7E1", borderColor: "#3EA7E1" }}
                  className="bg-Chinese-Blue flex-1 border border-Chinese-Blue text-Pure-White py-2 rounded-4xl"
                >
                  Contribute
                </button>
              ) : (
                <button
                  disabled={contributedAmount === 0n ? true : false}
                  onClick={() => {
                    approveToken();
                  }}
                  className="bg-Chinese-Blue flex-1 border border-Chinese-Blue text-Pure-White py-2 rounded-4xl"
                >
                  Approve
                </button>
              )}
            </div>
            <hr className="h-1 mx-auto w-4/12 rounded-full bg-Pure-Black" />
          </div>
        </div>
      </Modals>

      <Modals showModal={showDescModal} setShowModal={setShowDescModal}>

        <div className=" max-w-md  rounded-2xl bg-Pure-White">
          <div className="px-3 pt-3 pb-1.5 space-y-4">

            <h1 className="flex items-center  text-Rich-Black font-normal text-lg font-semibold	">
              <span> {projectDetails?.title}</span>:
            </h1>
            <div className="overflow-y-scroll overflow-y-hidden scroll-smooth overflow-hidden w-[400px] h-[200px] mx-auto space-y-4">
              {projectDetails?.desc}
            </div>
            <div className="flex items-center space-x-4 font-semibold text-base">
              <button
                onClick={() => setShowDescModal(false)}
                className="text-Chinese-Blue border-2 border-Chinese-Blue flex-1 py-2 rounded-4xl"
              >
                Cancel
              </button>

            </div>
            <hr className="h-1 mx-auto w-4/12 rounded-full bg-Pure-Black" />
          </div>
        </div>
      </Modals>

      {/* Approved Modal loading and congratulation */}
      <Loader showModal={isApproving} setShowModal={setShowLoadingModal} />
      {approveSucc &&
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
                You have successfully approved
                <span className="font-semibold"> {contributedNumAmount === '' ? 0 : contributedNumAmount} {selectedCrypto}</span> from your wallet!
              </h4>
            </div>
            <button
              onClick={() => { setApprovedCongratsModal(false); setApproveSucc(false); }}
              className="bg-Pure-White text-Pure-Black text-sm font-medium rounded-xl py-2 px-6"
            >
              Close
            </button>
          </CongratsModalWrapper>
        </Modals>
      }

      {/* Contributed Modal loading and congratulation*/}
      {isContributing && <Loader showModal={true} setShowModal={setShowLoadingModal} />}
      {contributeSucc &&
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
                You have successfully contributed
                <span className="font-semibold"> {contributedNumAmount} {selectedCrypto}</span> to this project.
                <br />
                Kindly check the reward page to claim your
                <span className="font-semibold"> {rewardCalculat} {chain?.nativeCurrency?.symbol}</span>
              </h4>
            </div>
            <button
              onClick={() => { setContributedCongratsModal(false); setContributeSucc(false) }}
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
              src={projectDetails ? projectDetails.projectCoverUrl : "#"}
              alt=""
            />
            <div className="absolute bottom-4 px-4 sm:px-10">
              <div className="flex items-center space-x-1">
                <h1 className="text-Pure-White font-semibold text-xl">
                  {projectDetails?.title}
                </h1>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {projectDetails?.isOnQF && <path
                    d="M15.2717 7.60764L14.3083 6.48848C14.1242 6.27598 13.9754 5.87931 13.9754 5.59598V4.39181C13.9754 3.64098 13.3592 3.02473 12.6083 3.02473H11.4042C11.1279 3.02473 10.7242 2.87598 10.5117 2.69181L9.3925 1.72848C8.90375 1.31056 8.10334 1.31056 7.6075 1.72848L6.49542 2.69889C6.28292 2.87598 5.87917 3.02473 5.60292 3.02473H4.3775C3.62667 3.02473 3.01042 3.64098 3.01042 4.39181V5.60306C3.01042 5.87931 2.86167 6.27598 2.68459 6.48848L1.72834 7.61473C1.3175 8.10348 1.3175 8.89681 1.72834 9.38556L2.68459 10.5118C2.86167 10.7243 3.01042 11.121 3.01042 11.3972V12.6085C3.01042 13.3593 3.62667 13.9756 4.3775 13.9756H5.60292C5.87917 13.9756 6.28292 14.1243 6.49542 14.3085L7.61459 15.2718C8.10334 15.6897 8.90375 15.6897 9.39959 15.2718L10.5188 14.3085C10.7313 14.1243 11.1279 13.9756 11.4113 13.9756H12.6154C13.3663 13.9756 13.9825 13.3593 13.9825 12.6085V11.4043C13.9825 11.1281 14.1313 10.7243 14.3154 10.5118L15.2788 9.39264C15.6896 8.90389 15.6896 8.09639 15.2717 7.60764ZM11.4467 7.16139L8.02542 10.5826C7.92625 10.6818 7.79167 10.7385 7.65 10.7385C7.50834 10.7385 7.37375 10.6818 7.27459 10.5826L5.56042 8.86848C5.355 8.66306 5.355 8.32306 5.56042 8.11764C5.76584 7.91223 6.10584 7.91223 6.31125 8.11764L7.65 9.45639L10.6958 6.41056C10.9013 6.20514 11.2413 6.20514 11.4467 6.41056C11.6521 6.61598 11.6521 6.95598 11.4467 7.16139Z"
                    fill="#74D12A"
                  />}
                </svg>
              </div>
              <div className="flex items-center space-x-1">
                <img src='/assets/icons/identicon.svg' width={25} height={25} alt='avatar' className='rounded-2xl	' />
                <h3 className="text-Bright-Gray font-medium text-xs">
                  {projectDetails?.creator.slice(0, 10) + "..." + projectDetails?.creator.slice(38, 42)}
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
                style={{ background: "#3EA7E1" }}
                target="_blank"
                href={defaultEthLink[chain?.id]?.concat("", projectContractAddress)}
                className="bg-Chinese-Blue text-Pure-White rounded-md text-xs py-0.5 px-2"
              >
                view on explorer
              </a>
            </div>
          </div>
          <div className="px-6 py-4 space-y-4">

            <div className='space-y-1'>

              <div className='flex items-center justify-between'>
                <h3 className=' font-normal text-xs flex items-center gap-0.5'>
                  <div style={{ color: "#818283", background: "#DADFE2" }} className="bg-gray-400 rounded p-0.5">Currently raising</div>
                  <div className='text-Vampire-Black mt-1'>

                  </div>
                </h3>
                {projectDetails?.isOnQF && (
                  <h3 className=' font-normal text-xs'>
                    <div style={{ color: "#818283", background: "#DADFE2" }} className="bg-gray-400 rounded p-0.5">QF Matching</div>
                  </h3>
                )}
              </div>
            </div>
            <div className='space-y-1'>
              <div className='flex items-center justify-between'>
                <h3 className='text-Philipine-Gray font-bold text-xl'>
                  <span className='text-Vampire-Black'>
                    ${formatUnits(projectDetails ? projectDetails.currentAmount : 0, (chain?.id === bscId ? 18 : 6))}
                  </span>
                </h3>
                {projectDetails?.isOnQF && (
                  <h3 className='text-emerald-400 font-bold text-xl '>
                    <span className='text-emerald-400' style={{ color: "#12D69B" }}>
                      ${projectDetails ? (chain?.id === bscId ? Math.round(projectDetails.qfRaised / 10 ** 18) : Math.round(projectDetails.qfRaised / 10 ** 6)) : 0}
                    </span>
                  </h3>
                )}
              </div>
            </div>
            {!projectDetails?.isOnQF && (
              <div className='flex items-center justify-between'>
                <div style={{ color: "#818283", background: "#DADFE2" }} className="bg-gray-400 rounded p-0.5 text-xs" >Target   ${formatUnits(projectDetails ? projectDetails?.goalAmount : 0, (chain?.id === bscId ? 18 : 6))}</div>
              </div>
            )}
            <div className="flex items-center justify-between !mt-10">
              <div>
                <h1 className="text-Vampire-Black font-semibold text-xl">
                  Description
                </h1>
              </div>
              <div className="flex items-center justify-between gap-10">
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
                  <h3 className="text-Vampire-Black font-normal text-lg">{Number(projectDetails?.noOfContributors ?? 0)}</h3>
                </div>
                {!projectDetails?.isOnQF && (
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
                      {restDays > 1 ? restDays + " days left" : restHours + " hours left"}
                    </h3>
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="text-Nickle font-normal text-sm sm:text-base">
                {projectDetails?.desc.slice(0, 500)}...
                <br />
                <span className="text-Vampire-Black font-semibold cursor-pointer text-base ">
                  <button
                    className="underline"
                    onClick={() => {
                      setShowDescModal(true);
                    }}>Read more</button>
                </span>
              </p>
            </div>

            <div className=" !mt-20 flex w-full items-center justify-between flex-col space-y-4 sm:space-y-0 sm:flex-row">
              <div className="flex items-center space-x-2">
                <a className="rounded-full bg-Ghost-White shadow-3xl p-2 cursor-pointer" style={{ filter: "drop-shadow(0px 8px 24px rgba(24, 39, 75, 0.08)) drop-shadow(0px 6px 12px rgba(24, 39, 75, 0.12))" }} href={projectDetails?.githubUrl}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" fill="white" />
                    <path d="M10.1388 13C9.55115 13 9.08621 13.5059 9.19679 14.0831C9.52887 15.8163 10.2677 17.4049 11.3107 18.7462C11.6636 19.2 12.3362 19.2 12.6891 18.7462C13.7322 17.4049 14.471 15.8164 14.8031 14.0831C14.9137 13.5059 14.4487 13 13.861 13H10.1388Z" fill="#3EA7E1" />
                    <path d="M17.8888 13C17.366 13 16.9356 13.4037 16.8589 13.9209C16.5113 16.267 15.5367 18.409 14.112 20.1704C13.804 20.5512 13.848 21.1177 14.2353 21.4176C14.4402 21.5762 14.708 21.6325 14.9556 21.556C18.3846 20.4967 21.0255 17.6424 21.781 14.0908C21.9041 13.5124 21.4377 13 20.8464 13H17.8888Z" fill="#3EA7E1" />
                    <path d="M3.15352 13C2.56218 13 2.09582 13.5124 2.21886 14.0908C3.00142 17.7696 5.80689 20.7002 9.41564 21.6629C9.66029 21.7281 9.91894 21.6492 10.0955 21.4678C10.3689 21.1868 10.3695 20.7413 10.1148 20.4433C8.56666 18.6322 7.50675 16.3896 7.14096 13.9209C7.06432 13.4037 6.63392 13 6.11108 13H3.15352Z" fill="#3EA7E1" />
                    <path d="M21.7811 9.90924C21.9041 10.4876 21.4377 11 20.8464 11H17.8889C17.366 11 16.9356 10.5963 16.859 10.0791C16.5113 7.73297 15.5368 5.59097 14.112 3.82959C13.804 3.44877 13.8481 2.88228 14.2354 2.58243C14.4403 2.42382 14.708 2.36751 14.9556 2.44399C18.3846 3.50334 21.0256 6.35759 21.7811 9.90924Z" fill="#3EA7E1" />
                    <path d="M14.8031 9.91699C14.9137 10.4942 14.4488 11.0001 13.8611 11.0001H10.1389C9.55121 11.0001 9.08627 10.4942 9.19686 9.91699C9.52893 8.18377 10.2677 6.5952 11.3108 5.25388C11.6637 4.80011 12.3363 4.80011 12.6892 5.25389C13.7323 6.5952 14.4711 8.18377 14.8031 9.91699Z" fill="#3EA7E1" />
                    <path d="M9.04277 2.44442C9.29111 2.36766 9.55976 2.42446 9.76494 2.58405C10.1512 2.88448 10.1947 3.45023 9.88695 3.83073C8.46272 5.59188 7.48852 7.73344 7.14096 10.079C7.06432 10.5962 6.63392 11 6.11108 11H3.15352C2.56218 11 2.09581 10.4876 2.21885 9.90919C2.97422 6.35808 5.61452 3.50417 9.04277 2.44442Z" fill="#3EA7E1" />
                  </svg>
                </a>
                <a className="rounded-full bg-Ghost-White shadow-3xl p-2 cursor-pointer" style={{ filter: "drop-shadow(0px 8px 24px rgba(24, 39, 75, 0.08)) drop-shadow(0px 6px 12px rgba(24, 39, 75, 0.12))" }} href={projectDetails?.socialUrl}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.75C5.64625 0.75 0.5 5.89625 0.5 12.25C0.5 17.3387 3.79187 21.6369 8.36312 23.1606C8.93812 23.2612 9.15375 22.9162 9.15375 22.6144C9.15375 22.3412 9.13938 21.4356 9.13938 20.4725C6.25 21.0044 5.5025 19.7681 5.2725 19.1212C5.14313 18.7906 4.5825 17.77 4.09375 17.4969C3.69125 17.2812 3.11625 16.7494 4.07938 16.735C4.985 16.7206 5.63188 17.5687 5.8475 17.9137C6.8825 19.6531 8.53563 19.1644 9.19688 18.8625C9.2975 18.115 9.59938 17.6119 9.93 17.3244C7.37125 17.0369 4.6975 16.045 4.6975 11.6462C4.6975 10.3956 5.14312 9.36062 5.87625 8.55562C5.76125 8.26812 5.35875 7.08937 5.99125 5.50812C5.99125 5.50812 6.95438 5.20625 9.15375 6.68687C10.0738 6.42812 11.0513 6.29875 12.0288 6.29875C13.0063 6.29875 13.9838 6.42812 14.9038 6.68687C17.1031 5.19187 18.0662 5.50812 18.0662 5.50812C18.6987 7.08937 18.2962 8.26812 18.1812 8.55562C18.9144 9.36062 19.36 10.3812 19.36 11.6462C19.36 16.0594 16.6719 17.0369 14.1131 17.3244C14.53 17.6837 14.8894 18.3737 14.8894 19.4519C14.8894 20.99 14.875 22.2262 14.875 22.6144C14.875 22.9162 15.0906 23.2756 15.6656 23.1606C20.2081 21.6369 23.5 17.3244 23.5 12.25C23.5 5.89625 18.3538 0.75 12 0.75Z" fill="#3EA7E1" />
                  </svg>
                </a>
                <a className="rounded-full bg-Ghost-White shadow-3xl p-2 cursor-pointer" style={{ filter: "drop-shadow(0px 8px 24px rgba(24, 39, 75, 0.08)) drop-shadow(0px 6px 12px rgba(24, 39, 75, 0.12))" }} href={projectDetails?.socialUrl}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_534_1014)">
                      <path d="M20.317 4.15557C18.7873 3.45369 17.147 2.93658 15.4319 2.6404C15.4007 2.63469 15.3695 2.64897 15.3534 2.67754C15.1424 3.05276 14.9087 3.54226 14.7451 3.927C12.9004 3.65083 11.0652 3.65083 9.25832 3.927C9.09465 3.5337 8.85248 3.05276 8.64057 2.67754C8.62448 2.64992 8.59328 2.63564 8.56205 2.6404C6.84791 2.93563 5.20756 3.45275 3.67693 4.15557C3.66368 4.16129 3.65233 4.17082 3.64479 4.18319C0.533392 8.83155 -0.31895 13.3657 0.0991801 17.8436C0.101072 17.8655 0.11337 17.8864 0.130398 17.8997C2.18321 19.4073 4.17171 20.3225 6.12328 20.9291C6.15451 20.9386 6.18761 20.9272 6.20748 20.9015C6.66913 20.2711 7.08064 19.6063 7.43348 18.9073C7.4543 18.8664 7.43442 18.8178 7.39186 18.8016C6.73913 18.554 6.1176 18.2521 5.51973 17.9093C5.47244 17.8816 5.46865 17.814 5.51216 17.7816C5.63797 17.6873 5.76382 17.5893 5.88396 17.4902C5.90569 17.4721 5.93598 17.4683 5.96153 17.4797C9.88928 19.273 14.1415 19.273 18.023 17.4797C18.0485 17.4674 18.0788 17.4712 18.1015 17.4893C18.2216 17.5883 18.3475 17.6873 18.4742 17.7816C18.5177 17.814 18.5149 17.8816 18.4676 17.9093C17.8697 18.2588 17.2482 18.554 16.5945 18.8006C16.552 18.8168 16.533 18.8664 16.5538 18.9073C16.9143 19.6054 17.3258 20.2701 17.7789 20.9005C17.7978 20.9272 17.8319 20.9386 17.8631 20.9291C19.8241 20.3225 21.8126 19.4073 23.8654 17.8997C23.8834 17.8864 23.8948 17.8664 23.8967 17.8445C24.3971 12.6676 23.0585 8.17064 20.3482 4.18414C20.3416 4.17082 20.3303 4.16129 20.317 4.15557ZM8.02002 15.117C6.8375 15.117 5.86313 14.0313 5.86313 12.6981C5.86313 11.3648 6.8186 10.2791 8.02002 10.2791C9.23087 10.2791 10.1958 11.3743 10.1769 12.6981C10.1769 14.0313 9.22141 15.117 8.02002 15.117ZM15.9947 15.117C14.8123 15.117 13.8379 14.0313 13.8379 12.6981C13.8379 11.3648 14.7933 10.2791 15.9947 10.2791C17.2056 10.2791 18.1705 11.3743 18.1516 12.6981C18.1516 14.0313 17.2056 15.117 15.9947 15.117Z" fill="#3EA7E1" />
                    </g>
                    <defs>
                      <clipPath id="clip0_534_1014">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a className="rounded-full bg-Ghost-White shadow-3xl p-2 cursor-pointer" style={{ filter: "drop-shadow(0px 8px 24px rgba(24, 39, 75, 0.08)) drop-shadow(0px 6px 12px rgba(24, 39, 75, 0.12))" }} href={projectDetails?.socialUrl}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z" fill="#3EA7E1" />
                  </svg>
                </a>
              </div>
              <div className="flex  !w-full justify-center sm:w-auto flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">


                <div className="  w-4/6 justify-between rounded-2xl border border-slate-800  flex items-center" style={{ borderColor: "#8080804d", borderRadius: "18.5px" }}>

                  <div className="  px-4 py-2 flex items-center" >
                    <input className="outline-none max-w-[124px]  " placeholder="Enter amount" type='number' onChange={onContributedAmount} />
                    {/* <img src={`/assets/icons/${selectedCrypto}.svg`} alt={selectedCrypto} /> */}
                  </div>

                  <Menu as="div" className="relative">
                    <div >
                      <Menu.Button className="flex md:inline-flex justify-between items-center  space-x-2 sm:space-x-4 w-full  text-Light-Slate-Gray ">
                        <div className="gap-2 rounded-2xl border border-slate-800  px-4 py-2 flex items-center" style={{ background: "black", color: "white", borderRadius: "18.5px" }}>

                          <div>Select Token</div>

                          <div className="bg-Chinese-Blue rounded-lg h-7 w-7 flex items-center justify-center" style={{ background: "transparent" }}>

                            <img src={`/assets/icons/${selectedCrypto}.svg`} alt={selectedCrypto} />
                          </div>

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
                            (contriTokens[chain?.id]).map((crypto, index) => crypto.name !== selectedCrypto && <Menu.Item key={crypto.name}
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
              </div>
              <button
                disabled={contributedAmount === 0 ? true : false}
                onClick={() => {
                  setshowloader(true);
                  setTimeout(() => {
                    setshowloader(false)
                    setShowDetailsModal(true);
                  }, 300);

                }}
                style={{ background: "#3EA7E1" }}
                className="bg-Chinese-Blue w-full sm:w-auto text-Pure-White rounded-4xl border   px-10 py-2 font-medium text-lg"
              >
                Contribute
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {address === projectDetails?.creator ?
            <Link
              to={wrChecking?.[0] === undefined || wrChecking?.[0] === '' ? `/buidls/${projectContractAddress}/${projectId}/withdraw-request` : `/buidls/${projectContractAddress}/${projectId}/withdraw`}
              className="text-Nickle text-center flex items-center space-x-2"
            >
              <span>{wrChecking?.[0] === undefined || wrChecking?.[0] === '' ? "No withdrawal request for this campaign" : "you created withdraw request"}</span>
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
            </Link> :
            <Link
              to={wrChecking?.[0] !== '' && realContributors !== 0n ? `/buidls/${projectContractAddress}/${projectId}/voteForWR` : `/buidls/${projectContractAddress}/${projectId}`}
              className="text-Nickle text-center flex items-center space-x-2"
            >
              <span>{wrChecking?.[0] !== '' && realContributors !== 0n ? "you can vote about Withdrawal request for this campaign" : (realContributors === 0n ? "Fund this project to be able to vote" : "Creator didn't request for withdraw")}</span>
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
          }

        </div>
      </div>
    </>
  );
};

export default BuidlDetails;
