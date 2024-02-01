import { useState } from "react";
import { ChainContext } from "./Context";

const ContextProvider = ({ children }) => {
    const [referral, setReferral] = useState('');
    return (
        <ChainContext.Provider
            value={{
                referral,
                setReferral,
            }}
        >
            {children}
        </ChainContext.Provider>
    );
};

export default ContextProvider;