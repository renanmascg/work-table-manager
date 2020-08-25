import { Controller, Post } from '@nestjs/common';
import { InitializeUserService } from '@modules/gestaomesas/services/initialize-user/initialize-user.service';
import { Request, Response } from 'express';

@Controller('gestaomesas')
export class UsersController {
  constructor(private initializeUserService: InitializeUserService) {}

  @Post('/initialize-profile')
  async initializeUser(req: Request, res: Response): Promise<Response> {
    try {
      const {
        body: { identificadorGestor },
        user,
      } = req;

      await this.initializeUserService.exec({
        identificadorGestor,
        userId: user.id,
      });

      return res.json({ message: 'User initialized successfully' });
    } catch (e) {
      return res.status(e.status).json({ message: e.message });
    }
  }
}
