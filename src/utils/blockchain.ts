import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

@Injectable()
export class BlockChain {
    
    // REMOVED

    loggingError(near: boolean, msg: any) {
        const apiName = near ? 'NEAR' : 'ETH';
        console.log('\x1b[31m%s\x1b[0m', `${apiName}-api error: ${ msg }`); 
    }
}