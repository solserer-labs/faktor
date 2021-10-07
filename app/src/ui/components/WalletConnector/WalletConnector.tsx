import { createWallet, IWalletInfo } from '@core';
import { useConnection, useWallet } from '@stores';
import React, { HTMLAttributes, useCallback, useState } from 'react';
import { WalletPicker } from './WalletPicker';

export const Button: React.FC<HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button
      className="flex items-center justify-center p-5 bg-blue-600 rounded-lg hover:bg-blue-700 text-gray-50 hover:text-white text-sm h-11 font-semibold"
      {...props}
    >
      {children}
    </button>
  );
};

export const WalletConnector = () => {
  const { disconnectWallet, connectWallet, connected } = useWallet();
  const { cluster } = useConnection();

  const [walletPickerOpen, setWalletPickerOpen] = useState(false);

  const openWalletPicker = useCallback(() => {
    setWalletPickerOpen(true);
  }, []);

  const closeWalletPicker = useCallback(() => {
    setWalletPickerOpen(false);
  }, []);

  const handleSelectWallet = (walletInfo: IWalletInfo) => {
    const selectedWallet = createWallet(walletInfo.id, cluster.id);
    connectWallet(selectedWallet);
    closeWalletPicker();
  };

  return (
    <div>
      {connected ? (
        <Button onClick={disconnectWallet}>Disconnect Wallet</Button>
      ) : (
        <Button onClick={openWalletPicker}>Connect Wallet</Button>
      )}
      {walletPickerOpen && (
        <WalletPicker onClickOutside={closeWalletPicker} onSelect={handleSelectWallet} />
      )}
    </div>
  );
};