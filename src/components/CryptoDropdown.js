import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const CryptoDropdown = ({ classes }) => {
    const [selectedCrypto, setSelectedCrypto] = useState("usdc");

    const cryptos = ["dai", "usdc", "usdt", "gvst", "bnb"];
    return (
        <Menu as="div" className="relative">
            <div>
                <Menu.Button className="flex md:inline-flex justify-between items-center pl-4  space-x-2 sm:space-x-4 border-2 bg-Light-Slate-Gray/5 w-full border-Light-Slate-Gray/90 text-Light-Slate-Gray  rounded-lg ">
                    <img src={`/assets/icons/${selectedCrypto}.svg`} alt={selectedCrypto} />
                    <h1 className="font-medium text-base">{selectedCrypto.toUpperCase()}</h1>
                    <span className="bg-Chinese-Blue text-Pure-White px-4 sm:px-8 rounded-lg py-1 text-xs">Optimism</span>
                    <div className="bg-Chinese-Blue rounded-lg h-10 w-10 flex items-center justify-center">
                        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.8382 8.11719H5.16159C4.6614 8.11719 4.3821 8.64531 4.69187 9.00586L13.0301 18.6746C13.2688 18.9514 13.7284 18.9514 13.9696 18.6746L22.3079 9.00586C22.6176 8.64531 22.3384 8.11719 21.8382 8.11719Z" fill="white" />
                        </svg>
                    </div>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className={`absolute w-full overflow-hidden mt-1 origin-top-right shadow-details bg-Pure-White ${classes}`}>
                    <div className="font-medium text-sm text-Light-Slate-Gray">
                        {
                            cryptos.map((crypto) => crypto !== selectedCrypto && <Menu.Item key={crypto}
                                onClick={() => {
                                    setSelectedCrypto(crypto);
                                }}
                                as="div"
                                className=" cursor-pointer px-4 hover:bg-Light-Slate-Gray/5 py-1 flex items-center justify-between sm:px-8 space-x-4 border-l-4 border-Pure-White duration-300 hover:border-Chinese-Blue"
                            >
                                <img src={`/assets/icons/${crypto}.svg`} alt={crypto} />
                                <h1 className="font-medium text-base">{crypto.toUpperCase()}</h1>
                                <span className="bg-Chinese-Blue text-Pure-White px-4 sm:px-8 rounded-lg py-1 text-xs">Optimism</span>
                            </Menu.Item>
                            )
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default CryptoDropdown;