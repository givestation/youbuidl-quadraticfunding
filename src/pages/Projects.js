import BuidlItem from "../components/BuidlItem";
import CategoriesSelector from "../components/CategoriesSelector";
import CrowdFundingContractInterface from '../contracts/abi/Crowdfunding.json';
import {
  useNetwork,
  useContractRead
} from 'wagmi';

const crowdFundingContractConfig = {
  address: '0x0cac952a900172370E9fAf3a189C9E7b15cb30B4',
  abi: CrowdFundingContractInterface,
};

const Projects = () => {

  const { chain, chains } = useNetwork()
  const addressBnb = "0x0cac952a900172370E9fAf3a189C9E7b15cb30B4";
  const addressEth = "0xcA90Ae5d47F616A8836ae04E1BBcc6267554F591";
  const addressArbi = "0xBFb60BEE0E53B70C8B118026711Bb488c63ECA83";

  let crowdFundingContractConfig = {};
  if (chain === undefined){

    console.log("plz connect metamask")
  }else{
    crowdFundingContractConfig = {
      address: (chain.id === 97 ? addressBnb : (chain.id === 5 ? addressEth : addressArbi)),
      abi: CrowdFundingContractInterface,
    };
  }

  const { data: returnAllProjects } = useContractRead({
    ...crowdFundingContractConfig,
    functionName: 'returnAllProjects',
  });
  return (
    <div className="max-w-6xl mx-auto space-y-4 md:space-y-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-Raisin-Black font-semibold text-lg">
          Trending Buidls
        </h1>
        <div className="flex items-center space-x-4">
          <svg
            className="cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.68 18.8C10.8674 18.8 11.83 17.8374 11.83 16.65C11.83 15.4626 10.8674 14.5 9.68 14.5C8.49259 14.5 7.53 15.4626 7.53 16.65C7.53 17.8374 8.49259 18.8 9.68 18.8Z"
              stroke="#43489D"
              strokeWidth="1.2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.53 16.6499H4.5"
              stroke="#43489D"
              strokeWidth="1.2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.5 16.6499H14.17"
              stroke="#43489D"
              strokeWidth="1.2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.31 9.8C15.4974 9.8 16.46 8.83741 16.46 7.65C16.46 6.46259 15.4974 5.5 14.31 5.5C13.1226 5.5 12.16 6.46259 12.16 7.65C12.16 8.83741 13.1226 9.8 14.31 9.8Z"
              stroke="#43489D"
              strokeWidth="1.2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.47 7.6499H19.5"
              stroke="#43489D"
              strokeWidth="1.2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 7.6499H9.83"
              stroke="#43489D"
              strokeWidth="1.2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            className="cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="4.75"
              cy="12.25"
              r="1.75"
              transform="rotate(-90 4.75 12.25)"
              fill="#43489D"
            />
            <circle
              cx="11.75"
              cy="12.25"
              r="1.75"
              transform="rotate(-90 11.75 12.25)"
              fill="#43489D"
            />
            <circle
              cx="18.75"
              cy="12.25"
              r="1.75"
              transform="rotate(-90 18.75 12.25)"
              fill="#43489D"
            />
          </svg>
        </div>
      </div>
      <CategoriesSelector />

      <div className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {returnAllProjects?.map((each ,index) => (
            <BuidlItem key={index} contractAddress={each}  />
          ))}
      </div>
    </div>
  );
};

export default Projects;
