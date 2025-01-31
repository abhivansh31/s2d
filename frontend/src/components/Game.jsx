import { useState } from 'react'
import { ethers } from 'ethers'
import { GAME_CONTRACT_ABI } from '../../../smart_contracts/out/GameContract.sol/GameContract.json'

export default function Home() {
    const [selectedCard] = useState(null)

    // Initialize Contract
    const gameContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS_GAME
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const gameContract = new ethers.Contract(
        gameContractAddress,
        GAME_CONTRACT_ABI,
        signer
    )

    const playGame = async () => {
        try {
            const tx = await gameContract.playGame({
                value: ethers.utils.parseEther('0.001')
            })
            await tx.wait()
        } catch (error) {
            console.error('Game error:', error)
        }
    }

    return (
        <div className="outer_div">
            <div className="inner_div">
                <button
                    onClick={playGame}
                    className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
                >
                    Play Game (0.001 ETH)
                </button>

                {selectedCard && (
                    <div className="mt-8 p-4 bg-gray-800 rounded">
                        <h3 className="text-xl">Your Card: {selectedCard.name}</h3>
                        <p>Power: {selectedCard.power}</p>
                    </div>
                )}
            </div>
        </div>
    )
}