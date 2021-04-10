import { Command } from "discord.js-commando";

export class RollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'dice',
            memberName: 'roll',
            description: 'Roll the dice!',
            args: [
                {
                    key: 'dice',
                    prompt: 'What type of dice to use?  (\`1d6\` = 1 6 sided die, \`6d10\` = 6 10 sided dice)',
                    type: 'string',
                },
            ],
        });
    }

    run(message, { dice }) {
        const splitDice = dice.split('d');
        
        if (splitDice.length === 2) {
            const numDice = parseInt(splitDice[0]);
            const numSides = parseInt(splitDice[1]);

            if (!isNaN(numDice) && !isNaN(numSides)) {
                if (numDice < 1 || numSides < 2 || numDice > 10 || numSides > 1000) {
                    message.reply(`That's silly!`);
                    return null;
                }

                const rolls = Array(numDice)
                    .fill(0)
                    .map(() => Math.floor(Math.random() * numSides) + 1);
                
                message.reply(`You rolled ${rolls.join(', ')}`);
                return null;
            }
        }

        message.reply(`I didn't understand the dice you asked for.  Try something like \`2d6\`.`);
        return null;
    }
}