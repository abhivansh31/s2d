import { create } from '@infura/sdk';
import axios from 'axios';

export class IPFSService {
    constructor() {
        this.client = create({
            projectId: process.env.INFURA_PROJECT_ID,
            projectSecret: process.env.INFURA_PROJECT_SECRET,
        }).ipfs;
    }

    async uploadJSON(data) {
        const result = await this.client.addJSON(data);
        return result.cid.toString();
    }

    async getJSON(cid) {
        const response = await axios.get(`https://ipfs.infura.io/ipfs/${cid}`);
        return response.data;
    }
}