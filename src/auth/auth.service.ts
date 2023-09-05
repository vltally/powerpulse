import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = this.getJwtAccessToken(user._id);
    const refreshToken = this.getJwtRefreshToken(user._id);
    const expiresIn = +this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME');
    // return this.getNewTokens(user);
    return { accessToken, refreshToken, expiresIn };
  }

  async login(loginDto: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
    expiresIn: number;
  }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.getJwtAccessToken(user._id);
    const refreshToken = this.getJwtRefreshToken(user._id);
    const expiresIn = +this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME');

    return { accessToken, refreshToken, user, expiresIn };
  }

  public getJwtAccessToken(id: string) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    });
    return token;
  }

  public getJwtRefreshToken(id: string) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });
    return token;
  }

  async getNewTokens(
    user: User,
  ): Promise<{ access: string; refresh: string; expiresIn: number }> {
    const id = user._id;

    const access = this.getJwtAccessToken(id);
    const refresh = this.getJwtRefreshToken(id);
    const expiresIn = +this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME');

    return { access, refresh, expiresIn };
  }
}
