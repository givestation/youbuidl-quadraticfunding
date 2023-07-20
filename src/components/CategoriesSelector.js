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
      {/* </div> */}
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('arts')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/art.svg" alt="art" />
        </div>
        <h3 className="text-Spanish-Gray">Arts</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('gaming')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/gaming.svg" alt="gaming" />
        </div>
        <h3 className="text-Spanish-Gray">Gaming</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('music')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/music.svg" alt="music" />
        </div>
        <h3 className="text-Spanish-Gray">Music</h3>
      </button>
      <button className="flex items-center space-x-4 cursor-pointer"
        onClick={() => { onSubmit('sports')}}>
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/sports.svg" alt="sports" />
        </div>
        <h3 className="text-Spanish-Gray">Sports</h3>
      </button>
    </div>
  );
};

export default CategoriesSelector;
