import fs from 'node:fs';
import path from 'node:path';
import { Reactions } from './storage';
import { GuildMember } from 'discord.js';

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

export function isValidEmoji(emoji: string): boolean {
    const rx = /^<a?:.+?:\d{19}>$|^\p{Extended_Pictographic}|\p{Emoji_Presentation}$/u;
    return rx.test(emoji.trim());
}

export function memberHasQueridometroRole(member: GuildMember): boolean {
    const roles = member.roles;

    if (!roles.cache.some(role => role.name === "queridometro")) {
        return true;
    }

    return false;
}
