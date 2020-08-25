import { Router } from 'express';

import QuestionarioCovidController from '@modules/questionarioCovid/controllers/QuestionarioCovidController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import QuestionsController from '@modules/questionarioCovid/controllers/QuestionsController';
import multer from 'multer';
import ListController from '@modules/questionarioCovid/controllers/ListController';
import MedicalOpinionController from '@modules/questionarioCovid/controllers/MedicalOpinionController';

const questionarioCovidController = new QuestionarioCovidController();
const questionsController = new QuestionsController();
const listController = new ListController();
const medicalController = new MedicalOpinionController();

const upload = multer();

const questCovidRouter = Router();

// USERS INFO
questCovidRouter.post(
	'/user-health-info',
	ensureAuthenticated,
	questionarioCovidController.getUserHealthData,
);

questCovidRouter.post(
	'/users-info',
	ensureAuthenticated,
	questionarioCovidController.allUsersInfo,
);

questCovidRouter.post(
	'/user-full-info',
	ensureAuthenticated,
	questionarioCovidController.userFullInfo,
);
// QUESTIONS
questCovidRouter.get('/questions', questionsController.getQuestions);

questCovidRouter.post(
	'/questions',
	ensureAuthenticated,
	questionsController.setQuestions,
);

// LIST
questCovidRouter.post(
	'/list',
	upload.single('lista'),
	listController.updateList,
);

// MEDICAL OPINION
questCovidRouter.post(
	'/medical-opinion',
	ensureAuthenticated,
	medicalController.setOpinion,
);

export default questCovidRouter;
