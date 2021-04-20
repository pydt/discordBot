import { Command } from "discord.js-commando";
import SeedRandom from 'seedrandom';

export class RollCommand extends Command {
    private logic = new RollLogic();

    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'dice',
            memberName: 'roll',
            description: 'Roll the dice!',
            args: [
                {
                    key: 'dice',
                    prompt: 'What type of dice to use?  (\`1d6\` = 1 6 sided die, \`6d10\` = 6 10 sided dice, \`!6d10\` = 6 10 sided dice, all rolls must be unique)',
                    type: 'string',
                },
            ],
        });
    }

    run(message, { dice }) {
        message.reply(this.logic.roll(dice));
        return null;
    }
}

export class RollLogic {
    private rng: () => number;

    constructor(seed?: string) {
        this.rng = SeedRandom(seed);
    }

    roll(dice) {
        const splitDice = dice.split('d');
        
        if (splitDice.length === 2) {
            const permutation = splitDice[0].indexOf('!') === 0;
            const numDice = parseInt(splitDice[0].replace('!', ''));
            const numSides = parseInt(splitDice[1]);

            if (!isNaN(numDice) && !isNaN(numSides)) {
                if (numDice < 1 || numSides < 2 || numDice > 25 || numSides > 1000) {
                    return `That's silly!`;
                }

                if (permutation && numSides < numDice) {
                    return `In permutation mode, you must have as many dice as sides!`;
                }

                const rolls: number[] = [];

                for (let i = 0; i < numDice; i++) {
                    rolls[i] = Math.floor(this.rng() * numSides) + 1;

                    if (permutation && rolls.indexOf(rolls[i]) !== i) {
                        i--;
                    }
                }
                
                return `You rolled ${rolls.join(', ')}`;
            }
        }

        return `I didn't understand the dice you asked for.  Try something like \`2d6\`.`;
    }
}