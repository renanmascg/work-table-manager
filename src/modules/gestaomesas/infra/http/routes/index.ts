import { Router } from 'express';
import BookingMesaController from '@modules/gestaomesas/controllers//BookingMesaController';
import UsersController from '@modules/gestaomesas/controllers/UsersController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated.middleware';

const bookingMesaController = new BookingMesaController();
const usersController = new UsersController();

const gestaomesasRouter = Router();

// MESAS - CREATE / CHECKIN / CHECKOUT
gestaomesasRouter.post('/create-mesa', bookingMesaController.createMesa);

gestaomesasRouter.post(
  '/checkin',
  ensureAuthenticated,
  bookingMesaController.checkin,
);

gestaomesasRouter.post(
  '/checkout',
  ensureAuthenticated,
  bookingMesaController.checkout,
);

// USERS
gestaomesasRouter.post(
  '/initialize-profile',
  ensureAuthenticated,
  usersController.initializeUser,
);

export default gestaomesasRouter;
