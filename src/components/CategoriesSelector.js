const CategoriesSelector = () => {
  return (
    <div className="flex items-center overflow-x-auto flex-nowrap space-x-8 lg:space-x-10 xlspace-x-20">
      <div className="flex items-center space-x-4 cursor-pointer">
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/popular.svg" alt="popular" />
        </div>
        <h3 className="text-Spanish-Gray">Popular</h3>
      </div>
      <div className="flex items-center space-x-4 cursor-pointer">
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/art.svg" alt="art" />
        </div>
        <h3 className="text-Spanish-Gray">Arts</h3>
      </div>
      <div className="flex items-center space-x-4 cursor-pointer">
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/gaming.svg" alt="gaming" />
        </div>
        <h3 className="text-Spanish-Gray">Gaming</h3>
      </div>
      <div className="flex items-center space-x-4 cursor-pointer">
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/music.svg" alt="music" />
        </div>
        <h3 className="text-Spanish-Gray">Music</h3>
      </div>
      <div className="flex items-center space-x-4 cursor-pointer">
        <div className="bg-Pure-White rounded-full flex items-center justify-center w-10 h-10 shadow-2xl">
          <img src="/assets/icons/sports.svg" alt="sports" />
        </div>
        <h3 className="text-Spanish-Gray">Sports</h3>
      </div>
    </div>
  );
};

export default CategoriesSelector;
