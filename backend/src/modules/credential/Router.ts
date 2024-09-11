import express from 'express';
import CredController from './Controller';
import CredValidation from './Validation';
// import { AuthMiddleware } from '../../lib/middlewares';

class UserRouter {
  // eslint-disable-next-line no-use-before-define
  private static instance: UserRouter;

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

  static getInstance(): UserRouter {
    if (!UserRouter.instance) {
      UserRouter.instance = new UserRouter();
    }

    return UserRouter.instance;
  }

  private setupRoutes(): void {
    // Get all credentials
    this.router.get('/', this.credController.getAll);

    // Add new credential
    this.router.post('/register', CredValidation.register, this.credController.register);

    // Delete cred details by id
    this.router.delete(
      '/:userId',
      this.credController.deleteById
    );
  }
}

const routerInstance: express.Router = UserRouter.getInstance().router;
export default routerInstance;
