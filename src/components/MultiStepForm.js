import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modals from "./modals";
import CongratsModalWrapper from "./modals/CongratsModalWrapper";
import LoadingModalWrapper from "./modals/LoadingModalWrapper";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { useNetwork } from "wagmi";

import CrowdFundingContractInterface from "../abi/Crowdfunding.json";

import { bscId, contractAddresses, contriTokens } from "../utils/constant";
import Loader from "./Loader";
import { parseUnits } from "viem";

const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dvwdyqvzt/image/upload";

const MultiStepForm = () => {
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [step, setStep] = useState(1);
  const [crowdFundingConf, setCrowdFundingConf] = useState({});
  const { chain, chains } = useNetwork();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    projectTarget: "",
    projectDate: "",
    website: "",
    github: "",
    twitter: "",
    isAgree: false,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (formData.isAgree) {
      setShowLoadingModal(true);
      try {
        const { hash } = await writeContract({
          mode: "recklesslyUnprepared",
          ...crowdFundingConf,
          functionName: "createProject",
          args: [
            parseInt(
              (new Date(formData.projectDate).getTime() / 1000).toFixed(0)
            ),
            parseUnits(formData.projectTarget, chain?.id === bscId ? 18 : 6),
            formData.title,
            formData.description,
            formData.website,
            formData.twitter,
            formData.github,
            formData.imageUrl,
            formData.category,
            ...contriTokens[chain?.id]?.map((crypto, index) => crypto?.address),
          ],
        });
        const data = await waitForTransaction({ hash });
        if (data.status == "success") {
          setShowLoadingModal(false);
          setShowCongratsModal(true);
        }
      } catch (e) {
        console.log(e);
      }

      setShowLoadingModal(false);
    }
  };

  useEffect(() => {
    if (
      chain != undefined &&
      chains.filter((chn) => chn.id == chain.id).length > 0
    ) {
      setCrowdFundingConf({
        address: contractAddresses[chain?.id],
        abi: CrowdFundingContractInterface,
      });
    } else navigate(-1);
  }, [chain]);

  return (
    <>
      {/* Loading Modal */}

      <Modals showModal={showLoadingModal} setShowModal={setShowLoadingModal}>
        <LoadingModalWrapper>
          {" "}
          <div className="space-y-2 pt-4 pb-10">
            <h1 className="text-Bright-Gray font-medium text-xl">
              Please wait....
            </h1>
            <h4 className="text-Bright-Gray/90 font-normal text-sm">
              Your project is being submitted.
            </h4>
          </div>
        </LoadingModalWrapper>
      </Modals>
      {/* Congrats Modal */}
      <Modals showModal={showCongratsModal} setShowModal={setShowCongratsModal}>
        <CongratsModalWrapper>
          {" "}
          <div className="space-y-2 py-10">
            <h1 className="text-Bright-Gray font-medium text-xl">
              Congratulation!
            </h1>
            <h4 className="text-Bright-Gray/90 font-normal text-sm">
              You have successfully submitted a new project.
            </h4>
          </div>
          <button
            onClick={() => {
              setShowCongratsModal(false);
              navigate("/");
            }}
            className="bg-Pure-White text-Pure-Black text-sm font-medium rounded-xl py-2 px-6"
          >
            Explore Buidls
          </button>
        </CongratsModalWrapper>
      </Modals>
      <div className="mt-4 w-full py-6 px-4 shadow-details rounded-xl flex flex-col sm-min-h ">
        <div className="flex sm:flex-row flex-col w-full items-center gap-1 sm:gap-2 md:gap-1 lg:gap-2 max-w- mx-auto">
          <div className="flex items-center gap-2  min-w-fit">
            <div
              className={`w-6 h-6 rounded-full  bg-[#00A4FF] text-white font-bold text-md flex items-center justify-center`}
            >
              <h2>1</h2>
            </div>
            <div className="flex-1">
              <h2 className={`font-semibold  text-lg text-[#323238] min-w-fit`}>
                Buidl Details
              </h2>
            </div>
          </div>
          <div
            className={` sm:flex-1 w-1.5 h-10 sm:w-auto sm:h-1.5 rounded-md ${
              step > 1 ? "bg-[#00A4FF]" : "bg-[#EFF0F6]"
            }`}
          ></div>
          <div className="flex items-center gap-2  min-w-fit">
            <div
              className={`w-6 h-6 rounded-full    font-bold text-md flex items-center justify-center ${
                step >= 2
                  ? "bg-[#00A4FF] text-white"
                  : "bg-[#E1E1E6] text-[#8D8D99]"
              }`}
            >
              <h2>2</h2>
            </div>
            <div className="flex-1">
              <h2
                className={`font-semibold  text-lg  ${
                  step >= 2 ? "text-[#323238]" : "text-[#8D8D99]"
                } min-w-fit`}
              >
                Target & Date
              </h2>
            </div>
          </div>
          <div
            className={` sm:flex-1 w-1.5 h-10 sm:w-auto sm:h-1.5 rounded-md ${
              step > 2 ? "bg-[#00A4FF]" : "bg-[#EFF0F6]"
            }`}
          ></div>

          <div className="flex items-center gap-2  min-w-fit">
            <div
              className={`w-6 h-6 rounded-full    font-bold text-md flex items-center justify-center ${
                step >= 3
                  ? "bg-[#00A4FF] text-white"
                  : "bg-[#E1E1E6] text-[#8D8D99]"
              }`}
            >
              <h2>3</h2>
            </div>
            <div className="flex-1">
              <h2
                className={`font-semibold  text-lg  ${
                  step >= 3 ? "text-[#323238]" : "text-[#8D8D99]"
                } min-w-fit`}
              >
                Social Links
              </h2>
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-5 flex-1 w-full flex flex-col">
          <div className="flex-1 w-full space-y-3">
            {step === 1 && (
              <FirstStep formData={formData} setFormData={setFormData} />
            )}
            {step === 2 && (
              <SecondStep formData={formData} setFormData={setFormData} />
            )}
            {step === 3 && (
              <ThirdStep formData={formData} setFormData={setFormData} />
            )}
          </div>
          <div
            className={`flex items-center ${
              step > 1 ? "justify-between" : "justify-end"
            }`}
          >
            {step > 1 && (
              <button
                className="bg-[#818283] rounded-md px-6 py-2.5 font-semibold text-white"
                onClick={prevStep}
              >
                BACK
              </button>
            )}
            {step === 3 ? (
              <button
                className="bg-[#00A4FF] rounded-md px-6 py-2.5 font-semibold text-white"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            ) : (
              <button
                onClick={() => {
                  nextStep();
                }}
                className="bg-[#00A4FF] rounded-md px-6 py-2.5 font-semibold text-white"
              >
                CONTINUE
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;

const FirstStep = ({ formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpload = async (e) => {
    if (e.target.files) {
      // setImage(e.target.files[0]);
      setLoading(true);
      const image = e.target.files[0];
      if (!image) return;
      const form = new FormData();
      form.append("file", image);
      form.append("upload_preset", "sjcclscl");

      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the selected image and its preview
        setImage({
          file: image,
          previewUrl: reader.result,
        });
      };

      reader.readAsDataURL(image);
      try {
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: "POST",
          body: form,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.text();
        const parsedData = JSON.parse(data);
        const cloudinaryImgUrl = parsedData.url;

        setFormData({
          ...formData,
          imageUrl: cloudinaryImgUrl,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error or set an error state
      }
    }
  };
  return (
    <>
      <Modals showModal={loading} setShowModal={setLoading}>
        <LoadingModalWrapper>
          {" "}
          <div className="space-y-2 pt-4 pb-10">
            <h1 className="text-Bright-Gray font-medium text-xl">
              Please wait....
            </h1>
            <h4 className="text-Bright-Gray/90 font-normal text-sm">
              Your project banner is being uploaded.
            </h4>
          </div>
        </LoadingModalWrapper>
      </Modals>

      <input
        placeholder="Project Title "
        value={formData.title}
        onChange={(e) => {
          setFormData({
            ...formData,
            title: e.target.value,
          });
        }}
        className="w-full bg-transparent border border-[#E1E1E6] ] placeholder-[#8D8D99] rounded-md px-4 py-2.5 outline-none focus:ring-0 focus:outline-none"
      />

      <textarea
        rows={4}
        placeholder="Project Description. Describe what you are building. "
        value={formData.description}
        onChange={(e) => {
          setFormData({ ...formData, description: e.target.value });
        }}
        className="w-full bg-transparent border border-[#E1E1E6] placeholder-[#8D8D99] rounded-md px-4 py-2.5 outline-none focus:ring-0 focus:outline-none"
      />

      <select
        className="w-full bg-transparent border border-[#E1E1E6] placeholder-[#8D8D99] rounded-md px-4 py-2.5 outline-none focus:ring-0 focus:outline-none"
        value={formData?.category}
        onChange={(e) => {
          setFormData({
            ...formData,
            category: e.target.value,
          });
        }}
      >
        <option disabled selected value="" className="text-[#8D8D99]">
          Select a category
        </option>{" "}
        <option value="popular">Hackathon</option>
        <option value="ai">AI</option>
        <option value="web3">Web3</option>
        <option value="defi">DeFi</option>
        <option value="nfts">NFTs</option>
        <option value="tools">Tools</option>
        <option value="public goods">Public goods</option>
        <option value="scholarships">Scholarships</option>
        <option value="infrastructure">Infrastructure</option>
        <option value="entertainment">Entertainment</option>
        <option value="events">Events</option>
        <option value="gamefi">GameFI</option>
      </select>

      <div className="space-y-1.5">
        <h2 className="text-[#8D8D99] text-lg">
          Upload cover image for your project
        </h2>
        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-[#3EA7E1]/20 justify-center border-2 border-dashed border-[#3EA7E1] w-full text-white rounded-md px-4 py-2 inline-flex items-center"
        >
          <div className="flex flex-col items-center justify-center py-4">
            {image ? (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={image?.previewUrl}
                alt="image"
                className="max-w-sm w-full object-contain rounded-2xl"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={104}
                height={104}
                fill="none"
              >
                <g filter="url(#a)">
                  <rect
                    width={63.776}
                    height={50.11}
                    x={12.626}
                    y={25.132}
                    fill="url(#b)"
                    rx={13.666}
                    transform="rotate(-8 12.626 25.132)"
                  />
                </g>
                <path
                  fill="url(#c)"
                  d="M27.828 29.757h64.5v50.5h-64.5z"
                  transform="rotate(8 27.828 29.757)"
                />
                <defs>
                  <linearGradient
                    id="b"
                    x1={31.023}
                    x2={81.546}
                    y1={36.093}
                    y2={58.562}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#93B8FF" />
                    <stop offset={1} stopColor="#3EA7E1" />
                  </linearGradient>
                  <pattern
                    id="c"
                    width={1}
                    height={1}
                    patternContentUnits="objectBoundingBox"
                  >
                    <use xlinkHref="#d" transform="scale(.00775 .0099)" />
                  </pattern>
                  <filter
                    id="a"
                    width={84.176}
                    height={72.545}
                    x={5.602}
                    y={9.233}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feGaussianBlur
                      in="BackgroundImageFix"
                      stdDeviation={4.555}
                    />
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur_690_2536"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur_690_2536"
                      result="shape"
                    />
                  </filter>
                  <image
                    xlinkHref="data:image/png;base64,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"
                    id="d"
                    width={129}
                    height={101}
                  />
                </defs>
              </svg>
            )}

            <h3 className="text-[#132A00]">
              Drop your image here, or{" "}
              <span className="text-[#3EA7E1] ">browse</span>
            </h3>
            <h2 className="text-[#969DB2]">1087 x 290</h2>
          </div>
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    </>
  );
};

const SecondStep = ({ formData, setFormData }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      projectDate: date,
    });
    setShowDatePicker(false);
  };

  const handleButtonClick = () => {
    setShowDatePicker(!showDatePicker);
  };
  return (
    <>
      <input
        placeholder="Enter your project target "
        value={formData?.projectTarget}
        onChange={(e) => {
          setFormData({
            ...formData,
            projectTarget: e.target.value,
          });
        }}
        className="w-full bg-transparent border border-[#E1E1E6] ] placeholder-[#8D8D99] rounded-md px-4 py-2.5 outline-none focus:ring-0 focus:outline-none"
      />
      <div className="w-full bg-transparent border border-[#E1E1E6] flex items-center justify-between placeholder-[#8D8D99] rounded-md pl-4 pr-2 py-1 outline-none focus:ring-0 focus:outline-none">
        <p>{selectedDate && selectedDate.toDateString()}</p>
        <div className="relative">
          <button
            type="button"
            className="bg-[#00A4FF] text-white px-4 py-1.5 rounded-md"
            onClick={handleButtonClick}
          >
            Choose Date
          </button>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>
      </div>
    </>
  );
};

const ThirdStep = ({ formData, setFormData }) => {
  return (
    <>
      {" "}
      <input
        disabled
        placeholder="Please enter your project social links "
        className="w-full bg-transparent border border-[#E1E1E6] ] placeholder-[#8D8D99] rounded-md px-4 py-2.5 outline-none focus:ring-0 focus:outline-none"
      />
      <div className="gap-2 w-full overflow-hidden bg-transparent border border-[#E1E1E6] flex items-center justify-between placeholder-[#8D8D99] rounded-md pr-4 pl-2 py-1 outline-none focus:ring-0 focus:outline-none">
        <div className="bg-[#00A4FF] min-w-24 sm:min-w-32 text-center text-white px-4 py-1.5 rounded-md">
          Website
        </div>
        <input
          value={formData?.website}
          onChange={(e) => {
            setFormData({
              ...formData,
              website: e.target.value,
            });
          }}
          className="bg-transparent flex-1 h-full outline-none border-none border-0 focus:outline-none"
          placeholder="https://discord.gg/project"
        />
      </div>
      <div className="gap-2 w-full overflow-hidden bg-transparent border border-[#E1E1E6] flex items-center justify-between placeholder-[#8D8D99] rounded-md pr-4 pl-2 py-1 outline-none focus:ring-0 focus:outline-none">
        <div className="bg-[#00A4FF] min-w-24 sm:min-w-32 text-center text-white px-4 py-1.5 rounded-md">
          Github
        </div>
        <input
          value={formData?.github}
          onChange={(e) => {
            setFormData({
              ...formData,
              github: e.target.value,
            });
          }}
          className="bg-transparent flex-1 h-full outline-none border-none border-0 focus:outline-none"
          placeholder="https://discord.gg/project"
        />
      </div>
      <div className="gap-2 w-full overflow-hidden bg-transparent border border-[#E1E1E6] flex items-center justify-between placeholder-[#8D8D99] rounded-md pr-4 pl-2 py-1 outline-none focus:ring-0 focus:outline-none">
        <div className="bg-[#00A4FF] min-w-24 sm:min-w-32 text-center text-white px-4 py-1.5 rounded-md">
          Twitter
        </div>
        <input
          value={formData?.twitter}
          onChange={(e) => {
            setFormData({
              ...formData,
              twitter: e.target.value,
            });
          }}
          className="bg-transparent flex-1 h-full outline-none border-none border-0 focus:outline-none"
          placeholder="https://discord.gg/project"
        />
      </div>
      <div className="relative flex items-center justify-center">
        <div className="flex h-6 items-center">
          <input
            value={formData?.isAgree}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setFormData({
                ...formData,
                isAgree: isChecked,
              });
            }}
            id="agree-to-conditions"
            name="agree-to-conditions"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="agree-to-conditions" className="text-[#818283]">
            I agree to terms of GiveStation
          </label>
        </div>
      </div>
    </>
  );
};
