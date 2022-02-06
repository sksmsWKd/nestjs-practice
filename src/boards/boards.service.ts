import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuid } from 'uuid';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository, //private로 선언시, controller 에서 service등록한것처럼 사용가능.
  ) {}

  // private boards: Board[] = [];
  // //model 에서 생성한 타입
  // //선택사항이지만 , 다른 코드 사용시 에러가 나서
  // //확인하기 좋음, 가독성증가
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     //uuid 모듈을 사용하여 유니크값 줌.
  //     title,
  //     //= title: title,
  //     description,
  //     //= description: description,
  //     status: BoardStatus.PRIVATE,
  //     //enum 이라 자동완성으로 나올거임
  //   };
  //   this.boards.push(board);
  //   return board;
  //   //어떤게 저장되었는지 return
  // }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`not found id : ${id}`);
  //   }
  //   return found;
  // }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    //dto 의 값들을 가져옴.

    const board = this.boardRepository.create({
      //객체 생성
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    //RETURN 값은 PROMISE 이며 , 타입은 ENTITY 를 가져와야 함. 엔티티에 컬럼 정의가 되어있다.

    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`can not find ${id}`);
    }
    return found;
  }
}
