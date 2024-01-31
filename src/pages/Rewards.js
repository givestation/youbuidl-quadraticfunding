import { useState, useEffect } from "react";
import TotalBalance from "../components/TotalBalance";
import Modals from "../components/modals";
import CongratsModalWrapper from "../components/modals/CongratsModalWrapper";
import CryptoDropdown from "../components/CryptoDropdown";
import CrowdFundingContractInterface from '../contracts/abi/Crowdfunding.json';
import { formatEther, formatUnits } from 'viem';
import web3 from 'web3';
import Loader from '../components/Loader';
import {
  useContractRead,
  useNetwork,
  useAccount,
  usePrepareContractWrite,
  useContractWrite
} from 'wagmi';


const Rewards = () => {

  return (
    <>
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
                    Rank
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
              <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td class="flex items-center px-6 py-4 whitespace-nowrap">
                  <img class="w-10 h-10 rounded-full" src="/assets/images/avatar-3.png" alt="Neil Sims image" />
                  <div class="ml-4">
                    <div class="text-base font-semibold">0xXDGET46RG37FD..</div>
                    <div class="text-base font-semibold">etherscan.com/</div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  10
                </td>
                <td class="px-6 py-4">
                  5
                </td>
                <td class="px-6 py-4">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">100</button>
                </td>
              </tr>
              <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td class="flex items-center px-6 py-4 whitespace-nowrap">
                  <img class="w-10 h-10 rounded-full" src="/assets/images/avatar-3.png" alt="Neil Sims image" />
                  <div class="ml-4">
                    <div class="text-base font-semibold">0xXDGET46RG37FD..</div>
                    <div class="text-base font-semibold">etherscan.com/</div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  20
                </td>
                <td class="px-6 py-4">
                  10
                </td>
                <td class="px-6 py-4">
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-2 py-0.5 text-sm font-medium text-green-700">
                    <svg
                      className="h-1.5 w-1.5 fill-green-500"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    Optimism
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Rewards;
