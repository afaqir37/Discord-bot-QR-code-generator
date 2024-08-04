const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('server')
	.setDescription('Provides informations about the server'),

	async execute(interaction) {
		await interaction.reply(`the server is ${interaction.guild.name}, and have 
			${interaction.guild.memberCount} members`);
	},
};
