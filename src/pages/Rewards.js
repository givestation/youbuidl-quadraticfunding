import { useState, useEffect } from "react";
import TotalBalance from "../components/TotalBalance";
import Modals from "../components/modals";
import CongratsModalWrapper from "../components/modals/CongratsModalWrapper";
import CryptoDropdown from "../components/CryptoDropdown";
import CrowdFundingContractInterface from '../abi/Crowdfunding.json';
import { readContract, writeContract, waitForTransaction, watchContractEvent } from "@wagmi/core";
import { formatEther, formatUnits } from 'viem';
import Loader from '../components/Loader';
import {
  useNetwork,
  useAccount,
} from 'wagmi';
import { bscId, contractAddresses } from "../utils/constant";
import { getContributionDetails, getContributors, getEllipsisTxt } from "../utils";

const Rewards = () => {
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount();
  const [contributors, setContributors] = useState([]);
  const [contriDetail, setContriDetail] = useState(null)

  const [isClaiming, setIsClaming] = useState(false);
  const [claimSucc, setClaimSucc] = useState(false);

  const referralURL = "https://" + (window.location.host ?? 'no-host') + "?r=" + window.btoa(address ?? '')
  const textURI = encodeURIComponent("Use my referral code to take part in the grant platform.");
  const urlURI = encodeURIComponent(referralURL);
  const tweetIntent = `https://twitter.com/intent/tweet?text=${textURI}&url=${urlURI}`;


  //===============crowdfunding Contract config===============
  let crowdFundingContractConfig = {};
  if (chain === undefined) {
    console.log("plz connect metamask")
  } else {
    crowdFundingContractConfig = {
      address: contractAddresses[chain?.id],
      abi: CrowdFundingContractInterface,
    };
  }

  const intContributors = async () => {
    const boardData = await getContributors(chain?.id)
    setContributors(boardData);
    const contriData = await getContributionDetails(address, chain?.id)
    setContriDetail(contriData);
  }

  const claimReward = async () => {
    setIsClaming(true);
    try {
      const { hash } = await writeContract({
        mode: "recklesslyUnprepared",
        ...crowdFundingContractConfig,
        functionName: "withdrawUserRewards",
        args: [false],
      });

      const data = await waitForTransaction({ hash });
      if (data.status == "success") {
        setClaimSucc(true);
      }
    } catch (e) {
      console.log(e, "error in claim reward");
    }
    setIsClaming(false);
  }

  useEffect(() => {
    if (chain) {
      intContributors()
    }

  }, [chain]);

  return (
    <>
      {contriDetail && (
        <div class='flex items-center justify-center space-x-4'>
          <div class='break-inside relative overflow-hidden flex flex-col justify-between space-y-2 text-sm rounded-xl max-w-[23rem] p-4 mb-4 bg-Chinese-Blue text-Pure-White h-[170px]'>
            <span class='uppercase text-xs'>BuidlPoints</span>
            <div class='flex flex-row items-center space-x-3'>
              <svg width='58' height='56' viewBox='0 0 52 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M32.6458 38.4379C33.9918 37.1198 33.2655 34.0922 31.0668 30.5948C31.8658 30.4707 32.6129 30.281 33.178 29.9905C35.2112 28.9466 36.584 27.044 37.6232 25.0759C38.7403 22.9647 39.49 20.644 40.9477 18.7215C41.1939 18.3966 41.44 18.1052 41.6853 17.831C44.8304 18.206 47.3412 18.8784 47.3412 18.8784L48.3006 16.4534C47.0896 16.0212 45.848 15.6791 44.586 15.4302C45.3591 14.9931 45.8635 14.8569 45.8635 14.8569L44.9543 12.4121C43.4966 13.025 42.3136 13.9293 41.323 15.0121C37.6206 14.806 33.8921 15.5397 30.9506 17.8086C28.7389 19.5155 27.2447 21.8819 25.839 24.2491C24.5935 23.0333 23.2671 21.9023 21.8688 20.8638C22.134 20.4302 22.4182 20.0405 22.7242 19.7397C24.5728 17.9293 27.0116 16.7716 28.6115 14.7C31.9742 10.35 29.5146 3.53103 26.7481 0C26.2524 0.475 25.4325 1.16724 24.8155 1.71379C27.7561 4.70948 29.8127 9.95431 27.5082 13.8733C26.2203 16.0638 23.8404 17.4379 22.1764 19.3198C21.8887 19.6466 21.6313 20.0603 21.3982 20.5172C17.0466 17.4129 13.053 16.1638 11.4704 17.7138C11.3133 17.8737 11.1838 18.0584 11.0874 18.2603L11.0813 18.2543L11.0388 18.3776C10.9799 18.5112 10.9261 18.65 10.8897 18.8017L0 50L31.774 38.95L31.7653 38.9414C32.1068 38.8319 32.4075 38.6707 32.6458 38.4379ZM6.32065 45.9759L3.66863 44.7465L5.45831 39.6172L13.6666 43.4207L6.32065 45.9759ZM21.0116 40.8664L7.24972 34.4879L9.0394 29.3595L19.3233 34.494C13.1847 30.5198 10.8291 24.2293 10.8291 24.2293L11.441 22.4767C12.5286 25.2138 14.9215 28.6224 18.2097 31.8397C21.5256 35.0862 25.0399 37.4379 27.8488 38.4888L21.0116 40.8664ZM26.2975 24.7112C27.7344 22.6621 29.2156 20.594 31.2748 19.1224C33.2352 17.7207 36.4176 17.4647 39.4345 17.6328C38.4153 19.4034 37.6622 21.3681 36.9861 23.2552C36.1689 25.5397 35.0734 27.9086 32.9847 29.3095C32.4214 29.6871 31.6318 29.9629 30.7886 30.1672C29.6298 28.4009 28.1097 26.5336 26.2975 24.7112Z' fill='white' />
              </svg>
              <span class='text-base font-medium'>You have received {formatUnits?.(contriDetail?.totalBuidlPointRewards, 18)} points for funding {contriDetail?.contributions.length} projects</span>
            </div>
            <div class='flex justify-between items-center'>
              <span>{contriDetail.claimableBuidlPointRewards / 10 ** 18}</span>
            </div>
          </div>
          <div className='break-inside relative overflow-hidden flex flex-col justify-between space-y-2 text-sm rounded-xl max-w-[23rem] p-4 mb-4 bg-Chinese-Blue text-Pure-White h-[170px]'>
            <span class='uppercase text-xs'>Contribution Rewards</span>
            <div class='flex flex-row items-center space-x-3'>
              <svg width='58' height='56' viewBox='0 0 52 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M32.6458 38.4379C33.9918 37.1198 33.2655 34.0922 31.0668 30.5948C31.8658 30.4707 32.6129 30.281 33.178 29.9905C35.2112 28.9466 36.584 27.044 37.6232 25.0759C38.7403 22.9647 39.49 20.644 40.9477 18.7215C41.1939 18.3966 41.44 18.1052 41.6853 17.831C44.8304 18.206 47.3412 18.8784 47.3412 18.8784L48.3006 16.4534C47.0896 16.0212 45.848 15.6791 44.586 15.4302C45.3591 14.9931 45.8635 14.8569 45.8635 14.8569L44.9543 12.4121C43.4966 13.025 42.3136 13.9293 41.323 15.0121C37.6206 14.806 33.8921 15.5397 30.9506 17.8086C28.7389 19.5155 27.2447 21.8819 25.839 24.2491C24.5935 23.0333 23.2671 21.9023 21.8688 20.8638C22.134 20.4302 22.4182 20.0405 22.7242 19.7397C24.5728 17.9293 27.0116 16.7716 28.6115 14.7C31.9742 10.35 29.5146 3.53103 26.7481 0C26.2524 0.475 25.4325 1.16724 24.8155 1.71379C27.7561 4.70948 29.8127 9.95431 27.5082 13.8733C26.2203 16.0638 23.8404 17.4379 22.1764 19.3198C21.8887 19.6466 21.6313 20.0603 21.3982 20.5172C17.0466 17.4129 13.053 16.1638 11.4704 17.7138C11.3133 17.8737 11.1838 18.0584 11.0874 18.2603L11.0813 18.2543L11.0388 18.3776C10.9799 18.5112 10.9261 18.65 10.8897 18.8017L0 50L31.774 38.95L31.7653 38.9414C32.1068 38.8319 32.4075 38.6707 32.6458 38.4379ZM6.32065 45.9759L3.66863 44.7465L5.45831 39.6172L13.6666 43.4207L6.32065 45.9759ZM21.0116 40.8664L7.24972 34.4879L9.0394 29.3595L19.3233 34.494C13.1847 30.5198 10.8291 24.2293 10.8291 24.2293L11.441 22.4767C12.5286 25.2138 14.9215 28.6224 18.2097 31.8397C21.5256 35.0862 25.0399 37.4379 27.8488 38.4888L21.0116 40.8664ZM26.2975 24.7112C27.7344 22.6621 29.2156 20.594 31.2748 19.1224C33.2352 17.7207 36.4176 17.4647 39.4345 17.6328C38.4153 19.4034 37.6622 21.3681 36.9861 23.2552C36.1689 25.5397 35.0734 27.9086 32.9847 29.3095C32.4214 29.6871 31.6318 29.9629 30.7886 30.1672C29.6298 28.4009 28.1097 26.5336 26.2975 24.7112Z' fill='white' />
              </svg>
              <span class='text-base font-medium'>You have received {formatUnits?.(contriDetail?.totalUSDTRewards, (chain?.id == bscId ? 18 : 6))} USDT for funding {contriDetail?.contributions.length} projects</span>
            </div>
            <div class='flex justify-between items-center'>
              <span>{formatUnits?.(contriDetail?.claimableUSDTRewards, (chain?.id == bscId ? 18 : 6))}</span>
              <button className='flex items-center justify-center text-xs rounded-full px-4 py-2 space-x-1' onClick={claimReward}>
                Claim
              </button>
            </div>
          </div>
          <div class='break-inside relative overflow-hidden flex flex-col justify-between space-y-2 text-sm rounded-xl max-w-[23rem] p-4 mb-4 bg-Chinese-Blue text-Pure-White h-[170px]'>
            <span class='uppercase text-xs'>Referrals</span>
            <div class='flex flex-row items-center space-x-3'>
              <svg width='58' height='56' viewBox='0 0 52 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M32.6458 38.4379C33.9918 37.1198 33.2655 34.0922 31.0668 30.5948C31.8658 30.4707 32.6129 30.281 33.178 29.9905C35.2112 28.9466 36.584 27.044 37.6232 25.0759C38.7403 22.9647 39.49 20.644 40.9477 18.7215C41.1939 18.3966 41.44 18.1052 41.6853 17.831C44.8304 18.206 47.3412 18.8784 47.3412 18.8784L48.3006 16.4534C47.0896 16.0212 45.848 15.6791 44.586 15.4302C45.3591 14.9931 45.8635 14.8569 45.8635 14.8569L44.9543 12.4121C43.4966 13.025 42.3136 13.9293 41.323 15.0121C37.6206 14.806 33.8921 15.5397 30.9506 17.8086C28.7389 19.5155 27.2447 21.8819 25.839 24.2491C24.5935 23.0333 23.2671 21.9023 21.8688 20.8638C22.134 20.4302 22.4182 20.0405 22.7242 19.7397C24.5728 17.9293 27.0116 16.7716 28.6115 14.7C31.9742 10.35 29.5146 3.53103 26.7481 0C26.2524 0.475 25.4325 1.16724 24.8155 1.71379C27.7561 4.70948 29.8127 9.95431 27.5082 13.8733C26.2203 16.0638 23.8404 17.4379 22.1764 19.3198C21.8887 19.6466 21.6313 20.0603 21.3982 20.5172C17.0466 17.4129 13.053 16.1638 11.4704 17.7138C11.3133 17.8737 11.1838 18.0584 11.0874 18.2603L11.0813 18.2543L11.0388 18.3776C10.9799 18.5112 10.9261 18.65 10.8897 18.8017L0 50L31.774 38.95L31.7653 38.9414C32.1068 38.8319 32.4075 38.6707 32.6458 38.4379ZM6.32065 45.9759L3.66863 44.7465L5.45831 39.6172L13.6666 43.4207L6.32065 45.9759ZM21.0116 40.8664L7.24972 34.4879L9.0394 29.3595L19.3233 34.494C13.1847 30.5198 10.8291 24.2293 10.8291 24.2293L11.441 22.4767C12.5286 25.2138 14.9215 28.6224 18.2097 31.8397C21.5256 35.0862 25.0399 37.4379 27.8488 38.4888L21.0116 40.8664ZM26.2975 24.7112C27.7344 22.6621 29.2156 20.594 31.2748 19.1224C33.2352 17.7207 36.4176 17.4647 39.4345 17.6328C38.4153 19.4034 37.6622 21.3681 36.9861 23.2552C36.1689 25.5397 35.0734 27.9086 32.9847 29.3095C32.4214 29.6871 31.6318 29.9629 30.7886 30.1672C29.6298 28.4009 28.1097 26.5336 26.2975 24.7112Z' fill='white' />
              </svg>
              <span class='text-base font-medium'>You have been referred on {contriDetail.referralNumber} contributions.<br />You get 10% of the referee's reward</span>
            </div>
            <div class='flex justify-between items-center'>
              <span>{contriDetail.claimableBuidlPointReferralRewards / 10 ** 18}</span>
              <button class='flex items-center justify-center text-xs font-medium rounded-full px-4 py-2 space-x-1 bg-Pure-White text-Pure-Black' onClick={() => { navigator.clipboard.writeText(referralURL) }}>
                <span>Copy Referral</span>
              </button>
              <button class='flex items-center justify-center text-xs font-medium rounded-full px-4 py-2 space-x-1 bg-Pure-White text-Pure-Black'>
                <a href={tweetIntent} target="_new">
                  {' '}
                  Tweet Link
                </a>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto w-full space-y-4 md:space-y-8 flex flex-col items-center">
        <div className="flex items-center space-x-4"></div>
        <div className="w-full flex flex-col  lg:flex-row items-stretch space-y-6 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 border border-Bright-Gray rounded-2xl p-6 pl-0 pb-0 flex flex-col overflow-hidden space-y-4">
          </div>
        </div>
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Users
                </th>
                <th scope="col" class="px-6 py-3">
                  Contributions
                </th>
                <th scope="col" class="px-6 py-3">
                  Referrals
                </th>
                <th scope="col" class="px-6 py-3">
                  BuildPoints
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

              {contributors.map((contributor, index) => (
                <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td class="flex items-center px-6 py-4 whitespace-nowrap">
                    <div>{index + 1}</div>
                    <div class="ml-4">
                      <div class="text-base font-semibold">{getEllipsisTxt(contributor.id)}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    {formatUnits?.(contributor?.totalContribution, (chain?.id == bscId ? 18 : 6))}
                  </td>
                  <td class="px-6 py-4">
                    {contributor.referralNumber}
                  </td>
                  <td class="px-6 py-4">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">{contributor.totalBuidlPointRewards / 10 ** 18}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Loader showModal={isClaiming} setShowModal={() => { setIsClaming(false) }} />
      <Modals
        showModal={claimSucc}
        setShowModal={() => { setClaimSucc(false) }}
      >
        <CongratsModalWrapper>
          {" "}
          <div className="space-y-2 py-6">
            <h1 className="text-Bright-Gray font-medium text-xl">
              Congratulation!
            </h1>
            <h4 className="text-Bright-Gray/90 font-normal text-sm">
              You have successfully claimed
            </h4>
          </div>
          <button
            onClick={() => { setClaimSucc(false); }}
            className="bg-Pure-White text-Pure-Black text-sm font-medium rounded-xl py-2 px-6"
          >
            Close
          </button>
        </CongratsModalWrapper>
      </Modals>
    </>
  );
};

export default Rewards;
