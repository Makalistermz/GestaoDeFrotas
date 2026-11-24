import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    login: string // e-mail ou matrícula

    @IsString()
    @IsNotEmpty()
    senha: string
}