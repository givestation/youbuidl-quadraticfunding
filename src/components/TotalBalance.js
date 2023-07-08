import React from "react";

const TotalBalance = () => {
  return (
    <div className="border w-full border-Bright-Gray rounded-2xl p-6 pb-0 pl-0 flex flex-col">
      <div className="flex-1 pl-6">
        <h3 className="text-Old-Silver font-normal text-xl">Total Balance</h3>
        <h1 className="text-Pure-Black font-semibold text-3xl">$101,045.50</h1>
      </div>
      <div className="flex items-end justify-between space-x-8">
        <img src="/assets/icons/pie.svg" alt="pie" />
        <div className="mb-4 cursor-pointer hover:opacity-70 duration-300">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84975 0 0 9.84974 0 22C0 34.1503 9.84975 44 22 44ZM22.2561 14.1015C21.8427 13.6563 21.1467 13.6305 20.7015 14.0439C20.2563 14.4573 20.2306 15.1533 20.6439 15.5985L26.0775 21.45H14.3C13.6925 21.45 13.2 21.9425 13.2 22.55C13.2 23.1575 13.6925 23.65 14.3 23.65H26.0775L20.6439 29.5015C20.2306 29.9467 20.2563 30.6427 20.7015 31.0561C21.1467 31.4695 21.8427 31.4437 22.2561 30.9985L30.1011 22.55L22.2561 14.1015Z"
              fill="#151515"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;
