import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { AuthenticateSessionsService } from '@modules/sessions/services/authenticate-sessions/authenticate-sessions.service';
import { Request, Response } from 'express';

@Controller('sessions')
export class SessionsController {
  constructor(private authenticateSession: AuthenticateSessionsService) {}

  @Post('login')
  public async login(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { email, senha } = request.body;

      const authResponse = await this.authenticateSession.execute({
        email,
        password: senha,
        isProd: false,
      });

      return response.json(authResponse);
    } catch (e) {
      console.error(e);
      return response.status(e.status).json({ message: e.message });
    }
  }

  @Post('login-prod')
  public async loginProd(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { email, senha } = request.body;

      const authResponse = await this.authenticateSession.execute({
        email,
        password: senha,
        isProd: true,
      });

      return response.json(authResponse);
    } catch (e) {
      return response.status(400).json({ message: e.message });
    }
  }

  @Get('/validate-token')
  public async validateToken(@Res() res: Response): Promise<Response> {
    return res.send();
  }
}
