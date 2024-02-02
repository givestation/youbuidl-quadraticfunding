import { useState, useEffect } from "react";
import TotalBalance from "../components/TotalBalance";
import Modals from "../components/modals";
import CongratsModalWrapper from "../components/modals/CongratsModalWrapper";
import CryptoDropdown from "../components/CryptoDropdown";
import CrowdFundingContractInterface from "../abi/Crowdfunding.json";
import {
  readContract,
  writeContract,
  waitForTransaction,
  watchContractEvent,
} from "@wagmi/core";
import { formatEther, formatUnits } from "viem";
import Loader from "../components/Loader";
import { useNetwork, useAccount } from "wagmi";
import { bscId, chainLogos, contractAddresses } from "../utils/constant";
import {
  getContributionDetails,
  getContributors,
  getEllipsisTxt,
} from "../utils";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

const Rewards = () => {
  const { chain, chains } = useNetwork();
  const { address, connector, isConnected } = useAccount();
  const [contributors, setContributors] = useState([]);
  const [contriDetail, setContriDetail] = useState(null);

  const [isClaiming, setIsClaming] = useState(false);
  const [claimSucc, setClaimSucc] = useState(false);

  const referralURL =
    "https://" +
    (window.location.host ?? "no-host") +
    "?r=" +
    window.btoa(address ?? "");
  const textURI = encodeURIComponent(
    "Use my referral code to take part in the grant platform."
  );
  const urlURI = encodeURIComponent(referralURL);
  const tweetIntent = `https://twitter.com/intent/tweet?text=${textURI}&url=${urlURI}`;

  //===============crowdfunding Contract config===============
  let crowdFundingContractConfig = {};
  if (chain === undefined) {
    console.log("plz connect metamask");
  } else {
    crowdFundingContractConfig = {
      address: contractAddresses[chain?.id],
      abi: CrowdFundingContractInterface,
    };
  }

  const intContributors = async () => {
    const boardData = await getContributors(chain?.id);
    setContributors(boardData);
    const contriData = await getContributionDetails(address, chain?.id);
    setContriDetail(contriData);
  };

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
  };

  useEffect(() => {
    if (chain) {
      intContributors();
    }
  }, [chain]);

  return (
    <>
      <Loader
        showModal={isClaiming}
        setShowModal={() => {
          setIsClaming(false);
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid xl:grid-cols-3 gap-6">
            <div className="bg-[#3EA7E1] text-white px-4 py-3 rounded-2xl shadow-md shadow-[#3EA7E1] overflow-hidden relative">
              <div className="absolute top-0 left-0 z-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={81}
                  height={41}
                  fill="none"
                >
                  <path
                    fill="#D016FF"
                    fillRule="evenodd"
                    d="M80.62 0c-1.021 6.91-7.275 26.34-33.036 35.154C22.589 43.704 6.124 40.764 0 38V20C0 8.954 8.955 0 20 0h60.62Z"
                    clipRule="evenodd"
                    opacity={0.2}
                  />
                </svg>
              </div>
              <div className="absolute top-2 right-2 z-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={49}
                  height={52}
                  fill="none"
                >
                  <path
                    fill="#12D69B"
                    d="M3.372 24.641C18.612 21.448 23.927 16.361 26.298 0 29.546 17.042 34.43 22.473 49 24.641c-16.507 3.52-20.363 9.958-22.702 25.198C23.3 32.37 17.994 27.216 3.372 24.641Z"
                  />
                  <path
                    fill="#12D69B"
                    d="M35.048 9.866c3.102-.65 4.184-1.684 4.667-5.01.661 3.465 1.655 4.569 4.621 5.01-3.36.715-4.145 2.024-4.621 5.123-.61-3.552-1.69-4.6-4.667-5.123ZM0 40.73c6.275-1.312 8.464-3.401 9.44-10.124 1.338 7.002 3.349 9.233 9.348 10.124-6.797 1.447-8.385 4.091-9.348 10.353C8.206 43.906 6.02 41.788 0 40.73Z"
                  />
                </svg>
              </div>
              <div className=" z-10 relative flex flex-col justify-between h-full">
                <div>
                  <h1 className="font-bold text-2xl">BuildPoints</h1>
                  <p>You have received Points for funding {contriDetail?.contributions.length} projects.</p>
                </div>
                <div className="mt-10">
                  <h2 className="font-bold text-xl">{formatUnits(contriDetail ? contriDetail.claimableBuidlPointRewards : 0, 18)} </h2>
                </div>
              </div>
              <div className="absolute bottom-0 z-0 right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={136}
                  height={80}
                  fill="none"
                >
                  <path
                    fill="#D016FF"
                    fillRule="evenodd"
                    d="M.308 80H116c11.037 0 19.986-8.94 20-19.975V0c-.769 11.667-14.031 35-60.923 35S5.692 65 .307 80Z"
                    clipRule="evenodd"
                    opacity={0.2}
                  />
                </svg>
              </div>
            </div>
            <div className="bg-[#3EA7E1] text-white px-4 py-3 rounded-2xl shadow-md shadow-[#3EA7E1] overflow-hidden relative">
              <div className="absolute top-0 left-0 z-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={81}
                  height={41}
                  fill="none"
                >
                  <path
                    fill="#C4C4C4"
                    fillRule="evenodd"
                    d="M80.62 0c-1.021 6.91-7.275 26.34-33.036 35.154C22.589 43.704 6.124 40.764 0 38V20C0 8.954 8.955 0 20 0h60.62Z"
                    clipRule="evenodd"
                    opacity={0.2}
                  />
                </svg>
              </div>
              <div className="z-10 relative flex flex-col justify-between h-full">
                <div>
                  <h1 className="font-bold text-2xl">Contribution Rewards</h1>
                  <p>You have received USDT for funding {contriDetail?.contributions.length} projects.</p>
                </div>
                <div className="mt-10 flex justify-between ">
                  <div className="flex items-center gap-1">
                    <img
                      src={chainLogos[chain?.id]}
                      className="w-6 h-6 rounded-full object-contain"
                      alt="coin"
                    />
                    <div>
                      <h1 className="font-bold text-lg">{formatUnits(contriDetail ? contriDetail.claimableUSDTRewards : 0, (chain?.id === bscId ? 18 : 6))}</h1>
                      <p className="font-medium text-sm">USDT</p>
                    </div>
                  </div>
                  <button
                    onClick={claimReward}
                    className="rounded-md bg-[#12D69B] py-1 px-4 sm:py-2 sm:px-8 "
                  >
                    Claim
                  </button>
                </div>
              </div>
              <svg
                className="absolute bottom-0 z- right-0"
                xmlns="http://www.w3.org/2000/svg"
                width={136}
                height={80}
                fill="none"
              >
                <path
                  fill="#C4C4C4"
                  fillRule="evenodd"
                  d="M.308 80H116c11.037 0 19.986-8.94 20-19.975V0c-.769 11.667-14.031 35-60.923 35S5.692 65 .307 80Z"
                  clipRule="evenodd"
                  opacity={0.2}
                />
              </svg>
            </div>
            <div className="bg-[#369FFF] text-white px-4 py-3 rounded-2xl shadow-md shadow-[#369FFF] overflow-hidden relative">
              <div className="absolute top-0 left-0 z-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={81}
                  height={41}
                  fill="none"
                >
                  <path
                    fill="#C4C4C4"
                    fillRule="evenodd"
                    d="M80.62 0c-1.021 6.91-7.275 26.34-33.036 35.154C22.589 43.704 6.124 40.764 0 38V20C0 8.954 8.955 0 20 0h60.62Z"
                    clipRule="evenodd"
                    opacity={0.2}
                  />
                </svg>
              </div>
              <div className="z-10 relative">
                <div>
                  <h1 className="font-bold text-2xl">Referrals</h1>
                  <p>You have referred {contriDetail?.referralNumber} contributors.</p>
                  <p>You get 10% of the referred user rewards.</p>
                </div>
                <div className="mt-10 flex justify-between  items-center gap-4">
                  <h2 className="font-bold text-xl">{contriDetail?.claimableBuidlPointReferralRewards}</h2>
                  <div className="flex sm:items-center gap-4 flex-1 flex-col sm:flex-row xl:items-start 2xl:items-center xl:flex-col 2xl:flex-row ">
                    <button
                      onClick={() => { navigator.clipboard.writeText(referralURL) }}
                      className="rounded-md flex-1 bg-[#12D69B] py-1 w-full  sm:py-2  "
                    >
                      Copy Referral
                    </button>
                    <button
                      className="rounded-md flex-1 bg-[#12D69B] py-1 w-full sm:py-2  "
                    >
                      <a href={tweetIntent} target="_new">
                        {' '}
                        Tweet Link
                      </a>
                    </button>
                  </div>
                </div>
              </div>
              <svg
                className="absolute bottom-0 z- right-0"
                xmlns="http://www.w3.org/2000/svg"
                width={136}
                height={80}
                fill="none"
              >
                <path
                  fill="#C4C4C4"
                  fillRule="evenodd"
                  d="M.308 80H116c11.037 0 19.986-8.94 20-19.975V0c-.769 11.667-14.031 35-60.923 35S5.692 65 .307 80Z"
                  clipRule="evenodd"
                  opacity={0.2}
                />
              </svg>
            </div>
          </div>
          <div className="flex mt-6 mb-2 justify-center">
            <div className="bg-[#3EA7E1] rounded-lg px-6 py-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={31}
                height={29}
                fill="none"
              >
                <path
                  fill="#12D69B"
                  d="M24.976 3.11H5.914a1.557 1.557 0 0 1-1.555-1.555C4.359.698 5.057 0 5.914 0h19.05c.857 0 1.555.698 1.555 1.555a1.539 1.539 0 0 1-1.543 1.555Z"
                />
                <path
                  fill="#12D69B"
                  d="M25.282 3.11v9.574a9.572 9.572 0 0 1-9.574 9.574h-.477a9.574 9.574 0 0 1-9.146-6.734 9.439 9.439 0 0 1-.428-2.84V3.11h19.625Z"
                />
                <path
                  fill="#12D69B"
                  d="M23.42 18.328c0 .012.012.012.012.024 3.648.27 5.534-1.457 6.489-3.097.648-1.102.967-2.375.979-3.66V9.328c0-.38-.037-.759-.11-1.126-.845-3.98-5.265-3.685-5.522-3.66v2.62l.012-.025s3.086-.257 3.024 2.914c.025 1.15 0 1.64 0 1.64s.343 3.685-3.428 3.918c-.012-.037-.024-.061-.036-.098a9.672 9.672 0 0 1-1.42 2.816ZM7.48 18.328c0 .012-.012.012-.012.024-3.648.27-5.534-1.457-6.489-3.097C.331 14.153.012 12.88 0 11.595V9.328c0-.38.037-.759.11-1.126.845-3.98 5.265-3.685 5.522-3.66v2.62l-.012-.025s-3.086-.257-3.024 2.914c-.025 1.15 0 1.64 0 1.64s-.343 3.685 3.428 3.918c.012-.037.024-.061.036-.098a9.985 9.985 0 0 0 1.42 2.816ZM17.174 22.048h-3.612v4.91h3.612v-4.91ZM19.31 26.96h-8.055a.259.259 0 0 0-.257.257v1.739h8.557v-1.739c.013-.135-.11-.257-.244-.257Z"
                />
                <path
                  fill="url(#a)"
                  d="m16.177 6.82.673 1.36c.11.232.343.391.6.428l1.506.22c.649.098.906.894.44 1.347l-1.09 1.065a.82.82 0 0 0-.232.698l.257 1.494a.79.79 0 0 1-1.15.832l-1.347-.71a.78.78 0 0 0-.735 0l-1.347.71a.793.793 0 0 1-1.15-.832l.257-1.494a.754.754 0 0 0-.233-.698l-1.09-1.065c-.465-.453-.208-1.26.441-1.346l1.506-.22a.807.807 0 0 0 .6-.43l.674-1.358a.792.792 0 0 1 1.42 0Z"
                />
                <defs>
                  <linearGradient
                    id="a"
                    x1={12.18}
                    x2={19.308}
                    y1={9.061}
                    y2={13.224}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFF8CE" />
                    <stop offset={0.494} stopColor="#FFF3C0" />
                    <stop offset={1} stopColor="#FFE9A0" />
                  </linearGradient>
                </defs>
              </svg>
              <p className="text-white">Leaderboard</p>
            </div>
          </div>
          <div className="flow-root">
            <div className=" -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#484964] sm:pl-0"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-[#484964]"
                      >
                        Contrubutions
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-[#484964]"
                      >
                        Referrals
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-[#484964]"
                      >
                        BuidlPoints
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contributors.map((contributor, index) => (
                      <tr>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium  text-gray-900 sm:pl-0 ">
                          <div className="flex items-center gap-3 min-w-max">
                            <p className="font-bold">{index + 1}</p>
                            <p className="font-medium text-sm text-[#525252]">
                              {getEllipsisTxt(contributor.id)}
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#12D69B]"></div>
                            <p className="font-medium text-base text-[#525252]">
                              {formatUnits?.(contributor?.totalContribution, (chain?.id == bscId ? 18 : 6))}
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#12D69B]"></div>
                            <p className="font-medium text-base text-[#525252]">
                              {contributor.referralNumber}
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="px-2 py-1 max-w-fit	 rounded-md bg-[#E6E6F2] flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={22}
                              height={24}
                              fill="none"
                            >
                              <path
                                fill="#12D69B"
                                d="M1.512 12.053C8.355 10.62 10.742 8.335 11.807.988c1.459 7.653 3.652 10.092 10.195 11.065-7.413 1.581-9.144 4.472-10.195 11.316-1.346-7.845-3.73-10.16-10.295-11.316Z"
                              />
                              <path
                                fill="#12D69B"
                                d="M15.736 5.418c1.393-.292 1.88-.756 2.096-2.25.297 1.556.744 2.052 2.075 2.25-1.509.321-1.861.909-2.075 2.3-.274-1.595-.759-2.065-2.096-2.3ZM-.002 19.28c2.818-.59 3.8-1.527 4.24-4.546.6 3.144 1.503 4.146 4.197 4.546-3.052.65-3.765 1.837-4.198 4.65-.554-3.224-1.535-4.175-4.239-4.65Z"
                              />
                            </svg>
                            <p className="text-[#525252]">{contributor.totalBuidlPointRewards / 10 ** 18}</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div >
      <Modals
        showModal={claimSucc}
        setShowModal={() => {
          setClaimSucc(false);
        }}
      >
        <CongratsModalWrapper>
          <div className="space-y-2 py-6">
            <h1 className="text-Bright-Gray font-medium text-xl">
              Congratulation! 💐
            </h1>
            <h4 className="text-Bright-Gray/90 font-normal text-sm">
              You have claimed <span className="font-bold"> ${contriDetail?.claimableUSDTRewards}</span> for
              funding {contriDetail?.contributions.length} projects.
            </h4>
          </div>
          <button
            onClick={() => {
              setClaimSucc(false);
            }}
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
