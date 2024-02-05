import { Link } from 'react-router-dom';
import { useNetwork, useAccount, mainnet } from 'wagmi';
import { formatUnits } from 'viem';
import Account from './Account';
import { useSwitchNetwork } from 'wagmi'
import { bscId, categoryIcons, defaultEthLink, mainnetId, polygonId } from '../utils/constant';

const BuidlItem = ({ project, tag }) => {
  const { isConnected } = useAccount();

  const { chain } = useNetwork()

  const isRevealed = true;
  const isVerified = true;

  // const { data: isRevealed } = useContractRead({
  //   ...projectContractConfig,
  //   functionName: 'isRevealed',
  // });


  const { switchNetwork, } = useSwitchNetwork();

  const contribute = () => {
    if (chain.id != project?.chainId) {
      switchNetwork(project?.chainId)
    } else {

    }
  }

  return (
    (tag === project?.filterTags || tag === 'popular') && isRevealed ?
      <div className='rounded-3xl bg-Ghost-White shadow-details overflow-hidden pb-1'>

        <div className="relative">
          <img className='w-full object-cover  h-48' src={project?.projectCoverUrl} alt='code' />
          <div className='flex items-center justify-between space-x-1 absolute bottom-1 w-full pl-4 pr-4 pb-1 pt-1' style={{ background: "rgba(0, 0, 0, 0.56)" }}>

            <div className="flex items-center space-x-1">
              <img src='/assets/icons/identicon.svg' width={25} height={25} alt='avatar' className='rounded-2xl	' />
              <a
                style={{ color: "white" }}
                href={defaultEthLink[chain?.id]?.concat("", project?.id)}
                className='text-white  font-medium text-xs'
              >
                {project?.creator?.slice(0, 15)}...
              </a>

            </div>


            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3C13.5 3.82843 12.8284 4.5 12 4.5C11.1716 4.5 10.5 3.82843 10.5 3C10.5 2.17157 11.1716 1.5 12 1.5C12.8284 1.5 13.5 2.17157 13.5 3ZM15 3C15 4.65685 13.6569 6 12 6C11.1439 6 10.3716 5.64143 9.82502 5.06628L5.90408 7.24457C5.96669 7.48592 6 7.73907 6 8C6 8.26094 5.96668 8.51411 5.90407 8.75547L9.82499 10.9338C10.3716 10.3586 11.1439 10 12 10C13.6569 10 15 11.3431 15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 12.7391 9.03331 12.486 9.0959 12.2446L5.17493 10.0663C4.62836 10.6414 3.85605 11 3 11C1.34315 11 0 9.65685 0 8C0 6.34315 1.34315 5 3 5C3.85607 5 4.62838 5.35857 5.17496 5.9337L9.09591 3.7554C9.03331 3.51406 9 3.26092 9 3C9 1.34315 10.3431 0 12 0C13.6569 0 15 1.34315 15 3ZM13.5 13C13.5 13.8284 12.8284 14.5 12 14.5C11.1716 14.5 10.5 13.8284 10.5 13C10.5 12.1716 11.1716 11.5 12 11.5C12.8284 11.5 13.5 12.1716 13.5 13ZM4.5 8C4.5 8.82843 3.82843 9.5 3 9.5C2.17157 9.5 1.5 8.82843 1.5 8C1.5 7.17157 2.17157 6.5 3 6.5C3.82843 6.5 4.5 7.17157 4.5 8Z" fill="white" />
              </svg>
            </div>



          </div>
        </div>


        <div className='p-3 space-y-2'>
          <Link to={`/buidls/${project?.id}/${project?.index}`}>
            <h1 className='text-Davy-Grey font-semibold text-sm flex items-center space-x-1 font-bold'>
              <span className="font-bold text-l">{project?.title}</span>
              <svg
                width='17'
                height='17'
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                {project?.isVerified &&
                  <path
                    d='M15.2716 7.60764L14.3083 6.48848C14.1241 6.27598 13.9754 5.87931 13.9754 5.59598V4.39181C13.9754 3.64098 13.3591 3.02473 12.6083 3.02473H11.4041C11.1279 3.02473 10.7241 2.87598 10.5116 2.69181L9.39246 1.72848C8.90371 1.31056 8.10329 1.31056 7.60746 1.72848L6.49537 2.69889C6.28287 2.87598 5.87912 3.02473 5.60287 3.02473H4.37746C3.62662 3.02473 3.01037 3.64098 3.01037 4.39181V5.60306C3.01037 5.87931 2.86162 6.27598 2.68454 6.48848L1.72829 7.61473C1.31746 8.10348 1.31746 8.89681 1.72829 9.38556L2.68454 10.5118C2.86162 10.7243 3.01037 11.121 3.01037 11.3972V12.6085C3.01037 13.3593 3.62662 13.9756 4.37746 13.9756H5.60287C5.87912 13.9756 6.28287 14.1243 6.49537 14.3085L7.61454 15.2718C8.10329 15.6897 8.90371 15.6897 9.39954 15.2718L10.5187 14.3085C10.7312 14.1243 11.1279 13.9756 11.4112 13.9756H12.6154C13.3662 13.9756 13.9825 13.3593 13.9825 12.6085V11.4043C13.9825 11.1281 14.1312 10.7243 14.3154 10.5118L15.2787 9.39264C15.6895 8.90389 15.6895 8.09639 15.2716 7.60764ZM11.4466 7.16139L8.02537 10.5826C7.92621 10.6818 7.79162 10.7385 7.64996 10.7385C7.50829 10.7385 7.37371 10.6818 7.27454 10.5826L5.56037 8.86848C5.35496 8.66306 5.35496 8.32306 5.56037 8.11764C5.76579 7.91223 6.10579 7.91223 6.31121 8.11764L7.64996 9.45639L10.6958 6.41056C10.9012 6.20514 11.2412 6.20514 11.4466 6.41056C11.652 6.61598 11.652 6.95598 11.4466 7.16139Z'
                    fill='#74D12A'
                  />
                }

              </svg>
              <svg
                width='17'
                height='17'
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                {project?.isOnQF &&
                  <path
                    d='M15.2716 7.60764L14.3083 6.48848C14.1241 6.27598 13.9754 5.87931 13.9754 5.59598V4.39181C13.9754 3.64098 13.3591 3.02473 12.6083 3.02473H11.4041C11.1279 3.02473 10.7241 2.87598 10.5116 2.69181L9.39246 1.72848C8.90371 1.31056 8.10329 1.31056 7.60746 1.72848L6.49537 2.69889C6.28287 2.87598 5.87912 3.02473 5.60287 3.02473H4.37746C3.62662 3.02473 3.01037 3.64098 3.01037 4.39181V5.60306C3.01037 5.87931 2.86162 6.27598 2.68454 6.48848L1.72829 7.61473C1.31746 8.10348 1.31746 8.89681 1.72829 9.38556L2.68454 10.5118C2.86162 10.7243 3.01037 11.121 3.01037 11.3972V12.6085C3.01037 13.3593 3.62662 13.9756 4.37746 13.9756H5.60287C5.87912 13.9756 6.28287 14.1243 6.49537 14.3085L7.61454 15.2718C8.10329 15.6897 8.90371 15.6897 9.39954 15.2718L10.5187 14.3085C10.7312 14.1243 11.1279 13.9756 11.4112 13.9756H12.6154C13.3662 13.9756 13.9825 13.3593 13.9825 12.6085V11.4043C13.9825 11.1281 14.1312 10.7243 14.3154 10.5118L15.2787 9.39264C15.6895 8.90389 15.6895 8.09639 15.2716 7.60764ZM11.4466 7.16139L8.02537 10.5826C7.92621 10.6818 7.79162 10.7385 7.64996 10.7385C7.50829 10.7385 7.37371 10.6818 7.27454 10.5826L5.56037 8.86848C5.35496 8.66306 5.35496 8.32306 5.56037 8.11764C5.76579 7.91223 6.10579 7.91223 6.31121 8.11764L7.64996 9.45639L10.6958 6.41056C10.9012 6.20514 11.2412 6.20514 11.4466 6.41056C11.652 6.61598 11.652 6.95598 11.4466 7.16139Z'
                    fill='#00a4ff'
                  />
                }

              </svg>
            </h1>
          </Link>
          <div>
            <div className="flex items-center text-xs w-fit rounded-xl p-1 gap-0.5" style={{ background: "#CDEDFF" }}>
              <div><img src={categoryIcons[project?.filterTags]} className="w-6 h-6" alt="" /></div>
              <div style={{ color: "#3EA7E1" }}>{project?.filterTags}</div>
            </div>
            <p className='text-Nickle font-normal text-sm mt-5 flex flex-col'>
              {project?.desc?.slice(0, 100)} ...

              {/* {desc.length > 1000 && (
              <span className='text-Vampire-Black cursor-pointer'>
                Read more
              </span>
            )} */}
            </p>
          </div>
          <div className='space-y-1'>

            <div className='flex items-center justify-between'>
              <h3 className=' font-normal text-xs flex items-center gap-0.5'>
                {!project?.isOnQF && !project?.isFinished && (
                  <div style={{ color: "#818283", background: "#DADFE2" }} className="bg-gray-400 rounded p-0.4">Target ${formatUnits?.(project?.goalAmount === undefined ? 0 : (project?.goalAmount), (project?.chainId == bscId ? 18 : 6))}
                  </div>
                )}
                {!project?.isOnQF && project?.isFinished && (
                  <div style={{ color: "#818283", background: "#DADFE2" }} className="bg-gray-400 rounded p-0.4">Target Reached
                  </div>
                )}
                <span className='text-Vampire-Black'>
                  ${formatUnits?.(project ? (project?.currentAmount) : 0, (project?.chainId == bscId ? 18 : 6))}
                </span>
              </h3>
              {project?.isOnQF && (
                <h3 className=' font-normal text-xs'>
                  <div style={{ color: "#818283", background: "#DADFE2" }} className="bg-gray-400 rounded p-0.4">QF Matching</div>
                </h3>
              )}
            </div>
          </div>
          <div className='space-y-1'>
            <div className='flex items-center justify-between'>
              <h3 className=' font-normal text-xs flex items-center gap-0.5'>
              </h3>
              {
                project?.isOnQF && (
                  <h3 className='text-emerald-400 font-bold text-xl '>
                    <span className='text-emerald-400' style={{ color: "#12D69B" }}>
                      ${(project ? (project.chainId == bscId ? Math.round(project.qfRaised / 10 ** 18) : Math.round(project.qfRaised / 10 ** 6)) : 0)}
                    </span>
                  </h3>
                )
              }
            </div>
          </div>
          <div className='flex items-center justify-between'>
          <h3 className=' font-normal text-xs'>
                  <div style={{ color: "#818283", background: "#DADFE2" }} className="bg-gray-400 rounded p-0.4">Contributors</div>{project?.noOfContributors}
                </h3>
            <div></div>
            {
              project?.isVerified && (
                <>
                  {!isConnected && (
                    <Account />
                  )}
                  {isConnected && chain.id != project?.chainId && (
                    <div style={{ background: "#3EA7E1" }} className='cursor-pointer bg-Chinese-Blue text-Pure-White rounded-lg text-xs py-0.5 px-2'
                      onClick={contribute}
                    >
                      Contribute
                    </div>
                  )}
                  {isConnected && chain.id != project?.chainId && !project?.isOnQF && project?.isFinished && (
                    <div style={{ background: "#3EA7E1" }} className='cursor-pointer bg-Chinese-Blue text-Pure-White rounded-lg text-xs py-0.5 px-2'
                    >
                      Contribute
                    </div>
                  )}
                  {isConnected && chain.id == project?.chainId && (project?.isOnQF || !project?.isFinished) && (
                    <Link
                      style={{ background: "#3EA7E1" }}
                      to={`/buidls/${project?.id}/${project?.index}`}
                      className='bg-Chinese-Blue text-Pure-White rounded-lg text-xs py-0.5 px-2'
                    >
                      {' '}
                      Contribute
                    </Link>
                  )
                  }
                </>
              )
            }
          </div>
        </div>
      </div>
      : ''
  );
};

export default BuidlItem;
