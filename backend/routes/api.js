import { Router } from 'express';
import { walletLogin } from '../controllers/authController.js';
import { IPFSService } from '../services/ipfsService.js';
import { getContracts } from '../utils/contracts.js';

const router = Router();

// Wallet login
router.post('/login', walletLogin);

// Get game history
router.get('/history/:address', async (req, res) => {
    const { gameContract } = getContracts();
    const ipfs = new IPFSService();

    try {
        const events = await gameContract.queryFilter('GamePlayed', 0, 'latest');
        const history = await Promise.all(events.map(async (event) => {
            const cid = event.args.ipfsHash;
            return await ipfs.getJSON(cid);
        }));

        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;