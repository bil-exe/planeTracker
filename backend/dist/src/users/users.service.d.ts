import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
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
    findByEmail(email: string): Promise<{
        email: string;
        name: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<void>;
    remove(id: string): Promise<{
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
    }>;
}
