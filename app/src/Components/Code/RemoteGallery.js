import React, { useState, useEffect } from 'react';
import AddImageRemote from './AddImageRemote';
import { imageName } from '../../Helper/imageName'
import axios from 'axios';
import '../Style/RemoteGallery.css'

function RemoteGallery ({gallery, updateRender, updateAuthenticate}) {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState('Loading');
    const [ file, setFile ] = useState(null);
    const [ oldImage, setOldImage ] = useState('');
    const [progress, setProgess] = useState(0);
    const [ lastimageName, setLastImageName ] = useState('');

    const getData = async () => {
        await fetch (`http://localhost:3000/images/${gallery}`)
            .then(res => res.json())
            .then(res => setData(res) || setLastImageName((res[res.length-1].name)))
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

    const goBack = () => {
        updateRender('MyWork');
        updateAuthenticate(true);
    } 

    const postData = () => {
        if ( file !== null ) {
            postFileNewImage()
        }
    }
    useEffect(() => {
        getData()
    },[])

    console.log(lastimageName);

    return (
        <div className="wrapper-remote">
            {progress !== 0 && progress !== '100%' ?
                <div className="progress-bar" style={{width: '100%', height:'20px', backgroundColor: '#ddd'}} >
                <div style={{ width: progress, height:"20px", backgroundColor:'green'}}>
                    <p style={{color:'white' , textAlign:'center'}}>{progress}</p>
                </div>
            </div>
            :
            null
            }
            <div className="remote-header">
                <input type="submit" value="Back" onClick={goBack} />
                <AddImageRemote lastimageName={lastimageName}/>
            </div>
            <div className="remote-gallery-wrapper">
            {data.map((item, i) => 
                <div key={i}  className="gallery-remote">
                    <h4>{item.title}</h4>
                        <img value={item.title} src={item.picture} />
                    <input type="file" name={item.name} onChange={handelChange} />
                    <input type="submit" value="Change" onClick={postData}/>
                    
                </div> 
                ) }
            </div>
            
        </div>
    )
}
export default RemoteGallery;