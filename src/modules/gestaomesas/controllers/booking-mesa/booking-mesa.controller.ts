import { CheckinService } from '@modules/gestaomesas/services/checkin/checkin.service';
import { CheckoutService } from '@modules/gestaomesas/services/checkout/checkout.service';
import { CreateMesaService } from '@modules/gestaomesas/services/create-mesa/create-mesa.service';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('gestaomesas')
export class BookingMesaController {
  constructor(
    private createMesaService: CreateMesaService,
    private checkinService: CheckinService,
    private checkoutService: CheckoutService,
  ) {}

  @Post('/create-mesa')
  async createMesa(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { mesa, andar, status } = req.body;

      const newMesa = await this.createMesaService.exec({
        mesa,
        andar,
        status,
      });

      return res.json(newMesa);
    } catch (e) {
      return res.status(e.status).json({ message: e.message });
    }
  }

  @Post('/checkin')
  async checkin(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const {
        user,
        body: { mesa, andar },
      } = req;

      await this.checkinService.exec({
        mesa,
        andar,
        userId: user.id,
      });

      return res.json({ message: 'Successfully booked.' });
    } catch (e) {
      return res.status(e.status).json({ message: e.message });
    }
  }

  @Post('/checkout')
  async checkout(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const {
        user,
        body: { mesa, andar },
      } = req;

      await this.checkoutService.exec({
        mesa,
        andar,
        userId: user.id,
      });

      return res.json({ message: 'Successfully Checked Out' });
    } catch (e) {
      return res.status(e.status).json({ message: e.message });
    }
  }
}
