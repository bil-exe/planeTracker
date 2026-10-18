"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: createUserDto.email }
            });
            console.log('FindUnique email : ', existingUser);
            if (existingUser) {
                throw new common_1.ConflictException('This email is already taken by an another user');
            }
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            console.log('HashedPassword :', hashedPassword);
            const user = await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: true,
                    updatedAt: true,
                    role: true
                }
            });
            return user;
        }
        catch (err) {
            throw new Error('Can\'t create the user : ', err);
        }
    }
    async findAll() {
        try {
            const users = await this.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: true,
                    updatedAt: true,
                    role: true
                }
            });
            return users;
        }
        catch (err) {
            throw new Error('Can\'t return alls users, maybe check the database connexion : ', err);
        }
    }
    async findOne(id) {
        try {
            const userId = id;
            console.log('userId : ', userId);
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: true,
                    updatedAt: true,
                    role: true,
                    favICAO: {
                        select: {
                            id: true,
                            aircraft_icao: true,
                            owner: true,
                            owner_id: true
                        }
                    }
                }
            });
            return user;
        }
        catch (err) {
            throw new Error('Can\t display the user, maybe check if the good id is provided', err);
        }
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        console.log('user from findByEmail : ', user);
        return user;
    }
    async update(id, updateUserDto) {
        try {
            const checkUser = await this.findOne(id);
            if (!checkUser) {
                throw new common_1.HttpException('User Not found or invalid, Error in method update user', common_1.HttpStatus.NOT_FOUND);
            }
            ;
            if (updateUserDto.password) {
                updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
            }
            const user = await this.prisma.user.update({
                where: {
                    id: id
                },
                data: updateUserDto,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: true,
                    updatedAt: true,
                    role: true,
                }
            });
        }
        catch (err) {
            throw new common_1.HttpException(`Can\'t update the user, check the update user method. err message : ${err}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const userId = id;
            await this.findOne(userId);
            const deletedUser = await this.prisma.user.delete({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: true,
                    updatedAt: true,
                    role: true,
                    favICAO: {
                        select: {
                            id: true,
                            aircraft_icao: true,
                            owner: true,
                            owner_id: true
                        }
                    }
                }
            });
            console.log(`user ${userId} has successfuly deleted !`);
            return deletedUser;
        }
        catch (err) {
            throw new Error('Can\t delete the user, check if the id provided is good or if the database is running. Error : ', err);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map