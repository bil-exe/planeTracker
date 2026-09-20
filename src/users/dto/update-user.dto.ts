import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//PartialType créé une copie de CreateUserDto cependant chaques champs est optionnel pour permettrre la modification de seulement une seule ressource 
export class UpdateUserDto extends PartialType(CreateUserDto) {

}
