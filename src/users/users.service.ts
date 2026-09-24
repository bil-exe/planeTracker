import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

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
          role: true,

          // iclude personnal fav of the user 
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

    } catch (err: any) {

      throw new Error('Can\t display the user, maybe check if the good id is provided', err)
    }

    // return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      // check if the user exist 
      const checkUser = await this.findOne(id);
      if (!checkUser) { throw new HttpException('User Not found or invalid, Error in method update user', HttpStatus.NOT_FOUND) };

      // if updating the password we have to hash it again 
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // add the update in the database 
      const user = await this.prisma.user.update({
        where: {
          id: id
        },
        data: updateUserDto,   // only the fields that we want to update 

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

    } catch (err: any) {
      throw new HttpException(`Can\'t update the user, check the update user method. err message : ${err}`,HttpStatus.INTERNAL_SERVER_ERROR)
    }
    // return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    try {
      const userId: string = id;
      // check if the user exist 
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
          // iclude personnal fav of the user 
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

    } catch (err: any) {
      throw new Error('Can\t delete the user, check if the id provided is good or if the database is running. Error : ', err);
    }


    // return `This action removes a #${id} user`;
  }

  // login 
   async login(mailInput: string, password:string) {
    // check if the mail provided corespond to an actual user 
    const user = await this.prisma.user.findUnique({where: {email: mailInput }});
    if (!user) {
      console.log('User Not found ')
      throw new HttpException('User Not found in the database', HttpStatus.NOT_FOUND);
    }

    // check if the password match with the hash in the db 
    const passwordCheck: boolean = await bcrypt.compare(password,user.password);
    if (passwordCheck) {
      
    }
    // return a token to the user 
   }
}
