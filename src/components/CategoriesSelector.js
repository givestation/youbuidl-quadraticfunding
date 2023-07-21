import { useState,useEffect } from "react";


const CategoriesSelector = ({onSubmit}) => {

  return (
    <div className="flex items-center overflow-x-auto flex-nowrap space-x-8 lg:space-x-10 xlspace-x-20">
      {/* <div className="flex items-center  cursor-pointer"> */}
      <button className="flex items-center space-x-4"
          onClick={() => {onSubmit('popular')}}>
          <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
            <img src="/assets/icons/popular.svg" alt="popular" />
          </div>
          <h3 className="text-Spanish-Gray">Popular</h3>
        </button>
        <button className="flex items-center space-x-4"
          onClick={() => {onSubmit('ai')}}>
          <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
            <img src="/assets/icons/popular.svg" alt="popular" />
          </div>
          <h3 className="text-Spanish-Gray">AI</h3>
        </button>
      {/* </div> */}
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('web3')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/art.svg" alt="art" />
        </div>
        <h3 className="text-Spanish-Gray">Web3</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('defi')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/gaming.svg" alt="gaming" />
        </div>
        <h3 className="text-Spanish-Gray">DeFi</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('nfts')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/music.svg" alt="music" />
        </div>
        <h3 className="text-Spanish-Gray">NFTs</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('tools')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/sports.svg" alt="sports" />
        </div>
        <h3 className="text-Spanish-Gray">Tools</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('public goods')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/sports.svg" alt="sports" />
        </div>
        <h3 className="text-Spanish-Gray">Public goods</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('scholarships')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/sports.svg" alt="sports" />
        </div>
        <h3 className="text-Spanish-Gray">Scholarships</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('infrastructure')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/sports.svg" alt="sports" />
        </div>
        <h3 className="text-Spanish-Gray">Infrastructure</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('entertainment')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/sports.svg" alt="sports" />
        </div>
        <h3 className="text-Spanish-Gray">Entertainment</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('events')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/sports.svg" alt="sports" />
        </div>
        <h3 className="text-Spanish-Gray">Events</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('gamefi')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/sports.svg" alt="sports" />
        </div>
        <h3 className="text-Spanish-Gray">GameFI</h3>
      </button>
    </div>
  );
};

export default CategoriesSelector;
