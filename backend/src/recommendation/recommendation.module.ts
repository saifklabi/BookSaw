import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/bouk/entities/book.entity';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
