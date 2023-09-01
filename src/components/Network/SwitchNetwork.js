export const SwitchNetwork = ({ connected, params, connectWallet }) => {
  console.log(connected)

  if (connected) {
    _SwitchNetwork({ params })
  } else {
    connectWallet()
      .then(connected => {
        if (connected) {
          _SwitchNetwork({ params });
        }
      })
  }
};

async function _SwitchNetwork( params ) {

  try {

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: params.params.chainId }],
    });
  } catch (switchError) {
    console.log('switching-ERROR')
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [params.params],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }

}
