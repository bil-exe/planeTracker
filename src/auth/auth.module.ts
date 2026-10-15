import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({

  imports: [
    UsersModule, // to use UserService
    PassportModule, // enable passport
    
    JwtModule.registerAsync({ // configuration jwt 
      inject: [ConfigService], // importer ConfigService
      global: true,

      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), //aller chercher le secret dans le .env
        signOptions: {
          expiresIn: '1h'
        }

      })

    })

  ],

  providers: [
    AuthService,
    JwtStrategy// register the strategy
  ],
  controllers: [AuthController],
  exports: [AuthService] // so other module can use it 
})

export class AuthModule { }


