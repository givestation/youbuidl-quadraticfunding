import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  // mainnet,
  polygon,
  arbitrum,
  // zkSync,
  bsc,
  optimism,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import Layout from './components/layout';
import FundToFarm from './pages/FundToFarm';
import Dashboard from './pages/Dashboard';
import ExploreRounds from './pages/ExploreRounds';
import Rewards from './pages/Rewards';
import BuidlDetails from './pages/BuidlDetails';
import Projects from './pages/Projects';
import Bridge from './pages/Bridge';
import Contributions from './pages/Contributions';
import MintDomain from './pages/MintDomain';
import CreateProject from './pages/CreateProject';
import WithdrawRequest from './pages/WithdrawRequest';
import VoteForRequest from './pages/VoteForRequest';
import Withdraw from './pages/Withdraw';


const { chains, publicClient } = configureChains(
  // [bsc, mainnet, optimism, arbitrum,polygon,zkSync],
  [polygon, bsc, optimism, arbitrum],
  [
    // alchemyProvider({ apiKey: 'ZbcJUctTzRg0qySTHx0jmolpmxP-5V3g' }),
    publicProvider(),
  ],
  // [
  //   jsonRpcProvider({
  //     rpc: (chain) => ({
  //       https: `https://data-seed-prebsc-1-s1.binance.org:8545`,
  //     }),
  //   }),
  // ]
);

const { connectors } = getDefaultWallets({
  appName: 'youbuidl',
  projectId: 'a1dd57ddaed16cfb376bd7066679449f',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/Bridge',
        element: <Bridge />,
      },
      {
        path: '/ExploreRounds',
        element: <ExploreRounds />,
      },
      {
        path: '/buidls/:slug/:index',
        element: <BuidlDetails />,
      },
      {
        path: '/buidls/:slug/:index/withdraw-request',
        element: <WithdrawRequest />,
      },
      {
        path: '/buidls/:slug/:index/withdraw',
        element: <Withdraw />,
      },
      {
        path: '/buidls/:slug/:index/voteForWR',
        element: <VoteForRequest />,
      },
      {
        path: '/contributions',
        element: <Contributions />,
      },
      {
        path: '/rewards',
        element: <Rewards />,
      },
      {
        path: '/fund-to-farm',
        element: <FundToFarm />,
      },
      {
        path: '/create-project',
        element: <CreateProject />,
      },
      {
        path: '/mint-domain',
        element: <MintDomain />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <RouterProvider router={router} />
    </RainbowKitProvider>
  </WagmiConfig>
);
