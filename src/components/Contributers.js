import ContributerItem from "./ContributerItem";

const Contributers = ({ heading }) => {
  return (
    <div className="space-y-6 bg-Pure-White px-4 py-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-Raisin-Black font-semibold text-lg">{heading}</h1>
        <svg
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
      <div className="space-y-2">
        <ContributerItem
          address={"0xGF53E..."}
          amount={"0.545 USDC"}
          imgSrc={"/assets/images/avatar-1.png"}
        />
        <ContributerItem
          address={"0xGF53E..."}
          amount={"0.545 USDC"}
          imgSrc={"/assets/images/avatar-2.png"}
        />
        <ContributerItem
          address={"0xGF53E..."}
          amount={"788 USDT"}
          imgSrc={"/assets/images/avatar-3.png"}
        />
        <ContributerItem
          address={"0xGF53E..."}
          amount={"0.545 USDC"}
          imgSrc={"/assets/images/avatar-1.png"}
        />
        <ContributerItem
          address={"0xGF53E..."}
          amount={"0.545 USDC"}
          imgSrc={"/assets/images/avatar-2.png"}
        />
        <ContributerItem
          address={"0xGF53E..."}
          amount={"788 USDT"}
          imgSrc={"/assets/images/avatar-3.png"}
        />
        <ContributerItem
          address={"0xGF53E..."}
          amount={"0.545 USDC"}
          imgSrc={"/assets/images/avatar-1.png"}
        />
        <ContributerItem
          address={"0xGF53E..."}
          amount={"0.545 USDC"}
          imgSrc={"/assets/images/avatar-2.png"}
        />
      </div>
    </div>
  );
};

export default Contributers;
