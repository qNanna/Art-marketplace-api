import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase-admin';
import { AuthDto } from '../../users/dto/user.dto';
import { UserService } from '../../users/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  
  use(req: Request, res: Response, next: NextFunction) {
    const authorization: string = req.headers['authorization'];
    if (!authorization) 
      return res.status(403).send('Token is required');
      
    const [, token] = authorization.split(' ');
    
    return auth().verifyIdToken(token)
    .then(async firebaseUser => {
      const { email, uid } = firebaseUser;
      let user = await this.userService.findOne({ uid });
      if (!user)
        user = await this.userService.create(new AuthDto(uid, email));
      req['user'] = user;
      return next();
    })
    .catch((error) => {
      console.log('\x1b[31m%s\x1b[0m', `AuthMiddleware error: ${ error }`); 
      return res.status(500).send({ error, reason: 'Something wrong with token!' }); 
    });
  }

}
