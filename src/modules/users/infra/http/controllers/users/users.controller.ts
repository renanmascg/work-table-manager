import { AuthenticateSessionsService } from '@modules/users/services/authenticate-sessions/authenticate-sessions.service';
import CreateUserService from '@modules/users/services/create-user/create-user.service';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('users')
export default class UsersController {
  constructor(
    private createUser: CreateUserService,
    private authenticateSession: AuthenticateSessionsService,
  ) {}

  @Post('/')
  public async setQuestions(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const user = await this.createUser.execute({ name, email, password });

      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      return res.json({ user: userWithoutPassword });
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  }

  @Post('login')
  public async login(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authResponse = await this.authenticateSession.execute({
        email,
        password,
      });

      return response.json(authResponse);
    } catch (e) {
      console.error(e);
      return response.status(e.status).json({ message: e.message });
    }
  }

  @Get('/validate-token')
  public async validateToken(@Res() res: Response): Promise<Response> {
    return res.send();
  }
}
