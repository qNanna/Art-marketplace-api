// TODO: Refactor this block
// ?: Maybe to remove
// !: Not need now

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtToken {
    private jwtTokenKey: string;
    private jwtTokenLife: string;
    private jwtRefreshTokenLife: string;

    constructor() {
        this.jwtTokenKey = process.env.JWT_TOKEN_KEY; 
        this.jwtTokenLife = process.env.JWT_TOKEN_LIFE; 
        this.jwtRefreshTokenLife = process.env.JWT_REFRESH_TOKEN_LIFE; 
    }

    jwtVerify(token: string, key: string): string | Record<string, Record<string, any>> {
        try {
          return jwt.verify(token, key);
        } catch (err) { 
          return { error: { message: err } }
        }
    } 

    jwtSign(data: any, tokenLife: string): string {
        const expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + parseInt(tokenLife));
        return jwt.sign(data, this.jwtTokenKey, { expiresIn: tokenLife });
    }

    createPairTokens(data: any): Record<string, any> {
        try {
        const token = jwt.sign(data, this.jwtTokenKey, { expiresIn: this.jwtTokenLife });
        const refreshToken = this.jwtSign(data, this.jwtRefreshTokenLife);
        return { token, refreshToken };
        } catch(error) {
            return error;
        }
    }
    
}