import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Create user - auth/new
    @Post('new')
    @HttpCode(HttpStatus.CREATED) // 201 
    register(@Body() registerDto: RegisterDto) {

        return this.authService.register(registerDto); //this normally return {user: {...}, access_token: '...'}
    }
    // LOGIN - auth/login
    @Post('login')
    @HttpCode(HttpStatus.ACCEPTED) // 202
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto); //this normally return {user: {...}, access_token: '...'}
    }
    
    
}
