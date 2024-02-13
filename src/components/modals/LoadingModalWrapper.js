const LoadingModalWrapper = ({ children }) => {
  return (
    <div className="relative max-w-sm w-full mx-4">
      <svg
        className="absolute -top-[1.6rem] left-1/2 right-1/2 -translate-x-1/2 object-contain -z-10"
        xmlns="http://www.w3.org/2000/svg"
        width={122}
        height={46}
      >
        <path
          fill="#00A4FF"
          fillRule="evenodd"
          d="M102.952 15.622C107.843 20.638 113.994 25 121 25a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-9.256c-8.43 0-12.645 0-12.817-.003-.908-.015.278.023-.63-.02-.171-.008 8.532.54 5.051.32-2.833-.177-4.25-.266-4.422-.274-.498-.024-.13-.012-.63-.02C98.126 45 98.4 45 98.29 45H23.3c-.115 0 .17 0 .018.002-.588.009-.168-.005-.756.025-.152.008-1.492.095-4.171.27-3.387.22 5.079-.331 4.927-.324-1.084.055.328.009-.757.025-.152.002-4.23.002-12.385.002H1a1 1 0 0 1-1-1V26a1 1 0 0 1 1-1c7.006 0 13.157-4.362 18.048-9.378C28.254 6.182 43.611 0 61 0c17.39 0 32.746 6.182 41.952 15.622Z"
          clipRule="evenodd"
        />
      </svg>
      <div className="space-y-4 sm:w-96 relative bg-gradient-to-b text-center from-Chinese-Blue to-Celestial-Blue px-4 py-5 pt-12 rounded-3xl">
        <div className="absolute w-[82px] h-[82px]  -top-5 right-1/2 left-1/2 -translate-x-1/2">
          <svg
            className=" animate-spin	"
            xmlns="http://www.w3.org/2000/svg"
            width={82}
            height={82}
            fill="none"
          >
            <path
              fill="url(#a)"
              d="M82 41c0 22.644-18.356 41-41 41S0 63.644 0 41 18.356 0 41 0s41 18.356 41 41Zm-69.216 0c0 15.583 12.633 28.216 28.216 28.216 15.583 0 28.216-12.633 28.216-28.216 0-15.583-12.633-28.215-28.216-28.215-15.583 0-28.215 12.632-28.215 28.215Z"
              opacity={0.3}
            />
            <path
              fill="url(#b)"
              d="M75.608 41c3.53 0 6.443-2.879 5.895-6.366A40.999 40.999 0 0 0 47.366.497C43.88-.05 41 2.862 41 6.392c0 3.53 2.898 6.32 6.338 7.113a28.21 28.21 0 0 1 19.73 16.697 28.21 28.21 0 0 1 1.427 4.46c.792 3.44 3.582 6.338 7.113 6.338Z"
            />
            <defs>
              <linearGradient
                id="a"
                x1={4.162}
                x2={129.278}
                y1={-8.2}
                y2={26.001}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" />
                <stop offset={1} stopColor="#3D3D40" />
                <stop offset={1} stopColor="#0841D5" />
              </linearGradient>
              <linearGradient
                id="b"
                x1={4.162}
                x2={129.278}
                y1={-8.2}
                y2={26.001}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset={0.57} stopColor="#F1FAFF" />
                <stop offset={0.795} stopColor="#087ED5" />
                <stop offset={1} stopColor="#3D3D40" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default LoadingModalWrapper;
