import { GetAllUsersInfoService } from '@modules/questionario-covid/services/get-all-users-info/get-all-users-info.service';
import { GetUserHealthDataService } from '@modules/questionario-covid/services/get-user-health-data/get-user-health-data.service';
import { UserFullInfoService } from '@modules/questionario-covid/services/user-full-info/user-full-info.service';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('questionario-covid')
export class QuestionarioCovidController {
  constructor(
    private getUserHealth: GetUserHealthDataService,
    private getUsersInfo: GetAllUsersInfoService,
    private userFullInfoService: UserFullInfoService,
  ) {}

  @Post('/user-health-info')
  public async getUserHealthData(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const {
        user: { id: userId },
        body: { email, name },
      } = req;

      const userObject = await this.getUserHealth.exec({
        userId,
        name,
        email,
      });

      return res.json(userObject);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Post('/users-info')
  public async allUsersInfo(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { data } = req.body;

      const usersInfo = await this.getUsersInfo.exec(data);

      return res.json(usersInfo);
    } catch (error) {
      return res.status(error.status).json({ err: error.message });
    }
  }

  @Post('/user-full-info')
  public async userFullInfo(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { userId } = req.body;

      const userFullInfo = await this.userFullInfoService.exec(userId);

      return res.json(userFullInfo);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }
}
