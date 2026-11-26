import { 
    Body,
    Controller, 
    HttpCode, 
    Post, 
} from '@nestjs/common';
import { CadastroUsuarioService } from './cadastroUsuario.service';
import { CadastrarUsuarioDto } from './dto/criarUsuario.dto';

@Controller('cadastro')
export class CadastroUsuarioController {
    constructor(private readonly usuariosService: CadastroUsuarioService) {}
    
    @Post()
    @HttpCode(201)
    cadastrarUsuario(
        @Body() dados: CadastrarUsuarioDto
    ) {
        return this.usuariosService.cadastrarUsuario(
            dados
        );
    };
}
