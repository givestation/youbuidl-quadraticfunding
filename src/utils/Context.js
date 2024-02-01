import { createContext, useContext } from "react";

export const ChainContext = createContext();

export const useChainContext = () => useContext(ChainContext);