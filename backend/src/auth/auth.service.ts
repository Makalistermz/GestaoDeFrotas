import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { 
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private users: UsersService,
        private jwt: JwtService,
    ) {}

    async login(dto: LoginDto) {
        const user = await this.users.encontrarPorEmailOuMatricula(dto.login);

        if (!user) {
            throw new UnauthorizedException('E-mail ou matrícula incorretos');
        }

        if (!(await bcrypt.compare(dto.senha, user.senha))) {
            throw new UnauthorizedException('Senha inválida');
        }

        const payload = { sub: user.id, tipo: user.tipo_usuario };
        return { access_token: await this.jwt.signAsync(payload) };
    }
}
