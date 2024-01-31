import { useState, useEffect } from "react";
import TotalBalance from "../components/TotalBalance";
import Modals from "../components/modals";
import CongratsModalWrapper from "../components/modals/CongratsModalWrapper";
import CryptoDropdown from "../components/CryptoDropdown";
import CrowdFundingContractInterface from '../abi/Crowdfunding.json';
import { formatEther,formatUnits  } from 'viem';
import web3 from 'web3';
import Loader from '../components/Loader';
import {
  useContractRead,
  useNetwork,
  useAccount,
  usePrepareContractWrite,
  useContractWrite
} from 'wagmi';
import { contractAddresses } from "../utils/constant";

const Rewards = () => {
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount();

  // Loading modal
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  // Details Modal State
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  // Congrats Modal State
  const [showCongratsModal, showShowCongratsModal] = useState(true);
  // setRewardUser
  const [rewardUser, setRewardUser] = useState(0);
  // setPriceBNB
  const [priceToken, setPriceToken] = useState(0);
  // setEtherRamount
  const [etherRAmount, setEtherRAmount] = useState(0);

  //===============crowdfunding Contract config===============
  let crowdFundingContractConfig = {};
  if (chain === undefined){
    console.log("plz connect metamask")
  }else{
    crowdFundingContractConfig = {
      address: contractAddresses[chain?.id],
      abi: CrowdFundingContractInterface,
    };
  }
//=============show Reward of user========
  const { data: showRewardUserData } = useContractRead({
    ...crowdFundingContractConfig,
    functionName: 'showRewardUser',
    args: [
      address
    ],
  });
  console.log("reward show", showRewardUserData)
//================user can Withdraw reward==============
  const {
    config: userRewardConfig,
    error: userRewardConfigError,
    isError: isUserRewardConfigError,
  } = usePrepareContractWrite({
    ...crowdFundingContractConfig,
    functionName: 'withdrawUserRewards',
    // args: [
      
    // ],
  });
 
  const {
    data: userRewardReturnData,
    write: withdrawUserRewards,
    error: userRewardReturnError,
    isLoading,
    isSuccess 
  } = useContractWrite(userRewardConfig);

  //==============main functions===========
  const onEtherRmount = (e) => {
    setEtherRAmount(
      web3.utils.toNumber(web3.utils.toWei(e.target.value, (chain?.id === 56 || chain?.id === 1 ? 'ether' : 'mwei')))//mwei
    );
    if(chain?.id === 56){
      getPriceBNB(e.target.value);
    } else if(chain?.id === 1){
      getPriceETH(e.target.value);
    }
  };
  console.log(etherRAmount,"reasdsfcasd-=-=--=-=-==-=")
  const rewardWithdraw = () =>{
   console.log("args for withdraw reward", etherRAmount)
    withdrawUserRewards?.();
  }

  const getPriceBNB = async (amount) => {
    const api_call = await fetch(`https://www.binance.com/api/v3/ticker/price?symbol=BNBUSDT`);
    const price = await api_call.json();
    setPriceToken(price?.price * amount);
    console.log(price?.price,amount,"===============");
  }

  const getPriceETH = async (amount) => {
    const api_call = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
    const price = await api_call.json();
    setPriceToken(price?.price * amount);
    console.log(price?.price,amount,"===============");
  }

  const getPriceArbi = async (amount) => {
    const api_call = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
    const price = await api_call.json();
    setPriceToken(price?.price * amount);
    console.log(price?.price,amount,"===============");
  }

  const getPriceOpti = async (amount) => {
    const api_call = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
    const price = await api_call.json();
    setPriceToken(price?.price * amount);
    console.log(price?.price,amount,"===============");
  }

  useEffect(() => {
    // setVerification?.();
    console.log(etherRAmount,"=-=-=000==")
},[etherRAmount]);


  // console.log( "reward Error!",userRewardConfigError)
  console.log(chain?.nativeCurrency,"current network info")

  return (
    <>
       {isLoading && <Loader showModal={true} setShowModal={setShowLoadingModal}/>}
      {/* Details Modal */}
      { 
      // showRewardUserData &&
        <Modals showModal={showDetailsModal} setShowModal={setShowDetailsModal}>
      
        <div className="max-w-sm sm:w-96 rounded-2xl bg-Pure-White">
          <div className="px-3 pt-3 pb-1.5 space-y-4">
            <div className="max-w-xs mx-auto py-5 space-y-4">
            
              {/* <div>
                <CryptoDropdown classes={"left-0"} />

              </div> */}

              <div className="text-Eire-Black space-y-0.5">
                <div className="flex justify-between items-center space-x-14 ">
                  <h2 className="font-normal text-base  flex-1">Enter
                    Amount</h2>
                  <input onChange={onEtherRmount}
                    className="bg-Anti-Flash-White outline-none max-w-[120px] text-center text-Light-Slate-Gray rounded-2xl p-3" />
                </div>

                <div className="flex justify-between ">
                  <h2 className="font-normal text-base ">Value USD</h2>
                  <h2 className="font-normal text-base ">${Number(priceToken).toFixed(2) }</h2>
                </div>
                <div className="flex justify-between ">
                  <h2 className="font-normal text-base ">Status</h2>
                  <h2 className="font-normal text-base flex items-center space-x-2">
                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle opacity="0.6" cx="8.5" cy="9.39453" r="8.5" fill="#73FE5C" />
                      <circle cx="8.50018" cy="9.39446" r="6.18182" fill="#4DED33" />
                    </svg>
                    <span>Earned</span></h2>
                </div>
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
                disabled={showRewardUserData === undefined  || etherRAmount === 0 ? true : false}
                onClick={() => {
                  rewardWithdraw();
                  
                }}
                className="bg-Chinese-Blue flex-1 border border-Chinese-Blue text-Pure-White py-2 rounded-4xl"
                // #ADADAD
              >
                Withdraw
              </button>
            </div>
            <hr className="h-1 mx-auto w-4/12 rounded-full bg-Pure-Black" />
          </div>
        </div>
        </Modals>
      }

      {/* Congrats Modal */}
      { isSuccess &&
        <Modals
          showModal={true}
          setShowModal={showShowCongratsModal}
        >
          <CongratsModalWrapper>
            {" "}
            <div className="space-y-2 py-6">
              <h1 className="text-Bright-Gray font-medium text-xl">
                Congratulation!
              </h1>
              <h4 className="text-Bright-Gray/90 font-normal text-base">
                You have successfully Withdraw { etherRAmount === undefined ? 0 : formatUnits?.(Number(etherRAmount),(chain?.id === 56 || chain?.id === 1 ? 18 : 6)) } 
                <span className="font-bold">{chain?.nativeCurrency?.symbol}</span> to your wallet.
              </h4>
            </div>
            <button
              onClick={() => showShowCongratsModal(false)}
              className="bg-Pure-White text-Pure-Black text-sm font-medium rounded-xl py-2 px-6"
            >
              Close
            </button>
          </CongratsModalWrapper>
        </Modals>
      }


      <div className="max-w-7xl mx-auto w-full space-y-4 md:space-y-8 flex flex-col items-center">
        <div className="flex items-center space-x-4">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.8185 21.126C38.8185 21.042 38.8185 20.958 38.8045 20.874C38.5245 11.242 30.7265 3.5 21.1645 3.5C11.6025 3.5 3.80451 11.242 3.52451 20.874C3.51051 20.972 3.51051 21.056 3.51051 21.14C3.4965 21.2328 3.4965 21.3272 3.51051 21.42C3.55251 22.232 3.91651 23.002 4.60251 23.646L17.4685 34.356H15.2705C15.139 34.3569 15.0091 34.3837 14.888 34.4349C14.7669 34.486 14.657 34.5605 14.5647 34.6541C14.4724 34.7477 14.3995 34.8586 14.35 34.9804C14.3006 35.1022 14.2756 35.2326 14.2765 35.364V40.46C14.2774 40.7234 14.3824 40.9757 14.5687 41.1619C14.7549 41.3481 15.0072 41.4531 15.2705 41.454H26.5825C26.8458 41.4531 27.0981 41.3481 27.2843 41.1619C27.4706 40.9757 27.5756 40.7234 27.5765 40.46V35.364C27.5774 35.2326 27.5524 35.1022 27.503 34.9804C27.4535 34.8586 27.3806 34.7477 27.2883 34.6541C27.196 34.5605 27.0861 34.486 26.965 34.4349C26.8439 34.3837 26.714 34.3569 26.5825 34.356H24.4405L37.7685 23.59C38.3985 23.002 38.7765 22.232 38.8185 21.42C38.8325 21.378 38.8325 21.35 38.8325 21.308C38.8325 21.252 38.8325 21.196 38.8185 21.126ZM21.1645 7C26.7085 7 31.5105 10.248 33.8345 14.98C33.1721 14.7769 32.4833 14.6731 31.7905 14.672C30.0545 14.672 28.4445 15.33 27.1845 16.492C26.5227 15.5021 25.6273 14.6905 24.5773 14.1289C23.5274 13.5673 22.3552 13.273 21.1645 13.272C18.6585 13.272 16.4325 14.574 15.1165 16.534C13.8893 15.335 12.2402 14.6663 10.5245 14.672C9.82451 14.672 9.13851 14.784 8.49451 14.98C10.8185 10.248 15.6205 7 21.1645 7ZM7.02451 21.112C7.36051 19.418 8.81651 18.172 10.5245 18.172C12.9045 18.172 13.8565 20.636 14.0945 21.392L17.0345 29.442L7.02451 21.112ZM20.9825 30.03L17.4265 20.314C17.4265 20.314 17.4125 20.272 17.3985 20.244C17.5945 18.298 19.2045 16.772 21.1645 16.772C23.1245 16.772 24.6365 18.214 24.9025 20.09L20.9825 30.03ZM24.9865 29.428L28.3045 20.986C28.3325 20.888 28.3885 20.776 28.4445 20.636C28.8505 19.768 29.8445 18.172 31.7905 18.172C33.4985 18.172 34.9685 19.418 35.2905 21.098L24.9865 29.428Z"
              fill="#43489D"
            />
          </svg>

          <h1 className="text-Chinese-Blue font-semibold text-base">
            Claim your BuidlPoints rewards.
          </h1>
        </div>

        <div className="w-full flex flex-col  lg:flex-row items-stretch space-y-6 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 border border-Bright-Gray rounded-2xl p-6 pl-0 pb-0 flex flex-col overflow-hidden space-y-4">
            <div className="flex-1 pl-6">
              <p className="text-Old-Silver font-normal text-base">
              { (showRewardUserData?.[0] === 0n || showRewardUserData?.[0] === undefined) ? "" : "Congratulations 🎊" }
               <br/> You have earned {' '}
                <span className="font-extrabold">
                   { showRewardUserData?.[0] === undefined ? 0 : formatEther(showRewardUserData?.[0]) } {chain?.nativeCurrency?.symbol}
                </span>{' '}
                and{' '}
                <span className="font-extrabold">
                   { showRewardUserData?.[1] === undefined ? 0 : formatEther(showRewardUserData?.[1]) } BuidlPoints
                </span> 
                 
              </p>
              <h1 className="text-Pure-Black font-semibold text-2xl sm:text-3xl">
                { showRewardUserData?.[0] === undefined ? 0 : formatEther(showRewardUserData?.[0]) } {chain?.nativeCurrency?.symbol}
              </h1>
            </div>
            <img
              className="max-w-[254px]"
              src="/assets/icons/ticket.svg"
              alt="ticket"
            />
          </div>
          <div className="w-auto">
            <TotalBalance/>
          </div>
        </div>
        <button 
          // disabled = {showRewardUserData === undefined ? true : false} 
          onClick={() => { rewardWithdraw(); }} className="bg-gradient-to-b from-Chinese-Blue to-Celestial-Blue py-2  rounded-lg max-w-xs w-full text-Pure-White">
            Withdraw
        </button>
      </div>
    </>
  );
};

export default Rewards;
