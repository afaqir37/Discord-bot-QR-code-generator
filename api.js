const axios = require('axios');

const option = {
	method: 'GET',
	url: 'https://api-basketball.p.rapidapi.com/countries',
	headers: {
		'x-rapidapi-key': '2ef1f65425msh19b719f8a3af314p1ea7c8jsnee8f50fde333',
		'x-rapidapi-host': 'api-basketball.p.rapidapi.com'
	}
};

(async () => {
	try {
		const response = await axios.request(option);
		console.log(response.data);
	} catch (error) {
		console.log(error);
	}
})();


