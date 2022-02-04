import { Module } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board)
//이클래스는 , board를 컨트롤하는 repository 이다.
export class BoardRepository extends Repository<Board> {}
