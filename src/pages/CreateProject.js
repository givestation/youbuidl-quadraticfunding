import { useState } from 'react';
import Modals from '../components/modals';
import CongratsModalWrapper from '../components/modals/CongratsModalWrapper';
import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork
} from 'wagmi';
import CrowdFundingContractInterface from '../contracts/abi/Crowdfunding.json';
import web3 from 'web3';
import Loader from '../components/Loader';
import addressContract from '../contracts/contant/contentContract.json'
import stableTokens from '../contracts/contant/contentStableTokens.json'
import { useNavigate} from 'react-router-dom';



const addressBnb = addressContract.addressBnb;
const addressEth = addressContract.addresseth;
const addressArbi = addressContract.addressArbi;
const addressOpti = addressContract.addressOpti;

const cryptosBNB = stableTokens.cryptosBNB;
const cryptosETH = stableTokens.cryptosETH;
const cryptosArbi = stableTokens.cryptosArbi;
const cryptosOpti = stableTokens.cryptosOpti;

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dvwdyqvzt/image/upload';

const CreateProject = () => {
  const navigate = useNavigate();

  const { chain, chains } = useNetwork()
  // Loading modal
  const [showLoadingModal, setShowLoadingModal] = useState(false);  
  // STRING
  const [projectDescription, setProjectDescription] = useState('');
  // STRING
  const [projectTitle, setProjectTitle] = useState('');
  // STRING
  const [websiteUrl, setWebsiteUrl] = useState('');
  // STRING
  const [githubUrl, setGithubUrl] = useState('');
  // STRING
  const [socialUrl, setSocialUrl] = useState('');
  // LARGE NUMBER
  const [targetContribution, setTargetContribution] = useState(0);
  // TIMESTAMP
  const [expectedLaunchDate, setExpectedLaunchDate] = useState(0);
  // Congrats Upload Picture State
  const [showUploadCongratsModal, setUploadCongratsModal] = useState(false);
  // Congrats Create Project State
  const [showProjectCongratsModal, setCreateProjectCongratsModal] = useState(true);
  // const [image, setImage] = useState(null);
  const [projectCoverUrl, setProjectCoverUrl] = useState('');
  const [tag, setTag] = useState('');

  //=========Crowdfunding Contract Config==========
  let contractConfig = {};
  if (chain === undefined){
    console.log("plz connect metamask")
  }else{
    contractConfig = {
      address: (chain?.id === 56 ? addressBnb : (chain?.id === 1 ? addressEth : (chain?.id === 10 ? addressOpti : addressArbi))),
      abi: CrowdFundingContractInterface,
    };
  }

  //==========creatProject function==========
  const {
    config: createProjectConfig,
    error: createProjectConfigError,
    isError: isCreateProjectConfigError,
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'createProject',
    args: [
      expectedLaunchDate,
      targetContribution,
      projectTitle,
      projectDescription,
      websiteUrl,
      socialUrl,
      githubUrl,
      projectCoverUrl,
      tag,
      ...(chain?.id === 56 ? cryptosBNB : (chain?.id === 1 ? cryptosETH : (chain?.id === 10 ? cryptosOpti : cryptosArbi))).map((crypto,index) => crypto?.address)
    ],
  });

  const {
    data: createProjectReturnData,
    write: createProject,
    error: createProjectError,
    isLoading,
    isSuccess
  } = useContractWrite(createProjectConfig);

//===============main functions part==========
  const handleImageUpload = (e) => {
    if (e.target.files) {
      // setImage(e.target.files[0]);
      const image = e.target.files[0];
      if (!image) return;
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'sjcclscl');

      fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log("picture uploaded success");
          setUploadCongratsModal(true);
          return response.text();
        })
        .then((data) => {
          const parsedData = JSON.parse(data);
          const cloudinaryImgUrl = parsedData.url;
          setProjectCoverUrl(cloudinaryImgUrl);
        });
    }
  };

  const onProjectDescriptionChangeHandler = (e) => {
    setProjectDescription(e.target.value);
  };
  const onProjectTitleChangeHandler = (e) => {
    setProjectTitle(e.target.value);
  };
  const onWebsiteUrlChangeHandler = (e) => {
    setWebsiteUrl(e.target.value);
  };
  const onGithubUrlChangeHandler = (e) => {
    setGithubUrl(e.target.value);
  };
  const onSocialUrlChangeHandler = (e) => {
    setSocialUrl(e.target.value);
  };

  const onTagChangeHandler = (e) => {
    setTag(e.target.value);
  };

  const onTargetContributionChange = (e) => {
    setTargetContribution(
      web3.utils.toBigInt(web3.utils.toWei(e.target.value, (chain?.id === 56 || chain?.id === 1 ? 'ether' : 'mwei')))
    );
  };

  const onExpectedLaunchDateChange = (e) => {
    setExpectedLaunchDate(parseInt((new Date(e.target.value).getTime() / 1000).toFixed(0)));
    console.log(parseInt((new Date(e.target.value).getTime() / 1000).toFixed(0)),"======================")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("args for create project",
      expectedLaunchDate,
      targetContribution,
      projectTitle,
      projectDescription,
      websiteUrl,
      socialUrl,
      githubUrl,
      projectCoverUrl,
      tag 
      );
    await createProject?.();
    
    console.log(createProjectConfigError,"!!!when you creat project, you are wrong")
  };

  const navigateToHome = () => {
    // 👇️ navigate to /contacts
    navigate('/');
  };

  return (
    <>
      {/* Congrats upload Success Modal */}
      <Modals
        showModal={showUploadCongratsModal}
        setShowModal={setUploadCongratsModal}
      >
        <CongratsModalWrapper>
          {' '}
          <div className='space-y-2 py-10'>
            <h1 className='text-Bright-Gray font-medium text-xl'>
              Congratulation!
            </h1>
            <h4 className='text-Bright-Gray/90 font-normal text-sm'>
              You have succesfully uploaded a new picture.
            </h4>
          </div>
          <button
            onClick={() => setUploadCongratsModal(false)}
            className='bg-Pure-White text-Pure-Black text-sm font-medium rounded-xl py-2 px-6'
          >
            Close
          </button>
        </CongratsModalWrapper>
      </Modals>

      {/* Congrats create project Modal */}
      {isLoading && <Loader showModal={true} setShowModal={setShowLoadingModal}/>}
      {isSuccess && 
        <Modals
          showModal={showProjectCongratsModal}
          setShowModal={setCreateProjectCongratsModal}
        >
          <CongratsModalWrapper>
            {' '}
            <div className='space-y-2 py-10'>
              <h1 className='text-Bright-Gray font-medium text-xl'>
                Congratulation!
              </h1>
              <h4 className='text-Bright-Gray/90 font-normal text-sm'>
                You have succesfully created a new project.
              </h4>
            </div>
            <button
              onClick={() => {setCreateProjectCongratsModal(false); navigateToHome();}
              }
              className='bg-Pure-White text-Pure-Black text-sm font-medium rounded-xl py-2 px-6'
            >
              Close
            </button>
          </CongratsModalWrapper>
        </Modals>
      }
      

      <div className='max-w-4xl mx-auto space-y-4 md:space-y-8 '>
        <div className='flex items-center justify-center'>
          
          <div className='flex items-center space-x-2'>
            <h1 className='text-Raisin-Black font-semibold text-lg'>
              Submit a Buidl
            </h1>
            <span className='bg-Chinese-Blue text-Pure-White px-1 sm:px-8 rounded-lg py-1 text-xs'>
              {chain?.name}
            </span>
          </div>
          
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-3 md:space-y-4 flex flex-col items-center'
        >
          <textarea
            onChange={onProjectDescriptionChangeHandler}
            className='w-full bg-Pure-White rounded-2xl p-3 outline-none shadow-details'
            rows={5}
            placeholder='Project description'
          />
          <textarea
            onChange={onProjectTitleChangeHandler}
            className='w-full bg-Pure-White rounded-2xl p-3 outline-none shadow-details'
            rows={3}
            placeholder='Project title'
          />
         
          <select style={{ width: '100%' }} onChange={onTagChangeHandler}>
            <option value=''>--Please choose a category--</option>
            <option value='popular'>Popular</option>
            <option value='ai'>AI</option>
            <option value='web3'>Web3</option>
            <option value='defi'>DeFi</option>
            <option value='nfts'>NFTs</option>
            <option value='tools'>Tools</option>
            <option value='public goods'>Public goods</option>
            <option value='scholarships'>Scholarships</option>
            <option value='infrastructure'>Infrastructure</option>
            <option value='entertainment'>Entertainment</option>
            <option value='events'>Events</option>
            <option value='gamefi'>GameFI</option>
          </select>
          <div className='flex items-center w-full flex-col sm:flex-row md:space-x-0 md:space-y-4 lg:space-y-0 lg:space-x-4 sm:space-x-4 md:flex-col lg:flex-row space-y-3 sm:space-y-0'>
            <input
              onChange={onWebsiteUrlChangeHandler}
              className='flex-1 w-full md:w-full lg-w-auto bg-Pure-White rounded-2xl p-3 outline-none shadow-details'
              rows={2}
              placeholder='Website'
            />
            <input
              onChange={onGithubUrlChangeHandler}
              className='flex-1 w-full md:w-full lg-w-auto bg-Pure-White rounded-2xl p-3 outline-none shadow-details'
              rows={2}
              placeholder='Github'
            />
            <input
              onChange={onSocialUrlChangeHandler}
              className='flex-1 w-full md:w-full lg-w-auto bg-Pure-White rounded-2xl p-3 outline-none shadow-details'
              rows={2}
              placeholder='Twitter/Telegram'
            />
          </div>
          <div className='w-full bg-Pure-White rounded-2xl p-3 shadow-details md:h-52 flex items-center justify-center'>
            <div className='max-w-xs w-full text-center'>
              <input
                className='h-0 mt-0'
                id='file_input'
                type='file'
                onChange={handleImageUpload}
              />
              <label
                htmlFor='file_input'
                className='cursor-pointer flex items-center w-full justify-center space-x-2 py-3 bg-Chinese-Blue text-Pure-White  rounded-xl'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6.71 5.70644L9 3.40586V12.9983C9 13.2635 9.10536 13.518 9.29289 13.7055C9.48043 13.8931 9.73478 13.9985 10 13.9985C10.2652 13.9985 10.5196 13.8931 10.7071 13.7055C10.8946 13.518 11 13.2635 11 12.9983V3.40586L13.29 5.70644C13.383 5.80019 13.4936 5.8746 13.6154 5.92538C13.7373 5.97616 13.868 6.00231 14 6.00231C14.132 6.00231 14.2627 5.97616 14.3846 5.92538C14.5064 5.8746 14.617 5.80019 14.71 5.70644C14.8037 5.61345 14.8781 5.50282 14.9289 5.38093C14.9797 5.25904 15.0058 5.1283 15.0058 4.99626C15.0058 4.86421 14.9797 4.73348 14.9289 4.61159C14.8781 4.4897 14.8037 4.37907 14.71 4.28608L10.71 0.285085C10.6149 0.194021 10.5028 0.122638 10.38 0.0750322C10.1365 -0.0250107 9.86346 -0.0250107 9.62 0.0750322C9.49725 0.122638 9.3851 0.194021 9.29 0.285085L5.29 4.28608C5.19676 4.37934 5.1228 4.49006 5.07234 4.61191C5.02188 4.73377 4.99591 4.86437 4.99591 4.99626C4.99591 5.12815 5.02188 5.25875 5.07234 5.3806C5.1228 5.50246 5.19676 5.61317 5.29 5.70644C5.38324 5.7997 5.49393 5.87368 5.61575 5.92415C5.73757 5.97462 5.86814 6.0006 6 6.0006C6.13186 6.0006 6.26243 5.97462 6.38425 5.92415C6.50607 5.87368 6.61676 5.7997 6.71 5.70644ZM19 9.99751C18.7348 9.99751 18.4804 10.1029 18.2929 10.2905C18.1054 10.4781 18 10.7325 18 10.9978V16.9993C18 17.2645 17.8946 17.519 17.7071 17.7065C17.5196 17.8941 17.2652 17.9995 17 17.9995H3C2.73478 17.9995 2.48043 17.8941 2.29289 17.7065C2.10536 17.519 2 17.2645 2 16.9993V10.9978C2 10.7325 1.89464 10.4781 1.70711 10.2905C1.51957 10.1029 1.26522 9.99751 1 9.99751C0.734784 9.99751 0.48043 10.1029 0.292893 10.2905C0.105357 10.4781 0 10.7325 0 10.9978V16.9993C0 17.7951 0.316071 18.5584 0.87868 19.1211C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1211C19.6839 18.5584 20 17.7951 20 16.9993V10.9978C20 10.7325 19.8946 10.4781 19.7071 10.2905C19.5196 10.1029 19.2652 9.99751 19 9.99751Z'
                    fill='white'
                  />
                </svg>
                <span>Upload Cover Image</span>
              </label>

              <h4 className='text-Davy-Grey/70 mt-2'>1087 x 290 px</h4>
            </div>
          </div>
          <div className='flex w-full items-center flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0'>
            <input
              onChange={onTargetContributionChange}
              className='flex-1 w-full sm:w-auto rounded-2xl p-3 outline-none shadow-details'
              type='number'
              placeholder='Target'
            />
            <input
              onChange={onExpectedLaunchDateChange}
              className='flex-1 w-full sm:w-auto rounded-2xl p-3 outline-none shadow-details'
              placeholder="Enter project's due date for contributions)"
            />
          </div>
          <button
            type='submit'
            className='bg-Chinese-Blue rounded-4xl text-Pure-White px-6 py-3'
          >
            Create a Buidl
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
