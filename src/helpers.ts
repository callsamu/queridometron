import fs from 'node:fs';
import path from 'node:path';

export async function importAllFromDir(dir: string, fun: (obj: any) => void) {
    const commandsPath = path.join(__dirname, dir);
    const commandFiles = fs.readdirSync(commandsPath)
        .filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        console.log(filePath);

        const obj = await import(filePath);
        fun(obj);
    }
}
