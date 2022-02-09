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

  async getAllBoards(): Promise<Board[]> {
    const result = await this.boardRepository;
    return result;
  }
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    // const { title, description } = createBoardDto;
    // //dto 의 값들을 가져옴.
    // const board = this.boardRepository.create({
    //   //객체 생성
    //   title,
    //   description,
    //   status: BoardStatus.PUBLIC,
    // });
    // await this.boardRepository.save(board);
    // return board;

    return this.boardRepository.createBoard(createBoardDto);
    //3:21
  }
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
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`can not find ${id}`);
    }
    return found;
  }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`not found id : ${id}`);
  //   }
  //   return found;
  // }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      //영향받는 결과의 수가  0이면
      throw new NotFoundException(`can not find ${id}`);
    }
    console.log('result', result);
  }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
