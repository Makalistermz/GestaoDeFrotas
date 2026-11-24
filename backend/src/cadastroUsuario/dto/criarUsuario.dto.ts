import { 
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString, 
    Max,
    MinLength
} from "class-validator";
import { IsCPF } from 'cpf-cnpj-validator/class-validator'

export class CadastrarUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsCPF()
    cpf!: string;

    @IsString()
    @IsNotEmpty()
    telefone!: string;

    @IsEmail()
    email!: string;

    @IsInt()
    @Max(20)
    matricula?: number;

    @IsString()
    @MinLength(8)
    senha!: string;
}