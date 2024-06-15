import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(8000),
  PASSWORD_SALT: z.coerce.number().optional().default(10),
  JWT_AT_SECRET: z.coerce.string().default('jwt_ac_secret'),
  JWT_RT_SECRET: z.coerce.string().default('jwt_rt_secret'),
  JWT_AT_EXPIRES_IN: z.coerce.string().optional().default('5m'),
  JWT_RT_EXPIRES_IN: z.coerce.string().optional().default('1h'),
  FRONT_ORIGIN: z.coerce.string().optional().default('http://localhost:3000'),
});
export type Env = z.infer<typeof envSchema>;
