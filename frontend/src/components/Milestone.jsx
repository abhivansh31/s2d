import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ACHIEVEMENT_CONTRACT_ABI } from '../../../smart_contracts/out/AchievementContract.sol/AchievementContract.json';

export default function Milestones() {
    const [wins, setWins] = useState(0);
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage error messages

    // Initialize Contract
    const achievementContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS_ACHIEVEMENT;

    useEffect(() => {
        const fetchWins = async () => {
            try {
                // Check if Ethereum is available
                if (!window.ethereum) {
                    throw new Error('Ethereum provider is not available');
                }

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const achievementContract = new ethers.Contract(
                    achievementContractAddress,
                    ACHIEVEMENT_CONTRACT_ABI,
                    signer
                );

                const address = await signer.getAddress();
                const userWins = await achievementContract.wins(address);
                setWins(userWins.toNumber());
            } catch (error) {
                console.error('Error fetching wins:', error);
                setError(error.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        // Fetch wins only if the user has a selected address
        if (window.ethereum && window.ethereum.selectedAddress) {
            fetchWins();
        } else {
            setLoading(false); // Set loading to false if no address is selected
        }
    }, [achievementContractAddress]); // Dependency array includes contract address

    return (
        <div className="p-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl mb-4">Your Progress</h2>
                {loading ? (
                    <p>Loading...</p> // Show loading message
                ) : error ? (
                    <p className="text-red-500">{error}</p> // Show error message
                ) : (
                    <div className="bg-gray-800 p-6 rounded">
                        <p>Total Wins: {wins}</p>
                        <p>Current Reward Tier: {Math.floor(wins / 50)}</p>
                        <p>Next Milestone: {(Math.floor(wins / 50) + 1) * 50} wins</p>
                    </div>
                )}
            </div>
        </div>
    );
}