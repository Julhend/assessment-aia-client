const API_URL = 'https://assessment-aia-backend.herokuapp.com/feeds-image';

export const getImages = async (page) => {
	const response = await fetch(`${API_URL}?per_page=20&page=${page}`);
	const responseJson = await response.json();

	return responseJson;
};

export const searchImages = async (searchValue,page) => {
	
	const response = await fetch(`${API_URL}?per_page=20&page=${page}&tags=${searchValue}`);
	const responseJson = await response.json();

	return responseJson;
};
