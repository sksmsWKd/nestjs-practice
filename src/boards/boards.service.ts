import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];
  //model 에서 생성한 타입
  //선택사항이지만 , 다른 코드 사용시 에러가 나서
  //확인하기 좋음, 가독성증가
  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

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

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);
    if (!found) {
      throw new NotFoundException(`not found id : ${id}`);
    }
    return found;
  }
  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;

    return board;
  }
}
