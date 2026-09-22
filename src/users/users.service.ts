import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  // Créer un user 
  async create(createUserDto: CreateUserDto) {
    try {
      // Verify if the user already exist
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email }
      })
      console.log('FindUnique email : ', existingUser);

      if (existingUser) {
        throw new ConflictException('This email is already taken by an another user')
      }

      // hash the password if the email is good
      const hashedPassword: string = await bcrypt.hash(createUserDto.password, 10);
      console.log('HashedPassword :', hashedPassword);

      //create the user in database 
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto, // Spread all fields
          password: hashedPassword // replace by the hashed version
        },
        select: { // only return the fiels you want to see not the password 
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

    } catch (err: any) {
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
      })
      return users;

    } catch (err: any) {

      throw new Error('Can\'t return alls users, maybe check the database connexion : ', err)
    }
    // return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      const userId: string = id;
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
          role: true
        }
      });

      return user;

    } catch (err: any) {
      
      throw new Error('Can\t display the user, maybe check if the good id is provided', err)
    }

    // return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
