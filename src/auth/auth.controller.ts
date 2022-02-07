import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //localhost:3000/auth/signup
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
    //postman 에 , /auth/signup 으로 raw, json 보내볼것.
  }

  @Post('/signIn')
  signIn(@Body(ValidationPipe) authCredentialDTO: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialDTO);
  }
}
