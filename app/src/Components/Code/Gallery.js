import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-spinners-css';
import OpenMenu from './OpenMenu'
import '../Style/Gallery.css';

function Gallery({ menuState,language, upDateMenuState, uppDateLanguage }) {
	const [ data, setData ] = useState([]);
	const [ album, setAlbum ] = useState('');

	const getData = async () => {
		const albumName = window.location.href.split('/').pop()
		const newAlbum = albumName.charAt(0).toUpperCase() + albumName.slice(1)
			await fetch(`http://localhost:3000/images/${newAlbum}`)
				.then(res => res.json())
				.then(res => setData(res))
	}
	
	useEffect(async() => {
		getData();
	},[])

  return (
	  <>
		{!menuState ?
		<div>
			{data.length === 0 ? <div className="loading"><Spinner color="white" size={200} /></div>
			:
			<div className = "wrapper">
				{data.map((item, i)=> 
					<img key={i} src={item.picture}/>
				)}
			</div>
			}
		</div>
		:
		<OpenMenu language={language} upDateMenuState={upDateMenuState} menuState={menuState} uppDateLanguage={uppDateLanguage}/>
		}
	  </>
  );
}

export default Gallery;

