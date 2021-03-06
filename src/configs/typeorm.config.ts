import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1111',
  database: 'metacomposer-test-nestjs',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  //엔티티를 이용하여 db테이블 생성, 파일 어디있는지 설정.
};
