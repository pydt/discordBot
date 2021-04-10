import { CommandoClient } from "discord.js-commando";
var { owner, token } = require("./config.json");
import { RollCommand } from './commands/roll';

export class PydtBot {
  private bot: CommandoClient;

  constructor() {
    this.bot = new CommandoClient({
      commandPrefix: 'pydt',
      owner
    });

    this.bot.registry
      .registerDefaultTypes()
      .registerGroups([
        ['dice', 'Dice Roll'],
      ])
      .registerDefaultGroups()
      .registerDefaultCommands()
      .registerCommand(RollCommand);

    this.bot.on("ready", async () => {
      console.log(`${this.bot.user?.username} is online!`);
    });

    this.bot.login(token).catch(console.log);
  }
}
