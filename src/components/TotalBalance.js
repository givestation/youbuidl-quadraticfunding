import React from "react";

const TotalBalance = () => {
  return (
    <div className="border w-full border-Bright-Gray rounded-2xl p-6 pb-0 pl-0 flex flex-col">
      <div className="flex-1 pl-6">
        <h3 className="text-Old-Silver font-normal text-xl">Total Balance</h3>
        <h1 className="text-Pure-Black font-semibold text-3xl"></h1>
      </div>
      <div className="flex items-end justify-between space-x-8">
        <img src="/assets/icons/pie.svg" alt="pie" />
        <div className="mb-4 cursor-pointer hover:opacity-70 duration-300">
          
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;
