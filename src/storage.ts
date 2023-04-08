import Keyv from 'keyv';

export type Reactions = Map<string, string>;

const keyv = new Keyv();

export async function getGuildReactions(id: string): Promise<Reactions> {
    const reactions: string | null = await keyv.get(id);
    if (!reactions) {
        return new Map<string, string>();
    } else {
        const obj = Object.entries(JSON.parse(reactions));
        const map = new Map<string, string>();
        obj.forEach((kv) => {
            const [key, value] = kv;
            const str = <string>value;
            map.set(key, str);
        });
        return map;
    }
}

export async function deleteGuildReaction(id: string, reaction: string) {
    const reactions = await getGuildReactions(id);
    reactions.delete(reaction);
    const json = JSON.stringify(Object.fromEntries(reactions));
    await keyv.set(id, json);
}

export async function addGuildReaction(id: string, reaction: string, subtitle: string) {
    const reactions = await getGuildReactions(id);
    reactions.set(reaction, subtitle);
    const json = JSON.stringify(Object.fromEntries(reactions));
    await keyv.set(id, json);
}
