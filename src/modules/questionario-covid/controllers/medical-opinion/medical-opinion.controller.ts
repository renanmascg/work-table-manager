import { SetMedicalOpinionService } from '@modules/questionario-covid/services/set-medical-opinion/set-medical-opinion.service';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('questionario-covid')
export class MedicalOpinionController {
  constructor(private setMedicalOpinion: SetMedicalOpinionService) {}

  @Post('/medical-opinion')
  public async setOpinion(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { questionId, opinion, userStatus } = req.body;

      const user = await this.setMedicalOpinion.exec({
        questionId,
        opinion,
        userStatus,
      });

      return res.json(user);
    } catch (error) {
      return res.status(error.status).json({ err: error.message });
    }
  }
}
