import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { AuthzIdentityService } from '../services/authz-identity.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authzIdentityService: AuthzIdentityService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    if (!authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    const accessToken = authorizationHeader.replace('Bearer ', '').trim();
    const userId = this.authzIdentityService.parseMockToken(accessToken);

    if (!userId) {
      throw new UnauthorizedException('Invalid access token');
    }

    const user = this.authzIdentityService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found for access token');
    }

    request.user = user;

    return true;
  }
}
