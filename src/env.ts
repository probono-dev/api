import { config } from 'dotenv';
import { resolve } from 'path';

import { isEnv } from './utils';

// tslint:disable-next-line: no-bitwise
const envFileIndex = ~process.argv.indexOf('--env-file');

const envFile = envFileIndex ? process.argv[envFileIndex] : '.env';

config({ path: resolve(envFile), debug: !isEnv('production') });
