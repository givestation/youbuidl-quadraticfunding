import { useState, useEffect } from "react";


const CategoriesSelector = ({ onSubmit }) => {

  return (
    <div className="flex items-center overflow-x-auto flex-nowrap space-x-8 lg:space-x-10 xlspace-x-20">
      <button className="flex items-center space-x-4"
        onClick={() => { onSubmit('popular') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/popular.svg" alt="popular" />
        </div>
        <h3 className="text-Spanish-Gray">Popular</h3>
      </button>
      <button className="flex items-center space-x-4"
        onClick={() => { onSubmit('ai') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/icons8-ai-64.png" alt="ai" className="w-7 h-7" />
        </div>
        <h3 className="text-Spanish-Gray">AI</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('web3') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/icons8-web3-64.png" alt="web3" className="w-7 h-7" />
        </div>
        <h3 className="text-Spanish-Gray">Web3</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('defi') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/gaming.svg" alt="gaming" />
        </div>
        <h3 className="text-Spanish-Gray">DeFi</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('nfts') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/icons8-nft-64.png" alt="nfts" className="w-7 h-7" />
        </div>
        <h3 className="text-Spanish-Gray">NFTs</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('tools') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/icons8-tools-64.png" alt="tools" className="w-7 h-7" />
        </div>
        <h3 className="text-Spanish-Gray">Tools</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('public goods') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/icons8-publicgoods-47.png" alt="publicgoods" className="w-7 h-7" />
        </div>
        <h3 className="text-Spanish-Gray">Public goods</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('scholarships') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/icons8-scholarship-64.png" alt="scholarships" className="w-7 h-7" />
        </div>
        <h3 className="text-Spanish-Gray">Scholarships</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('infrastructure') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/icons8-infrastructure-64.png" alt="infrastructure" className="w-7 h-7" />
        </div>
        <h3 className="text-Spanish-Gray">Infrastructure</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('entertainment') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/icons8-entertainment-64.png" alt="entertainment" />
        </div>
        <h3 className="text-Spanish-Gray">Entertainment</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('events') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/icons8-events-48.png" alt="events" className="w-7 h-7" />
        </div>
        <h3 className="text-Spanish-Gray">Events</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('gamefi') }}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/icons8-gamefi-64.png" alt="gamefi" className="w-7 h-7" />
        </div>
        <h3 className="text-Spanish-Gray">GameFI</h3>
      </button>
    </div>
  );
};

export default CategoriesSelector;
