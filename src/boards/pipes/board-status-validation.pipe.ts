import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class BoardStatusValidatationPipe implements PipeTransform {
  //PipeTransform 를 상속받아야 함.
  transform(value: any, metadata: ArgumentMetadata) {
    //transform 메서드를 오버라이드 해야함.

    console.log('value', value);
    console.log('metadata', metadata);
    //2:16:10
  }
}
