import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRespository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRespository)
    private userRespository: UserRespository,
  ) {
    super({
      secretOrKey: '아무거나',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload) {
    const { username } = payload;
    //payload 안의 username가져옴.
    const user: User = await this.userRespository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  //유효하면 실행되는 메서드, token 의 payload가 들어오게됨.
  //하지만 요청을 보낼때는 user객체가 없다. 해결책은?
}
