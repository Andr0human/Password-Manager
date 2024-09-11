import { NextFunction, Request, Response } from 'express';
import joi, { ObjectSchema } from 'joi';
import { BaseValidation } from '../../lib/base';
import { ICredential } from './entities';

class CredValiation extends BaseValidation {
  static register = (req: Request, res: Response, next: NextFunction): void => {
    const registerValidator: ObjectSchema<ICredential> = joi.object<ICredential>({
      websiteName: joi.string().required(),
      websiteUrl: joi.string().required(),
      username: joi.string(),
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .trim()
        .required(),
      password: joi
        .string()
        .custom((value: string, helper: joi.CustomHelpers<any>) => {
          if (value.length < 8) {
            return helper.message({
              custom: 'Password must be at least 8 characters long',
            });
          }
          return value;
        })
        .required(),
    });

    CredValiation.validate(
      res,
      next,
      registerValidator,
      req.body,
      'new credential validation failed!'
    );
  };
}

export default CredValiation;
