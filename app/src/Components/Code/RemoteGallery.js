import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-spinners-css';
import axios from 'axios';
import '../Style/RemoteGallery.css'

function RemoteGallery ({title}) {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState('Loading');
    const [ file, setFile ] = useState(null);
    const [ oldImage, setOldImage ] = useState('');
    const [progress, setProgess] = useState(0);
    const [ athenticate, setAthenticate ] = useState(false);

    const getData = async () => {
        await fetch (`http://localhost:3000/images/${title}`)
            .then(res => res.json())
            .then(res => setData(res))
    }

    const handelChange = e => {
        setProgess(0)
        const file = (e.target.files[0]); 
        setFile(file);
        setOldImage(e.target.getAttribute('name'));
    }

    const postFileNewImage = async () => {
        const url = 'http://localhost:3000/galleryChange';
        const formData = new FormData();
        formData.append( 'file', file, oldImage)
        
     
        await axios.post(url, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            },
        })
        // .then(res => {
        //     console.log(res);
        //     getFile({ name: res.newData.name,
        //              path: 'http://localhost:4500' + res.newData.path
        //            })
        // }).catch(err => console.log(err))}
        // await fetch (url, {
        //   	method: 'post',
        //   	headers: {'Content-Type':'application/json'},
        //   	body: JSON.stringify({
        //   	"oldImage": oldImage,
        //   	})
		// })
    }

    const postData = () => {
        if ( file !== null ) {
            postFileNewImage()
        }
    }
    useEffect(() => {
        getData()
    },[])

    return (
        <div className="remote-gallery-wrapper">
            {progress !== 0 && progress !== '100%' ?
                <div className="progress-bar" style={{width: '100%', height:'20px', backgroundColor: '#ddd'}} >
                <div style={{ width: progress, height:"20px", backgroundColor:'green'}}>
                    <p style={{color:'white' , textAlign:'center'}}>{progress}</p>
                </div>
            </div>
            :
            null
            }
            {data.map((item, i) => 
                <div key={i}  className="gallery-remote">
                    <h4>{item.title}</h4>
                        <img value={item.title} src={item.picture} />
                    <input type="file" name={item.name} onChange={handelChange} />
                    <input type="submit" value="Change" onClick={postData}/>
                    
                </div> 
                ) }
        </div>
    )
}
export default RemoteGallery;