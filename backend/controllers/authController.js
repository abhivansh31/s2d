import jwt from 'jsonwebtoken';

export const walletLogin = async (req, res) => {
    const { address, signature } = req.body;

    try {
        // Verify signature (simplified example)
        const token = jwt.sign({ address }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};