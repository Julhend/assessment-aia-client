import React, { useState, useEffect } from 'react';
import { getImages, searchImages } from './api';
import './App.css';


const App = () => {
	const [imageList, setImageList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const defaultPerPage = '21'
	const defaultPage = '1'

	useEffect(() => {
		const fetchData = async (perPage,page) => {
			const responseJson = await getImages(defaultPerPage,page);
			setImageList(responseJson.photos.photo);
		};

		fetchData();
	}, []);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const responseJson = await searchImages(searchValue,defaultPerPage,defaultPage);
		setImageList(responseJson.photos.photo);
	};

	const resetForm = async () => {
		const responseJson = await getImages(defaultPerPage,defaultPage);
		setImageList(responseJson.photos.photo);
		setSearchValue('');
	};

	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<label>AIA Assessment</label>
				<input
					value={searchValue}
					onChange={(event) => setSearchValue(event.target.value)}
					required='required'
					placeholder='Search ...'
				></input>
				<button type='submit'>Search</button>
				<button type='button' onClick={resetForm}>
					Clear
				</button>
			</form>
			<div className='image-grid'>
				{imageList.map((image) => (
					<img src={image.images} alt={image.id}></img>
				))}
			</div>
		</>
	);
};

export default App;
