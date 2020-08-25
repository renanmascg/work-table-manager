import { BookRefeitorioMesaService } from '@modules/refeitorio/services/book-refeitorio-mesa/book-refeitorio-mesa.service';
import { CheckoutRefeitorioService } from '@modules/refeitorio/services/checkout/checkout.service';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('refeitorio')
export class RefeitorioController {
  constructor(
    private bookRefeitorioService: BookRefeitorioMesaService,
    private checkoutRefeitorioService: CheckoutRefeitorioService,
  ) {}

  @Post('/checkin')
  public async checkin(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const {
        body: { mesa, andar },
        user: { id },
      } = req;

      await this.bookRefeitorioService.exec({ mesa, andar, userId: id });

      return res.json({
        message: 'Checkin no refeitorio realizado com sucesso',
      });
    } catch (e) {
      console.error(e);
      return res.status(e.status).json({ message: e.message });
    }
  }

  @Get('/checkout')
  public async checkout(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { user } = req;

      await this.checkoutRefeitorioService.exec(user.id);

      return res.json({ message: 'Checkout successfully.' });
    } catch (e) {
      console.error(e);
      return res.status(e.status).json({ message: e.message });
    }
  }
}
