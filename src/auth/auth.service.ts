import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { generateToken } from 'src/utils/generateToken';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async login(loginDTD: LoginDTO) {
    const userExists = await this.prismaService.user.findFirst({
      where: {
        email: loginDTD.email,
      },
    });

    if (userExists) {
      const isValidPassword = bcrypt.compareSync(
        loginDTD.password,
        userExists.password_hash,
      );

      if (isValidPassword) {
        return {
          token: generateToken(userExists.id),
          user: {
            id: userExists.id,
            email: userExists.email,
          },
        };
      }

      return {
        message: 'invalid crendentials',
      };
    }

    return {
      message: 'user not found',
    };
  }
}
