import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidatationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}
  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardService.getAllBoards();
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  } //create

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  } //핸들러-http 메서드 데코레이터로 장식된 컨트롤러 클래스 내의 메서드.
  // @Post()
  // @UsePipes(ValidationPipe)
  // //dto 에 넣어준것들 validation 체크
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardService.createBoard(createBoardDto);
  // }
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   //만약 param이 2개이상일때, 괄호안에 아무것도 안넣으면 됨.
  //   return this.boardService.getBoardById(id);
  // }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardService.deleteBoard(id);
  // }
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidatationPipe) status: BoardStatus,
  // ) {
  //   return this.boardService.updateBoardStatus(id, status);
  // }
}
