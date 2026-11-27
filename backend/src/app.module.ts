import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { AlterarSenhaModule } from './alterar-senha/alterar-senha.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule, 
    AuthModule, 
    UsersModule,
    EmailModule, 
    AlterarSenhaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
