import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AlterarSenhaDto {
    @IsString()
    @IsNotEmpty()
    token!: string;
    
    @IsString()
    @MinLength(8, {
        message: "A confirmação deve possuir pelo menos 8 caracteres."
    })
    senha!: string;

    @IsString()
    @MinLength(8, {
        message: "A confirmação deve possuir pelo menos 8 caracteres."
    })
    confirmSenha!: string;
};