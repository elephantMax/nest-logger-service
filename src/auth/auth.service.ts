import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto';
import { CreateUserDto, UserDTO, userDTO } from 'src/shared/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findByLogin(dto.login);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('user not found');
    }

    // TODO: generate tokens

    return isPasswordMatch;
  }

  async register(dto: CreateUserDto): Promise<UserDTO> {
    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.create({
      login: dto.login,
      name: dto.name,
      password,
    });

    return userDTO.parse(user);
  }
}
