import 'dotenv/config';
import * as joi from 'joi';

export enum Environment {
  local = 'local',
  development = 'development',
  production = 'production',
  test = 'test',
}

export interface IEnvConfig {
  NODE_ENV: Environment;
  NODE_PORT: string;

  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_S3_BUCKET: string;
  AWS_DYNAMO_TABLE: string;
}

const validationSchemaConfig = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid(...Object.values(Environment))
      .required(),
    NODE_PORT: joi.string().required(),

    AWS_REGION: joi.string().required(),
    AWS_ACCESS_KEY_ID: joi.string().required(),
    AWS_SECRET_ACCESS_KEY: joi.string().required(),
    AWS_S3_BUCKET: joi.string().required(),
    AWS_DYNAMO_TABLE: joi.string().required(),
  })
  .unknown(true);

const { error, value } = validationSchemaConfig.validate({
  ...process.env,
});

if (error) throw new Error(`Config validation error: ${error.message}`);

export const envConfig: IEnvConfig = value;
