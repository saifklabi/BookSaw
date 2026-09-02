import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateRecommendationDto {
  // Liste des ids des livres que l'utilisateur a déjà lus / aimés.
  // Sert d'"historique" pour construire le prompt envoyé au LLM.
  @IsArray()
  @ArrayNotEmpty({ message: 'Sélectionne au moins un livre.' })
  @IsInt({ each: true })
  bookIds: number[];
}
