const { REST, Routes } = require('discord.js')
const { token, clientId, guildId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandPath = path.join(foldersPath, folder)
	const files = fs.readdirSync(commandPath).filter( file => file.endsWith('.js'));

	for (const file of files) {
		const filePath = path.join(commandPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());	
		}
		else {
			console.log(`[WARNING] the command at ${filePath} is missing a data or execute property!.`);
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		
		console.log(`successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		console.log(error);	
	}
})();


















