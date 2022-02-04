// export interface Board {
//   //interface 는 타입만 지정, 생성은 불가 이름은 대문자로

//   id: string;
//   title: string;
//   description: string;
//   status: BoardStatus;
// }

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
