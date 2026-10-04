import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
// @UseGuards(JwtStrategy) // Use guard for all users routes 
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('new')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // @Param('id') extracts :id from URL
    // Example: GET /users/abc-123 → id = 'abc-123'
    return this.usersService.findOne(id);
  }

  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // Both URL parameter and request body
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  // Get current Profile users/me
  @Get('me')
  @UseGuards(JwtAuthGuard) // need to be logged in for that request 
  @HttpCode(HttpStatus.OK) // 200
  getProfile(@CurrentUser() user: any) {
    // @CurrentUser() give automatically the current user 
    // No need to decode token manually!
    return user;
  }
}
