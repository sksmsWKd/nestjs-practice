import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Logger } from '@nestjs/common';

//dto 는, class, 와 interface 둘다 사용 가능.
export class CreateBoardDto {
  @IsNotEmpty()
  //컨트롤러에 핸들러 레벨 파이프 사용.
  title: string;

  @IsNotEmpty()
  description: string;
}
