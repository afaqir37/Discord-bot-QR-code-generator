const { SlashCommandBuilder } = require('discord.js');
const QRCode = require('qrcode');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('qr-code')
	.setDescription('generate a QR code')
	.addStringOption(option =>
		option
			.setName('content')
			.setDescription('content of your QR code')
			.setRequired(true)),

	async execute(interaction) {
		const content = interaction.options.getString('content');
		try {
			const qrCodeDataURL = await QRCode.toDataURL(content, {
				errorCorrectionLevel: 'H'
			});

			const buffer = Buffer.from(qrCodeDataURL.split(",")[1], 'base64');

			await interaction.reply({
				files: [{
					attachment: buffer,
					name: 'qrcode.png'
				}]
			});
		} catch (error) {
			console.log(error);
			await interaction.reply('There was an error generating the QR code.');
		}
		
		
	},

}
