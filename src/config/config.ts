import dotenv from 'dotenv';
import { ENV_KEYS } from '../constants/constants';

dotenv.config();

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env variable: ${key}`);
  return value;
}

export const config = {
  WATI_API_URL: getEnvVariable(ENV_KEYS.API_URL),
  WATI_ENV_KEY: getEnvVariable(ENV_KEYS.API_TOKEN),
  WATI_TEMPLATE_1: getEnvVariable(ENV_KEYS.TEMPLATE_1),
  ORDER_STATUS: getEnvVariable(ENV_KEYS.ORDER_STATUS),
  PORT: process.env.PORT || 3000,
};
