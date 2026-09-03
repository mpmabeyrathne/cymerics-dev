import 'dotenv/config'
import { envSchema } from './schema.js';

const result = envSchema.safeParse(process.env);
if (!result.success) {
    console.error(result.error.format());
    process.exit(1);
}
export const ENV_CONFIG = result.data;
