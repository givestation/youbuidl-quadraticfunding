const ContributionItem = () => {
  return (
    <div className="bg-Anti-Flash-White rounded-3xl shadow-details p-2 flex items-center justify-between flex-col space-y-2 sm:space-y-0 sm:flex-row">
      <div className="flex items-center  w-full sm:w-fit space-x-2">
        <div className="bg-Pure-Black p-2 rounded-2xl">
          <img src="/assets/images/contribution.png" alt="contribution" />
        </div>
        <div className="space-y-2">
          <h1 className="text-Davy-Grey text-lg font-medium">SpinSamurai </h1>
          <h4 className="text-Davy-Grey text-sm font-normal">
            225% up to AU$ 5,000
            <br />
            jhgfjjhghjkkkhgj
          </h4>
        </div>
      </div>
      <div className="space-y-1 w-full flex   text-center items-center sm:flex-col sm:w-fit">
        <h3 className="bg-Chinese-Blue flex-1 sm:px-10  rounded-full py-2.5 text-center text-Pure-White/95">
          $1125
        </h3>
        <a href="https://etherscan.io/" className="text-Davy-Grey flex-1 text-sm">view campagin</a>
      </div>
    </div>
  );
};

export default ContributionItem;
