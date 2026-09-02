import { Body, Controller, Post } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';

@Controller('recommendation')
export class RecommendationController {
  constructor(
    private readonly recommendationService: RecommendationService,
  ) {}

  @Post()
  recommend(@Body() createRecommendationDto: CreateRecommendationDto) {
    return this.recommendationService.recommend(createRecommendationDto);
  }
}
