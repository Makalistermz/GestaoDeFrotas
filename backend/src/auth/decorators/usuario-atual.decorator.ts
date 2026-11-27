import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UsuarioAtual = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        context.switchToHttp().getRequest().usuario,
);