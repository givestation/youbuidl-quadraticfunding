import { Link } from "react-router-dom";
import { useNetwork, useAccount, mainnet } from "wagmi";
import { formatUnits } from "viem";
import Account from "./Account";
import { useSwitchNetwork } from "wagmi";
import {
  bscId,
  categoryIcons,
  defaultEthLink,
  mainnetId,
  polygonId,
} from "../utils/constant";

const BuidlItem = ({ project, tag }) => {
  const { isConnected } = useAccount();

  const { chain } = useNetwork();

  const isRevealed = true;

  const { switchNetwork } = useSwitchNetwork();

  const contribute = () => {
    if (chain.id != project?.chainId) {
      switchNetwork(project?.chainId);
    } else {
    }
  };

  console.log({ project });
  return (tag === project?.filterTags || tag === "popular") && isRevealed ? (
    <div className="rounded-lg flex flex-col bg-white shadow-details overflow-hidden pb-1">
      <div className="relative">
        <img
          className="w-full object-cover h-48"
          src={project?.projectCoverUrl}
          alt="code"
        />
      </div>
      <div className="p-3 space-y-2 flex-1 gap-2 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 ">
              <Link
                to={`/buidls/${project?.id}/${project?.index}`}
                className="font-semibold text-lg"
              >
                {project?.title}
              </Link>
              <div className="flex items-center gap-0.5">
                {project?.isVerified && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={17}
                    fill="none"
                  >
                    <path
                      fill="#12D69B"
                      d="m15.4 7.608-.971-1.12a1.562 1.562 0 0 1-.336-.892V4.392c0-.751-.621-1.367-1.379-1.367H11.5a1.61 1.61 0 0 1-.9-.333l-1.129-.964c-.492-.418-1.3-.418-1.8 0l-1.121.97a1.656 1.656 0 0 1-.9.327H4.414c-.757 0-1.378.616-1.378 1.367v1.21c0 .277-.15.674-.329.886l-.964 1.127c-.414.488-.414 1.282 0 1.77l.964 1.127c.179.212.329.609.329.885v1.211c0 .751.621 1.367 1.378 1.367H5.65c.279 0 .686.15.9.333l1.129.964c.492.418 1.3.418 1.8 0l1.128-.964c.215-.184.615-.333.9-.333h1.215c.757 0 1.378-.616 1.378-1.367v-1.204c0-.276.15-.68.336-.892l.971-1.12c.415-.488.415-1.296-.007-1.784Zm-3.857-.447-3.45 3.421a.537.537 0 0 1-.757 0L5.607 8.868a.531.531 0 0 1 0-.75.542.542 0 0 1 .757 0l1.35 1.338 3.072-3.046a.542.542 0 0 1 .757 0 .531.531 0 0 1 0 .751Z"
                    />
                  </svg>
                )}
                {project?.isOnQF && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={17}
                    fill="none"
                  >
                    <path
                      fill="#3EA7E1"
                      d="m15.4 7.608-.971-1.12a1.562 1.562 0 0 1-.336-.892V4.392c0-.751-.621-1.367-1.379-1.367H11.5a1.61 1.61 0 0 1-.9-.333l-1.129-.964c-.492-.418-1.3-.418-1.8 0l-1.121.97a1.656 1.656 0 0 1-.9.327H4.414c-.757 0-1.378.616-1.378 1.367v1.21c0 .277-.15.674-.329.886l-.964 1.127c-.414.488-.414 1.282 0 1.77l.964 1.127c.179.212.329.609.329.885v1.211c0 .751.621 1.367 1.378 1.367H5.65c.279 0 .686.15.9.333l1.129.964c.492.418 1.3.418 1.8 0l1.128-.964c.215-.184.615-.333.9-.333h1.215c.757 0 1.378-.616 1.378-1.367v-1.204c0-.276.15-.68.336-.892l.971-1.12c.415-.488.415-1.296-.007-1.784Zm-3.857-.447-3.45 3.421a.537.537 0 0 1-.757 0L5.607 8.868a.531.531 0 0 1 0-.75.542.542 0 0 1 .757 0l1.35 1.338 3.072-3.046a.542.542 0 0 1 .757 0 .531.531 0 0 1 0 .751Z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex items-center text-md w-fit rounded-2xl px-2  gap-1 bg-[#CDEDFF]">
              <div>
                <img
                  src={categoryIcons[project?.filterTags]}
                  className="w-4 h-4"
                  alt={project?.filterTags}
                />
              </div>
              <div className="text-[#3EA7E1]">{project?.filterTags}</div>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center bg-[#ffffff] border border-[#3EA7E1] rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
            >
              <path fill="#fff" d="M0 0h24v24H0z" />
              <path
                stroke="#3EA7E1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <p className="font-normal text-sm text-[#7B7D8C]">
            {project?.desc.length > 80 ? (
              <>{project?.desc.slice(0, 80)}...</>
            ) : (
              <>{project?.desc}</>
            )}
          </p>
        </div>

        <div className="bg-[#3EA7E1]/20 p-4 rounded-lg flex ">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex gap-1 items-center justify-center">
                <h2>{}</h2>
                <div className="w-2 h-2 rounded-full bg-[#12D69B]"></div>
              </div>
              <h3 className="text-[#707070] font-medium">Raised</h3>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={23}
                height={23}
                fill="none"
              >
                <path
                  fill="#ADADAD"
                  d="M21.955 12.116c0-.567-.463-1.027-1.035-1.027-.572 0-1.036.46-1.036 1.027h2.071Zm-10.977-8.83c.572 0 1.035-.46 1.035-1.027s-.463-1.027-1.035-1.027v2.054Zm6.006 8.83c0-.567-.463-1.027-1.035-1.027-.572 0-1.036.46-1.036 1.027h2.071Zm-6.006-3.902c.572 0 1.035-.46 1.035-1.026 0-.568-.463-1.027-1.035-1.027v2.053Zm5.126.073a1.02 1.02 0 0 0 0-1.452 1.042 1.042 0 0 0-1.465 0l1.465 1.452Zm-5.859 2.904a1.02 1.02 0 0 0 0 1.452c.405.401 1.06.401 1.465 0l-1.465-1.452Zm11.72-6.68.732.727a1.02 1.02 0 0 0 .25-1.05 1.033 1.033 0 0 0-.836-.693l-.147 1.017ZM18.01 8.433l-.328.975c.373.123.783.027 1.06-.248l-.732-.727Zm-3.515-3.485-.732-.726a1.02 1.02 0 0 0-.25 1.051l.982-.325Zm3.954-3.92 1.025-.145a1.03 1.03 0 0 0-.697-.83 1.042 1.042 0 0 0-1.06.249l.732.726ZM15.374 7.56l-.983.325c.103.307.346.547.655.65l.328-.975Zm3.515-3.485-1.026.145c.066.452.424.807.88.872l.146-1.017Zm.995 8.04c0 4.877-3.988 8.83-8.906 8.83V23c6.063 0 10.977-4.873 10.977-10.884h-2.07Zm-8.906 8.83c-4.92 0-8.907-3.953-8.907-8.83H0C0 18.127 4.915 23 10.978 23v-2.054Zm-8.907-8.83c0-4.877 3.988-8.83 8.907-8.83V1.232C4.915 1.232 0 6.105 0 12.116h2.071Zm12.842 0c0 2.155-1.762 3.902-3.935 3.902v2.053c3.317 0 6.006-2.666 6.006-5.955h-2.07Zm-3.935 3.902c-2.174 0-3.936-1.747-3.936-3.902H4.971c0 3.29 2.69 5.955 6.007 5.955v-2.053Zm-3.936-3.902c0-2.155 1.762-3.902 3.936-3.902V6.161c-3.318 0-6.007 2.666-6.007 5.955h2.071Zm7.597-5.28-4.394 4.355 1.465 1.452 4.394-4.356-1.465-1.452Zm6.593-3.05-3.954 3.92 1.464 1.453 3.955-3.921-1.465-1.452Zm-6.005 1.888 3.955-3.921L17.717.3l-3.954 3.92 1.464 1.453Zm3.11 1.784-2.636-.87-.655 1.947 2.636.872.655-1.949Zm-1.981-.221-.879-2.614-1.965.65.88 2.613 1.964-.65Zm1.068-6.065.44 3.05 2.05-.291-.44-3.05-2.05.291Zm1.318 3.92 3.076.436.293-2.033-3.076-.435-.293 2.033Z"
                />
              </svg>
              <h3 className="text-[#707070] font-semibold">$10,000</h3>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div>
                <h2 className="text-[#12D69B] text-xl">
                  $
                  {project
                    ? project.chainId === bscId
                      ? Math.round(project.qfRaised / 10 ** 18)
                      : Math.round(project.qfRaised / 10 ** 6)
                    : 0}
                </h2>
              </div>
              <h3 className="text-[#707070] font-medium">QF Matching</h3>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={19}
                height={21}
                fill="none"
              >
                <path
                  fill="#ADADAD"
                  d="M13.3 12.469c-1.217 0-1.803.656-3.8.656-1.998 0-2.579-.656-3.8-.656-3.147 0-5.7 2.469-5.7 5.512v1.05C0 20.118.912 21 2.036 21h14.928C18.088 21 19 20.118 19 19.031v-1.05c0-3.043-2.553-5.512-5.7-5.512Zm3.664 6.562H2.036v-1.05c0-1.952 1.645-3.544 3.664-3.544.62 0 1.624.657 3.8.657 2.193 0 3.177-.656 3.8-.656 2.019 0 3.664 1.59 3.664 3.543v1.05ZM9.5 11.813c3.372 0 6.107-2.646 6.107-5.907C15.607 2.646 12.872 0 9.5 0 6.128 0 3.393 2.646 3.393 5.906c0 3.261 2.735 5.907 6.107 5.907Zm0-9.844c2.243 0 4.071 1.768 4.071 3.937 0 2.17-1.828 3.938-4.071 3.938-2.244 0-4.071-1.768-4.071-3.938S7.256 1.97 9.5 1.97Z"
                />
              </svg>

              <h3 className="text-[#707070] font-semibold">
                +{Number(project?.noOfContributors).toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center gap-2">
            <img
              className="w-5 h-5 rounded-full object-contain"
              src={"/assets/icons/identicon.svg"}
              alt="creator"
            />
            <h2 className="text-[#ADADAD]">
              By {project?.creator?.slice(0, 8)}
            </h2>
          </div>
          <button className="bg-[#3EA7E1] rounded-md text-white py-2 px-4">
            Donate Now
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default BuidlItem;

{
  /*
<>
<Link to={`/buidls/${project?.id}/${project?.index}`}>
          <div
            className="flex items-center justify-between space-x-1 absolute bottom-1 w-full pl-4 pr-4 pb-1 pt-1"

          >
            <div className="flex items-center space-x-1">
              <img
                src="/assets/icons/identicon.svg"
                width={25}
                height={25}
                alt="avatar"
                className="rounded-2xl	"
              />
              <a
                style={{ color: "white" }}
                href={defaultEthLink[chain?.id]?.concat("", project?.id)}
                className="text-white  font-medium text-xs"
              >
                {project?.creator?.slice(0, 15)}...
              </a>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.5 3C13.5 3.82843 12.8284 4.5 12 4.5C11.1716 4.5 10.5 3.82843 10.5 3C10.5 2.17157 11.1716 1.5 12 1.5C12.8284 1.5 13.5 2.17157 13.5 3ZM15 3C15 4.65685 13.6569 6 12 6C11.1439 6 10.3716 5.64143 9.82502 5.06628L5.90408 7.24457C5.96669 7.48592 6 7.73907 6 8C6 8.26094 5.96668 8.51411 5.90407 8.75547L9.82499 10.9338C10.3716 10.3586 11.1439 10 12 10C13.6569 10 15 11.3431 15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 12.7391 9.03331 12.486 9.0959 12.2446L5.17493 10.0663C4.62836 10.6414 3.85605 11 3 11C1.34315 11 0 9.65685 0 8C0 6.34315 1.34315 5 3 5C3.85607 5 4.62838 5.35857 5.17496 5.9337L9.09591 3.7554C9.03331 3.51406 9 3.26092 9 3C9 1.34315 10.3431 0 12 0C13.6569 0 15 1.34315 15 3ZM13.5 13C13.5 13.8284 12.8284 14.5 12 14.5C11.1716 14.5 10.5 13.8284 10.5 13C10.5 12.1716 11.1716 11.5 12 11.5C12.8284 11.5 13.5 12.1716 13.5 13ZM4.5 8C4.5 8.82843 3.82843 9.5 3 9.5C2.17157 9.5 1.5 8.82843 1.5 8C1.5 7.17157 2.17157 6.5 3 6.5C3.82843 6.5 4.5 7.17157 4.5 8Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-Davy-Grey font-semibold text-sm flex items-center space-x-1 font-bold">
            <span className="font-bold text-l">{project?.title}</span>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {project?.isVerified && (
                <path
                  d="M15.2716 7.60764L14.3083 6.48848C14.1241 6.27598 13.9754 5.87931 13.9754 5.59598V4.39181C13.9754 3.64098 13.3591 3.02473 12.6083 3.02473H11.4041C11.1279 3.02473 10.7241 2.87598 10.5116 2.69181L9.39246 1.72848C8.90371 1.31056 8.10329 1.31056 7.60746 1.72848L6.49537 2.69889C6.28287 2.87598 5.87912 3.02473 5.60287 3.02473H4.37746C3.62662 3.02473 3.01037 3.64098 3.01037 4.39181V5.60306C3.01037 5.87931 2.86162 6.27598 2.68454 6.48848L1.72829 7.61473C1.31746 8.10348 1.31746 8.89681 1.72829 9.38556L2.68454 10.5118C2.86162 10.7243 3.01037 11.121 3.01037 11.3972V12.6085C3.01037 13.3593 3.62662 13.9756 4.37746 13.9756H5.60287C5.87912 13.9756 6.28287 14.1243 6.49537 14.3085L7.61454 15.2718C8.10329 15.6897 8.90371 15.6897 9.39954 15.2718L10.5187 14.3085C10.7312 14.1243 11.1279 13.9756 11.4112 13.9756H12.6154C13.3662 13.9756 13.9825 13.3593 13.9825 12.6085V11.4043C13.9825 11.1281 14.1312 10.7243 14.3154 10.5118L15.2787 9.39264C15.6895 8.90389 15.6895 8.09639 15.2716 7.60764ZM11.4466 7.16139L8.02537 10.5826C7.92621 10.6818 7.79162 10.7385 7.64996 10.7385C7.50829 10.7385 7.37371 10.6818 7.27454 10.5826L5.56037 8.86848C5.35496 8.66306 5.35496 8.32306 5.56037 8.11764C5.76579 7.91223 6.10579 7.91223 6.31121 8.11764L7.64996 9.45639L10.6958 6.41056C10.9012 6.20514 11.2412 6.20514 11.4466 6.41056C11.652 6.61598 11.652 6.95598 11.4466 7.16139Z"
                  fill="#74D12A"
                />
              )}
            </svg>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {project?.isOnQF && (
                <path
                  d="M15.2716 7.60764L14.3083 6.48848C14.1241 6.27598 13.9754 5.87931 13.9754 5.59598V4.39181C13.9754 3.64098 13.3591 3.02473 12.6083 3.02473H11.4041C11.1279 3.02473 10.7241 2.87598 10.5116 2.69181L9.39246 1.72848C8.90371 1.31056 8.10329 1.31056 7.60746 1.72848L6.49537 2.69889C6.28287 2.87598 5.87912 3.02473 5.60287 3.02473H4.37746C3.62662 3.02473 3.01037 3.64098 3.01037 4.39181V5.60306C3.01037 5.87931 2.86162 6.27598 2.68454 6.48848L1.72829 7.61473C1.31746 8.10348 1.31746 8.89681 1.72829 9.38556L2.68454 10.5118C2.86162 10.7243 3.01037 11.121 3.01037 11.3972V12.6085C3.01037 13.3593 3.62662 13.9756 4.37746 13.9756H5.60287C5.87912 13.9756 6.28287 14.1243 6.49537 14.3085L7.61454 15.2718C8.10329 15.6897 8.90371 15.6897 9.39954 15.2718L10.5187 14.3085C10.7312 14.1243 11.1279 13.9756 11.4112 13.9756H12.6154C13.3662 13.9756 13.9825 13.3593 13.9825 12.6085V11.4043C13.9825 11.1281 14.1312 10.7243 14.3154 10.5118L15.2787 9.39264C15.6895 8.90389 15.6895 8.09639 15.2716 7.60764ZM11.4466 7.16139L8.02537 10.5826C7.92621 10.6818 7.79162 10.7385 7.64996 10.7385C7.50829 10.7385 7.37371 10.6818 7.27454 10.5826L5.56037 8.86848C5.35496 8.66306 5.35496 8.32306 5.56037 8.11764C5.76579 7.91223 6.10579 7.91223 6.31121 8.11764L7.64996 9.45639L10.6958 6.41056C10.9012 6.20514 11.2412 6.20514 11.4466 6.41056C11.652 6.61598 11.652 6.95598 11.4466 7.16139Z"
                  fill="#00a4ff"
                />
              )}
            </svg>
          </h1>
        </Link>
        <div>
          <div
            className="flex items-center text-xs w-fit rounded-xl p-1 gap-0.5"
            style={{ background: "#CDEDFF" }}
          >
            <div>
              <img
                src={categoryIcons[project?.filterTags]}
                className="w-6 h-6"
                alt=""
              />
            </div>
            <div style={{ color: "#3EA7E1" }}>{project?.filterTags}</div>
          </div>
          <p className="text-Nickle font-normal text-sm mt-5 flex flex-col">
            {project?.desc?.slice(0, 100)} ...

          </p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className=" font-normal text-xs flex items-center gap-0.5">
              {!project?.isOnQF && !project?.isFinished && (
                <div
                  style={{ color: "#818283", background: "#DADFE2" }}
                  className="bg-gray-400 rounded p-0.4"
                >
                  Target $
                  {formatUnits?.(
                    project?.goalAmount === undefined ? 0 : project?.goalAmount,
                    project?.chainId == bscId ? 18 : 6
                  )}
                </div>
              )}
              {!project?.isOnQF && project?.isFinished && (
                <div
                  style={{ color: "#818283", background: "#DADFE2" }}
                  className="bg-gray-400 rounded p-0.4"
                >
                  Target Reached
                </div>
              )}
              <span className="text-Vampire-Black font-bold">
                $
                {formatUnits?.(
                  project ? project?.currentAmount : 0,
                  project?.chainId == bscId ? 18 : 6
                )}
              </span>
            </h3>
            {project?.isOnQF && (
              <h3 className=" font-normal text-xs">
                <div
                  style={{ color: "#818283", background: "#DADFE2" }}
                  className="bg-gray-400 rounded p-0.4"
                >
                  QF Matching
                </div>
              </h3>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className=" font-normal text-xs flex items-center gap-0.5"></h3>
            {project?.isOnQF && (
              <h3 className="text-emerald-400 font-bold text-xl ">
                <span className="text-emerald-400" style={{ color: "#12D69B" }}>
                  $
                  {project
                    ? project.chainId == bscId
                      ? Math.round(project.qfRaised / 10 ** 18)
                      : Math.round(project.qfRaised / 10 ** 6)
                    : 0}
                </span>
              </h3>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className=" font-normal text-xs">
            <div
              style={{ color: "#818283", background: "#DADFE2" }}
              className="bg-gray-400 rounded p-0.4"
            >
              Contributors
            </div>
            {project?.noOfContributors}
          </h3>
          <div></div>
          {!isConnected && <Account />}
          {isConnected && chain.id != project?.chainId && (
            <div
              style={{ background: "#3EA7E1" }}
              className="cursor-pointer bg-Chinese-Blue text-Pure-White rounded-lg text-xs py-0.5 px-2"
              onClick={contribute}
            >
              Contribute
            </div>
          )}
          {isConnected && chain.id == project?.chainId && (
            <>
              {!project?.isOnQF && project?.isFinished && (
                <div
                  style={{ background: "#3EA7E1" }}
                  className="cursor-pointer bg-Chinese-Blue text-Pure-White rounded-lg text-xs py-0.5 px-2"
                >
                  Contribute
                </div>
              )}
              {(project?.isOnQF || !project?.isFinished) && (
                <Link
                  style={{ background: "#3EA7E1" }}
                  to={`/buidls/${project?.id}/${project?.index}`}
                  className="bg-Chinese-Blue text-Pure-White rounded-lg text-xs py-0.5 px-2"
                >
                  {" "}
                  Contribute
                </Link>
              )}
            </>
          )}
        </div>
        </> */
}
