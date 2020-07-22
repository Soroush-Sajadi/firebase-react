import React, { useState, useEffect } from 'react';
import '../Style/Gallery.css';

function Gallery({ title }) {
	const [ data, setData ] = useState([]);
	const [ loading, setLoading ] = useState('Loading');
	const [ album, setAlbum ] = useState('');

	const getData = async () => {
		// if ( JSON.parse(window.localStorage.getItem(`${title}`)) === null ) {
			await fetch(`http://localhost:3000/images`)
				.then(res => res.json())
				.then(res => setData(res))
		// }
		// getDataFromLocalStorage(`${title}`)
	}
	const getName = () => {
		const albumName = window.location.href.split('/').pop()
		const albumNew = albumName.charAt(0).toUpperCase() + albumName.slice(1)
		setAlbum(albumNew);
	}
	// const saveDataToLocalStorage = (name, data) => {
    // window.localStorage.setItem(name, JSON.stringify(data));
//   }

//   const getDataFromLocalStorage = (name) => {
    // setData(JSON.parse(window.localStorage.getItem(name)));
//   }
	useEffect(() => {
		getData();
		getName();
	},[])
	
  return (
		<>
			{data.length === 0 ? loading 
			:
			<div className = "wrapper">
				{data.map((item, i)=> 
					<img key={i} src={require(`../../images/${album}/${album}${item.id}.jpg`)}/>
				)}
			</div>
			}
		</>
  );
}

export default Gallery;

