import { EL_EXPLOER_URL, RPC_URL, NETWORK_NAME } from '../../utils/envVars';

const { ethereum } = window as any;

export const changeToTestnet = async (chainId: number) => {
  // const metamask = ethereum;
  const metamask = (window as any).providers
  .find((item: any) => item.info.name === 'MetaMask')
  .provider;
  try {
    await metamask?.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${chainId.toString(16)}`,
          chainName: NETWORK_NAME,
          nativeCurrency: {
            name: 'Testnet Ether',
            symbol: 'DILL',
            decimals: 18,
          },
          rpcUrls: [RPC_URL],
          blockExplorerUrls: [EL_EXPLOER_URL],
        },
      ],
    });
  } catch (error) {
    console.log(error);
    await metamask?.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: `0x${chainId.toString(16)}`,
        },
      ],
    });
  }
};
