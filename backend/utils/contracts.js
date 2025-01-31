import { ethers } from 'ethers';
import GameContractABI from '../contracts/out/GameContract.sol/GameContract.json' assert { type: 'json' };
import AchievementContractABI from '../contracts/out/AchievementContract.sol/AchievementContract.json' assert { type: 'json' };

export const getContracts = () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

    return {
        gameContract: new ethers.Contract(
            process.env.CONTRACT_ADDRESS_GAME,
            GameContractABI.abi,
            provider
        ),
        achievementContract: new ethers.Contract(
            process.env.CONTRACT_ADDRESS_ACHIEVEMENT,
            AchievementContractABI.abi,
            provider
        )
    };
};