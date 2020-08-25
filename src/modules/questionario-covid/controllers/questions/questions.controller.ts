import { SaveUserAnswerService } from '@modules/questionario-covid/services/save-user-answer/save-user-answer.service';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import covidConstants from '@shared/constants/questionario_covid';
import { Request, Response } from 'express';

@Controller('questionario-covid')
export class QuestionsController {
  constructor(private saveUserAnswer: SaveUserAnswerService) {}

  @Get('/questions')
  public getQuestions(@Req() req: Request, @Res() res: Response): Response {
    return res.json({ questions: covidConstants.QUIZ_FULL_QUESTIONS });
  }

  @Post('questions')
  public async setQuestions(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const {
        body: { userFeelingGood, questions },
        user: { id },
      } = req;

      const userObject = await this.saveUserAnswer.exec({
        userId: id,
        userFeelingGood,
        questions,
      });

      return res.json(userObject);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}
