// export const arbitrumId = 42161;
// export const bscId = 56;
// export const polygonId = 137;
// export const mainnetId = 1;
// export const optimismId = 10;

export const arbitrumId = 42161;
export const bscId = 97;
export const polygonId = 80001;
export const mainnetId = 1;
export const optimismId = 10;


export const contractAddresses = {
    [mainnetId]: "0x1cC5Ccd855Eb55311b03734ff3A0fF67ce54b713",
    [bscId]: "0xabc3C864E5fBdcF2B03fBC1833E17D730f5105fa",
    [polygonId]: "0x5b5C90327bE2279c281A2375fa923A4b8ED08CD7",
    [arbitrumId]: "0x0FE6Aff847e18853ddC0fC02a8e2F7c867585916",
    [optimismId]: "0xBBD52136eFB864692554996aaB7D52c2c8f43520"
}

export const qfRoundsAddresses = {
    [mainnetId]: "0x1cC5Ccd855Eb55311b03734ff3A0fF67ce54b713",
    [bscId]: "0x455bC1eC9B9C8540D9a4f2283DFE5f51ac47843A",
    [polygonId]: "0xc65b38c537390eA9758171ac77BAD490A14d1D05",
    [arbitrumId]: "0x0FE6Aff847e18853ddC0fC02a8e2F7c867585916",
    [optimismId]: "0xBBD52136eFB864692554996aaB7D52c2c8f43520"
}

export const subgraphURLs = {
    [bscId]: "https://api.thegraph.com/subgraphs/name/kilros0817/youbuild-bsc",
    [polygonId]: "https://api.thegraph.com/subgraphs/name/kilros0817/youbuildpolygon",
}

export const contriTokens = {
    [bscId]: [
        {
            "name": "USDT",
            "address": "0xeB5062f050F7d0a74Ce8b1C683f2b3759961A3a1"
        },
        {
            "name": "USDC",
            "address": "0x5B63A80555819503e346676095EdFDDd1a73685e"
        }
    ],
    [polygonId]: [
        {
            "name": "USDT",
            "address": "0x0034690c00c9f7F37A3447DD98e26D4fBC83a42c"
        },
        {
            "name": "USDC",
            "address": "0x423C367F42272B7645824AEB19B8206931D0fec0"
        }
    ],

}