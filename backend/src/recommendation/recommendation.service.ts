import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from 'src/bouk/entities/book.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'openai/gpt-oss-120b';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async recommend(dto: CreateRecommendationDto) {
    const books = await this.bookRepository.find({
      where: { id: In(dto.bookIds) },
      relations: { category: true },
    });

    if (books.length === 0) {
      throw new NotFoundException(
        "Aucun des livres sélectionnés n'a été trouvé.",
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException(
        "La clé GROQ_API_KEY n'est pas configurée côté serveur. " +
          'Ajoute-la dans le fichier .env du backend (voir .env.example).',
      );
    }
    const model = process.env.GROQ_MODEL || DEFAULT_MODEL;

    const prompt = this.buildPrompt(books);
    const recommendation = await this.askGroq(prompt, apiKey, model);

    return {
      recommendation,
      basedOn: books.map((b) => ({ id: b.id, name: b.name, author: b.author })),
    };
  }

  private buildPrompt(books: Book[]): string {
    const titres = books
      .map(
        (b) =>
          `- ${b.name} (${b.author})` +
          (b.category ? ` — catégorie : ${b.category.name}` : ''),
      )
      .join('\n');

    const categories = Array.from(
      new Set(books.filter((b) => b.category).map((b) => b.category.name)),
    ).join(', ');

    return `Voici l'historique de lecture d'un utilisateur :
${titres}

Catégories qu'il semble aimer, déduites de son historique : ${categories || 'non déterminées'}

Recommande-lui 3 nouveaux livres (différents de ceux listés ci-dessus) qu'il devrait aimer.
Pour chacun, donne le titre, l'auteur, et une phrase expliquant pourquoi il devrait lui plaire.
Réponds en français, sous forme de liste claire.`;
  }

  private async askGroq(
    prompt: string,
    apiKey: string,
    model: string,
  ): Promise<string> {
    let response: Response;
    try {
      response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Impossible de contacter l'API Groq : ${(error as Error).message}`,
      );
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new InternalServerErrorException(
        `Erreur de l'API Groq (${response.status}) : ${errorBody}`,
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new InternalServerErrorException("Réponse vide de l'API Groq.");
    }

    return content;
  }
}
