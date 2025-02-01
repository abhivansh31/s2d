import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import AchievementContractData from '../../../smart_contracts/out/AchievementContract.sol/AchievementContract.json';

const ACHIEVEMENT_CONTRACT_ABI = AchievementContractData.abi; // Extract the ABI from the imported JSON

export default function Milestones() {
    const [wins, setWins] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize Contract
    const achievementContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS_ACHIEVEMENT;

    useEffect(() => {
        const fetchWins = async () => {
            try {
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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (window.ethereum && window.ethereum.selectedAddress) {
            fetchWins();
        } else {
            setLoading(false);
        }
    }, [achievementContractAddress]);

    return (
        <div className="p-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl mb-4">Your Progress</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
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