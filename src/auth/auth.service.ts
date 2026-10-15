import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';  // For creating tokens
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';



@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private usersService: UsersService) { } //inject user et jwt services 

    //REGISTER create account 
    async register(registerDto: RegisterDto) {
        const user = await this.usersService.create(registerDto); // Create user (UsersService handles hashing and validation)

        //generate a token 
        const token = this.generateToken(user.id, user.email)
        return {
            user,
            access_token: token
        }

    }
    // LOGIN
    async login(loginDto: LoginDto) {

        try {
            // verify if email exist 
            const user = await this.usersService.findByEmail(loginDto.email);
            console.log('var user in login :', user);

            if (!user) {
                throw new UnauthorizedException('Email not found').getStatus();
            }

            //verify the password 
            const isPasswordValid: Boolean = await bcrypt.compare(loginDto.password, user.password); // user.password is the hash in the db

            if (!isPasswordValid) {
                console.log('Mauvais mot de passe');
                throw new UnauthorizedException('Invalid credentials').getStatus();
            }

            // give access with jwt
            const token = this.generateToken(user.id, user.email);

            // return full user with token 
            return {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    UpdatedAt: user.updatedAt,
                    role: user.role


                },
                access_token: token
            };

        } catch (err: any) {
            console.log('Problem in method login');
            throw new ExceptionsHandler(err);
        }
    }

    //VALIDATE : Check if token is valid 

    async validateUser(userId: string) {

        // Called by JWT strategy on every protected request
        return this.usersService.findOne(userId);
    }

    //function Generate token 
    private generateToken(userId: string, userEmail: string) {
        const payload = {
            sub: userId, // sub is id for jwt
            email: userEmail
        }
        
        //sign and return the token
        return this.jwtService.sign(payload);
    }

}
