import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({ 
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' }, 
    }),
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
