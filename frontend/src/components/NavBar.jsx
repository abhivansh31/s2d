/* eslint-disable no-unused-vars */
import React, { useState } from 'react'; // Import React

export default function NavBar() {
    const [walletAddress, setWalletAddress] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                setWalletAddress(accounts[0]);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <nav>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Card Game</h1>
                <button
                    onClick={connectWallet}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                    {walletAddress ?
                        `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` :
                        'Connect Wallet'}
                </button>
            </div>
        </nav>
    );
}