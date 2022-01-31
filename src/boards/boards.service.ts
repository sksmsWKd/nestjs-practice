import { Get, Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Board, BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];
  //model 에서 생성한 타입
  //선택사항이지만 , 다른 코드 사용시 에러가 나서
  //확인하기 좋음, 가독성증가
  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, description: string) {
    const board: Board = {
      id: uuid(),
      //uuid 모듈을 사용하여 유니크값 줌.
      title,
      //= title: title,
      description,
      //= description: description,
      status: BoardStatus.PRIVATE,
      //enum 이라 자동완성으로 나올거임
    };
    this.boards.push(board);
    return board;
    //어떤게 저장되었는지 return
  }
}
