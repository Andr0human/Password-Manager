import express from 'express';
import CredController from './Controller';
import CredValidation from './Validation';
// import { AuthMiddleware } from '../../lib/middlewares';

class CredRouter {
  // eslint-disable-next-line no-use-before-define
  private static instance: CredRouter;

  public router: express.Router;

  private readonly credController: CredController;

  // private readonly authMiddleware: AuthMiddleware;

  private readonly credValidation: CredValidation;

  private constructor() {
    this.router = express.Router();
    this.credController = new CredController();
    // this.authMiddleware = new AuthMiddleware();
    this.credValidation = new CredValidation('credId');
    this.setupRoutes();
  }

  static getInstance(): CredRouter {
    if (!CredRouter.instance) {
      CredRouter.instance = new CredRouter();
    }

    return CredRouter.instance;
  }

  private setupRoutes(): void {
    // Get all credentials
    this.router.get('/', this.credController.getAll);

    // Get By Id
    this.router.get('/:credId', this.credController.getById);

    // Add new credential
    this.router.post('/create', CredValidation.register, this.credController.create);

    // Delete cred details by id
    this.router.delete(
      '/:userId',
      this.credController.deleteById,
    );
  }
}

const routerInstance: express.Router = CredRouter.getInstance().router;
export default routerInstance;
