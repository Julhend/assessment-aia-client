const API_URL = 'https://assessment-aia-backend.herokuapp.com/feeds-image';

export const getImages = async (perPage,page) => {
	const response = await fetch(`${API_URL}?per_page=${perPage}&page=${page}`);
	const responseJson = await response.json();

	return responseJson;
};

export const searchImages = async (searchValue,perPage,page) => {
	
	const response = await fetch(`${API_URL}?per_page=${perPage}&page=${page}&tags=${searchValue}`);
	const responseJson = await response.json();

	return responseJson;
};
