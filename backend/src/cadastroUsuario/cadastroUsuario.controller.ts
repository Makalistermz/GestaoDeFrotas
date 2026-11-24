import { 
    Body,
    Controller, 
    Post, 
} from '@nestjs/common';
import { CadastroUsuarioService } from './cadastroUsuario.service';
import { CadastrarUsuarioDto } from './dto/criarUsuario.dto';

@Controller('cadastro')
export class CadastroUsuarioController {
    constructor(private readonly usuariosService: CadastroUsuarioService) {}
    
    @Post()
    cadastrarUsuario(
        @Body() dados: CadastrarUsuarioDto
    ) {
        return this.usuariosService.cadastrarUsuario(
            dados
        );
    };
}
