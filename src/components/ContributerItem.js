const ContributerItem = ({ imgSrc, address, amount }) => {
  return (
    <div className="flex items-center space-x-2">
      <img src={imgSrc} alt="avatar" />
      <div className="flex flex-1 items-start justify-between">
        <div>
          <h3 className="text-Light-Slate-Gray text-lg font-medium">
            {address}
          </h3>
          <h6 className="text-Nickle font-normal text-xs">{amount}</h6>
        </div>
        <a
          href="/"
          className="bg-Chinese-Blue text-Pure-White rounded-lg text-xs py-0.5 px-2"
        >
          view on explorer
        </a>
      </div>
    </div>
  );
};

export default ContributerItem;
