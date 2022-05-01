import React, { useState, useEffect } from 'react';
import { getImages, searchImages } from './api';
import Pagination from "react-js-pagination";
import './App.css';

const App = () => {
	const [imageList, setImageList] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const [activePage, setActivePage] = useState(1);
	const [total, setTotal] = useState();

	useEffect(() => {
		const fetchData = async (page) => {
			const responseJson = await getImages(page);
			setImageList(responseJson.photos.photo);
		};

		fetchData();
	}, []);


	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const responseJson = await searchImages(searchValue);
		setImageList(responseJson.photos.photo);
	};

	const resetForm = async () => {
		const responseJson = await getImages();
		setImageList(responseJson.photos.photo);

		setSearchValue('');
	};

	const handlePageChange = async (page) => {
		const responseJson = await getImages(page);
		setImageList((currentImageList) => [
					...currentImageList,
					...responseJson.photos.photo,
				]);
				setTotal(responseJson.photos.perpage)
				setActivePage(page);
		setActivePage(page);
	  }

	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<input
					value={searchValue}
					onChange={(event) => setSearchValue(event.target.value)}
					required='required'
					placeholder='Enter a search value...'
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
			{/* <Pagination
        activePage={activePage}
        totalItemsCount={total}
        onChange={handlePageChange}
        prevPageText="Previous"
        nextPageText="Next"
        itemClass="page-item"
        linkClass="page-link"
      /> */}
		</>
	);
};

export default App;
