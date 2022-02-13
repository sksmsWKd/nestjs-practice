import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Render,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidatationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
// @UseGuards(AuthGuard())

//컨트롤러 레벨로 주면 모든 핸들러가 영향을 받음
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }
  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardService.getAllBoards();
  // }
  @Get()
  getUserBoard(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.getUserBoards(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  //pipe가 존재함으로 인해 dto로 validation체크가능
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  } //create

  // @Post()
  // @UsePipes(ValidationPipe)
  // //dto 에 넣어준것들 validation 체크
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardService.createBoard(createBoardDto);
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  } //핸들러-http 메서드 데코레이터로 장식된 컨트롤러 클래스 내의 메서드.

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   //만약 param이 2개이상일때, 괄호안에 아무것도 안넣으면 됨.
  //   return this.boardService.getBoardById(id);
  // }

  @Delete()
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user);
    //이미만들어진 pipe  .  메서드로 오는 파라미터가 int로 잘 오는지?
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardService.deleteBoard(id);
  // }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidatationPipe) status: BoardStatus,
  ) {
    return this.boardService.updateBoardStatus(id, status);
  }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidatationPipe) status: BoardStatus,
  // ) {
  //   return this.boardService.updateBoardStatus(id, status);
  // }

  @Get('pay')
  pay() {
    return this.boardService.pay();
  }
}
