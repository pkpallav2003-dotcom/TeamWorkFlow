import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthLiteGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];

    if (!userId) {
      throw new UnauthorizedException('X-User-Id header missing');
    }

    if (!isUUID(userId)) {
      throw new UnauthorizedException('Invalid X-User-Id');
    }

    const user = await this.usersService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.userId = userId;
    request.user = user;

    return true;
  }
}
