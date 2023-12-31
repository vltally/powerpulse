import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignUpDto } from './dto/signup.dto';
import JwtRefreshGuard from './guards/JwtRefreshGuard.guard';
import { User } from './schemas/user.schema';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
    expiresIn: number;
  }> {
    return this.authService.login(loginDto);
  }

  @ApiSecurity('Refresh-JWT-auth')
  @UseGuards(JwtRefreshGuard)
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto, @Req() req) {
    return this.authService.getNewTokens(req.user);
  }
}
