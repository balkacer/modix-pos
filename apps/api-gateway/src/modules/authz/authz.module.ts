import { Global, Module } from '@nestjs/common';
import { PermissionsGuard } from './guards/permissions.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthzIdentityService } from './services/authz-identity.service';

@Global()
@Module({
  providers: [AuthzIdentityService, AuthGuard, PermissionsGuard],
  exports: [AuthzIdentityService, AuthGuard, PermissionsGuard]
})
export class AuthzModule {}
