import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRole } from '../../users/dto/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  private _role: string[];

  constructor(role: string[]) {
    this._role = role;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request['user'].role;

    if (role == UserRole.SuperAdmin) return true;
    return this._role.some(element => element == UserRole[role]);
  }
}