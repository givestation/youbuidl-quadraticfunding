export const arbitrumId = 42161;
export const bscId = 56;
export const polygonId = 137;
export const mainnetId = 1;
export const optimismId = 10;

export const chainLogos = {
    [mainnetId]: "/assets/images/polygon.png",
    [bscId]: "/assets/images/polygon.png",
    [polygonId]: "/assets/images/polygon.png",
    [arbitrumId]: "/assets/images/arbitrum.png",
    [optimismId]: "/assets/images/oplogosmall.png"
}

export const categoryIcons = {
    "popular": "/assets/icons/popular.svg",
    "ai": "/assets/icons/icons8-ai-64.png",
    "web3": "/assets/icons/icons8-web3-64.png",
    "defi": "/assets/icons/gaming.svg",
    "nfts": "/assets/icons/icons8-nft-64.png",
    "tools": "assets/icons/icons8-tools-64.png",
    "public goods": "/assets/icons/icons8-publicgoods-47.png",
    "scholarships": "//assets/icons/icons8-scholarship-64.png",
    "infrastructure": "/assets/icons/icons8-infrastructure-64.png",
    "entertainment": "icons8-entertainment-64.png",
    "events": "/assets/icons/icons8-events-48.png",
    "gamefi": "/assets/icons/icons8-gamefi-64.png"
}

export const contractAddresses = {
    [mainnetId]: "0x1cC5Ccd855Eb55311b03734ff3A0fF67ce54b713",
    [bscId]: "0x0d6e573e58CD1Ebb1F366F4d39a9DBb6c7F29B6d",
    [polygonId]: "0x0d6e573e58CD1Ebb1F366F4d39a9DBb6c7F29B6d",
    [arbitrumId]: "0x26BCc65416366110c0A07aF49CD4C531614cf034",
    [optimismId]: "0x3E551e54B49154E78bF5Ea9A92F83aeA3B813797"
}

export const qfRoundsAddresses = {
    [mainnetId]: "0x1cC5Ccd855Eb55311b03734ff3A0fF67ce54b713",
    [bscId]: "0x5eFb24436C00938d3b7c4e1c5EBB1CD0AC99Dc0b",
    [polygonId]: "0x5eFb24436C00938d3b7c4e1c5EBB1CD0AC99Dc0b",
    [arbitrumId]: "0x789f71868a6fa58f1354e1226f807c51edbee3d6",
    [optimismId]: "0xcFB8Bf1d64bf4baE08582B5EF464E53326E5bCd4"
}

export const defaultEthLink = {
    [mainnetId]: "https://etherscan.io/address/",
    [bscId]: "https://bscscan.com/address/",
    [polygonId]: "https://polygonscan.com/address/",
    [arbitrumId]: "https://arbiscan.io/address/",
    [optimismId]: "https://optimistic.etherscan.io/address/"
}

export const subgraphURLs = {
    [bscId]: "https://api.thegraph.com/subgraphs/name/kilros0817/youbuild-bsc",
    [polygonId]: "https://api.thegraph.com/subgraphs/name/kilros0817/youbuildpolygon",
    [optimismId]: "https://api.thegraph.com/subgraphs/name/kilros0817/youbuidl-optimism",
    [arbitrumId]: "https://api.thegraph.com/subgraphs/name/kilros0817/youbuildarbitrum",
}

export const contriTokens = {
    [bscId]: [
        {
            "name": "USDT",
            "address": "0x55d398326f99059ff775485246999027b3197955"
        },
        {
            "name": "USDC",
            "address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
        }
    ],
    [polygonId]: [
        {
            "name": "USDT",
            "address": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
        },
        {
            "name": "USDC",
            "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
    ],
    [optimismId]: [
        {
            "name": "USDT",
            "address": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58"
        },
        {
            "name": "USDC",
            "address": "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"
        }
    ],
    [arbitrumId]: [
        {
            "name": "USDT",
            "address": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
        },
        {
            "name": "USDC",
            "address": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
        }
    ],
}