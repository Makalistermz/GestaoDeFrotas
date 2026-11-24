import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CadastroUsuarioModule } from './cadastroUsuario/cadastroUsuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule, 
    AuthModule, 
    UsersModule, CadastroUsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
