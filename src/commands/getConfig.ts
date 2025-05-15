import { readFileSync } from 'fs';
import { join } from 'path';
import YAML from 'yaml';

const configPath = join(__dirname, '../../config/default.yml');
const file = readFileSync(configPath, 'utf8');
const config = YAML.parse(file);

export default config;
