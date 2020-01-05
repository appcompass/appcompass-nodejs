import { IsOrderQueryValidator } from 'src/auth/validators/order-query-string.validator';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';
import { DBConfigService } from '../db/db-config.service';
import { AuthConfigService } from './auth-config.service';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from './entities/role.entity';
import { UserPermission } from './entities/user-permission.entity';
import { UserRole } from './entities/user-role.entity';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { PermissionsService } from './services/permissions.service';
import { RolesService } from './services/roles.service';
import { UsersService } from './services/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSubscriber } from './subscribers/user.subscriber';
import { IsSameAsValidator } from './validators/is-same-as.validator';
import { IsEmailUsedValidator } from './validators/unique-email.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Permission,
      UserRole,
      UserPermission,
      RolePermission
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useClass: AuthConfigService
    })
  ],
  controllers: [AuthController, UsersController],
  providers: [
    JwtStrategy,
    LocalStrategy,
    AuthConfigService,
    DBConfigService,
    AuthService,
    PermissionsService,
    RolesService,
    UsersService,
    UserSubscriber,
    IsEmailUsedValidator,
    IsSameAsValidator,
    IsOrderQueryValidator
  ],
  exports: [
    TypeOrmModule,
    AuthService,
    UsersService,
    PermissionsService,
    RolesService
  ]
})
export class AuthModule {}
