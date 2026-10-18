import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'
export class CreateUserDto {

    // email validation
    @IsEmail({}, { message: 'L\'email saisie est incorrect.' })
    @IsNotEmpty({ message: 'Il faut saisir un email' })
    email!: string;

    //name validation
    @IsString()
    @IsNotEmpty({ message: 'Il faut saisir un nom' })
    name!: string;

    // Mdp validation
    @IsNotEmpty()
    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
    password!: string;

    // Optional role (defaults to USER in database)
    @IsOptional()
    @IsEnum(Role, { message: 'Role invalide' })
    role?: Role;

}

// Example valid request:
// {
//   "email": "john@example.com",
//   "name": "John Doe",
//   "password": "securepass123"
// }