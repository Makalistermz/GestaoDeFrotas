import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
    @IsString()
    @IsNotEmpty({ message: 'Informe o -mail ou matrícula' })
    login: string // e-mail ou matrícula

    @IsString()
    @IsNotEmpty({ message: 'Informe a senha' })
    senha: string
}