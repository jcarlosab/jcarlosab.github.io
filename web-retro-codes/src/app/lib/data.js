import { promises as fs } from 'fs';
import path from 'path';

export async function fetchGameData() {
    const jsonPath = path.join(process.cwd(), 'public', 'game_codes', 'index.json');
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    return JSON.parse(fileContents);
}
