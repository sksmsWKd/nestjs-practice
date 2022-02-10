import {
  Body,
  Controller,
  Logger,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  private logger = new Logger('BoardsController');
  //명시, 이름은 자유
  constructor(private authService: AuthService) {}

  //localhost:3000/auth/signup
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
    //postman 에 , /auth/signup 으로 raw, json 보내볼것.
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(`User ${authCredentialDTO.username} has logged in`);
    return this.authService.signIn(authCredentialDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  //req에 user객체 넣어줌.
  test(@GetUser() user: User) {
    //req.user
    console.log('user', user);
    //req.user 가 아닌 user 라는 파라미터로 받고싶으면,
    //커스텀 데코레이터를 이용하면 됨.
    //createParamDecorator
  }
}
