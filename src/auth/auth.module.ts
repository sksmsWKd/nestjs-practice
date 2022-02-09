import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRespository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRespository]),
    //이 모듈안에 repository 를 등록하겠다.
    JwtModule.register({
      secret: '아무거나',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //passport 사용 가능.
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
  //authmodule말고 다른모듈에서 사용가능
})
export class AuthModule {}
