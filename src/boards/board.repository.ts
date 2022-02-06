import { Module } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
//이클래스는 , board를 컨트롤하는 repository 이다.
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    //dto 의 값들을 가져옴.

    const board = this.create({
      //객체 생성
      //여기가 repository 임.
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;

    //3:21
  }
}
