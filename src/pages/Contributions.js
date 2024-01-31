import ContributionItem from "../components/ContributionItem";
import CrowdFundingContractInterface from '../abi/Crowdfunding.json';
import {
  useNetwork,
  useContractRead
} from 'wagmi';
import { contractAddresses } from "../utils/constant";

const Contributions = () => {
  const { chain } = useNetwork()

  let crowdFundingContractConfig = {};
  if (chain === undefined){
    console.log("plz connect metamask")
  }else{
    crowdFundingContractConfig = {
      address: contractAddresses[chain?.id],
      abi: CrowdFundingContractInterface,
    };
  }

  const { data: returnAllProjects } = useContractRead({
    ...crowdFundingContractConfig,
    functionName: 'returnAllProjects',
  });

  const { data: projectOfContributors } = useContractRead({
    ...crowdFundingContractConfig,
    functionName: 'getContributedProject',
  });
  console.log(projectOfContributors,"getContributedProject=============");
  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-Raisin-Black font-semibold text-lg">
          Contributions
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
      <div className="space-y-2 md:space-y-4">
        {returnAllProjects?.map((each ,index) => (
            <ContributionItem key={index} contractAddress={each}  />
          ))}
        
      </div>
    </div>
  );
};

export default Contributions;
