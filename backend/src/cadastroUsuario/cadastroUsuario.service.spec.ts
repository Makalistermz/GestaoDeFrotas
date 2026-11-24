import { Test, TestingModule } from '@nestjs/testing';
import { CadastroUsuarioService } from './cadastroUsuario.service';

describe('CadastroService', () => {
  let service: CadastroUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CadastroUsuarioService],
    }).compile();

    service = module.get<CadastroUsuarioService>(CadastroUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
