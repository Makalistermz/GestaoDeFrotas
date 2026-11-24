import { Test, TestingModule } from '@nestjs/testing';
import { CadastroUsuarioController } from './cadastroUsuario.controller';

describe('CadastroController', () => {
  let controller: CadastroUsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CadastroUsuarioController],
    }).compile();

    controller = module.get<CadastroUsuarioController>(CadastroUsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
