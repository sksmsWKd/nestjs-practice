import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
    //05:18:40~ 지정된 사용자만 접근가능하게 하기.
  },
);
