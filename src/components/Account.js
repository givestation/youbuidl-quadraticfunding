import { ConnectButton } from "@rainbow-me/rainbowkit";

const Account = () => {
  return (
    // <ConnectButton />
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected =
          ready &&
          account &&
          chain

        return (
          <div>
            {(() => {
              if (!connected) {
                return (
                  <div>
                    <div>
                      <button
                        onClick={openConnectModal}
                      >
                        <div className="bg-[#3EA7E1] w-full sm:w-auto rounded-md text-white py-2 px-4">
                          Donate Now
                        </div>
                      </button>
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default Account;
