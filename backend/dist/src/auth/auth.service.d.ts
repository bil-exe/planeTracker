import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.Role;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            createdAt: Date;
            UpdatedAt: Date;
            role: import("@prisma/client").$Enums.Role;
        };
        access_token: string;
    }>;
    validateUser(userId: string): Promise<{
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        favICAO: {
            id: string;
            aircraft_icao: string;
            owner_id: string;
            owner: {
                email: string;
                name: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        }[];
    } | null>;
    private generateToken;
}
