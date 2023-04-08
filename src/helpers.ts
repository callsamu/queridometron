import fs from 'node:fs';
import path from 'node:path';
import { Reactions } from './storage';

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

export function listReactions(reactions: Reactions): string {
    const lines: string[] = [];

    reactions.forEach((value, key) => {
        lines.push(`${key} ${value}`);
    });

    return lines.join("\n");
}
