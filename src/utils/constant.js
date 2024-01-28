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
    [bscId]: "0x52b752b2Fa271488a715e2cED4B381915B2bF197",
    [polygonId]: "0x79F11073d3019aAdd2Ded941742b610EDcc65e8c",
    [arbitrumId]: "0x0FE6Aff847e18853ddC0fC02a8e2F7c867585916",
    [optimismId]: "0xBBD52136eFB864692554996aaB7D52c2c8f43520"
}

export const qfRoundsAddresses = {
    [mainnetId]: "0x1cC5Ccd855Eb55311b03734ff3A0fF67ce54b713",
    [bscId]: "0x726b812AD028d977D52acbDfB81f565f63AbD776",
    [polygonId]: "0x3C2da37A6E24402BA259c10c16211063c718D983",
    [arbitrumId]: "0x0FE6Aff847e18853ddC0fC02a8e2F7c867585916",
    [optimismId]: "0xBBD52136eFB864692554996aaB7D52c2c8f43520"
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
}

export const contriTokens = {
    [bscId]: [
        {
            "name": "USDT",
            "address": "0x11E3008c59b8A55B7525150c61b12b3Fd2415a77"
        },
        {
            "name": "USDC",
            "address": "0x5C2D5798Ba7D59C381FaED3A7A3565c0d51b81a8"
        }
    ],
    [polygonId]: [
        {
            "name": "USDT",
            "address": "0xC0447C56964CBF539B5d645C013DE488CcfC21C1"
        },
        {
            "name": "USDC",
            "address": "0xb82F2BD8cc846DFdfDa0D3D846f7EAe5d1d871cf"
        }
    ],

}