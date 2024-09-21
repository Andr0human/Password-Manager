import { Request, Response } from 'express';
import { SystemResponse } from '../../lib/response-handler';

import logger from '../../lib/logger';
import CredentialService from './Services';
import { ICreateRequest, ICredential } from './entities';

class CredentialController {
  private readonly credService: CredentialService;

  constructor() {
    this.credService = new CredentialService();
  }

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      // PAGINATION
      const page: number = parseInt((req.query.page as string) ?? '1', 10);
      const limit: number = parseInt((req.query.limit as string) ?? '10', 10);

      const credList: ICredential[] | null = await this.credService.getAll(
        page,
        limit,
      );
      return new SystemResponse(res, 'credentials found!', credList).ok();
    } catch (error: unknown) {
      logger.error('error in getAll API', error);

      return new SystemResponse(
        res,
        'error retrieving all credentials!',
        error,
      ).internalServerError();
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const newCredential: ICreateRequest = req.body;
      const existingCred = false;

      if (existingCred) {
        return new SystemResponse(
          res,
          'Credential already exists!',
          newCredential,
        ).conflict();
      }

      const result: ICreateRequest = await this.credService.create(newCredential);
      return new SystemResponse(res, 'new credential added!', result).created();
    } catch (error: any) {
      logger.error('error in register API', error);

      return new SystemResponse(
        res,
        'error creating new credential!',
        error.message,
      ).internalServerError();
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { credId } = req.params;
      const fields: string = '-__v';
      const cred: ICredential | null = await this.credService.getById(credId, fields);

      if (!cred) {
        return new SystemResponse(res, 'No credential found for the provided id!', {
          credId,
        }).notFound();
      }

      return new SystemResponse(res, 'Credentials found for provided id!', cred).ok();
    } catch (error: unknown) {
      logger.error('error in getById', error);

      return new SystemResponse(
        res,
        'Error retrieving credential by its id.',
        error,
      ).internalServerError();
    }
  };

  updateById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { credId } = req.params;
      const newCred: ICredential = req.body;

      await this.credService.updateById(credId, newCred);
      return new SystemResponse(
        res,
        `credential with id:${credId} updated!`,
        newCred,
      ).ok();
    } catch (error: any) {
      return new SystemResponse(
        res,
        'error updating credential!',
        error,
      ).internalServerError();
    }
  };

  deleteById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { credId } = req.params;
      await this.credService.deleteById(credId);

      logger.info(`credential with id:${credId} deleted!`);

      return new SystemResponse(res, 'Credentials deleted!', {
        credId,
      }).ok();
    } catch (error: unknown) {
      logger.error('error in deleteById API', error);

      return new SystemResponse(
        res,
        'Error deleting credential by its id!',
        error,
      ).internalServerError();
    }
  };
}

export default CredentialController;
