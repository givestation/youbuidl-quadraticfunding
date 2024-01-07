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
                    <div className="hidden sm:block">
                      <button
                        onClick={openConnectModal}
                      >
                        <div className="cursor-pointer bg-Chinese-Blue text-Pure-White rounded-lg text-xs py-0.5
            px-2">
                          Connect
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
