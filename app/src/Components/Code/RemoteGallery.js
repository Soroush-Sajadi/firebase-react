import React, { useState, useEffect, useRef, useCallback } from 'react';
import AddImageRemote from './AddImageRemote';
import DeleteImageRemote from './DeleteImageRemote';
import Back from '../../images/Logo/back.png'
import axios from 'axios';
import '../Style/RemoteGallery.css'

function RemoteGallery ({gallery, updateRender, updateAuthenticate}) {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState('Loading');
    const [ file, setFile ] = useState(null);
    const [progress, setProgess] = useState(0);
    const [ lastimageName, setLastImageName ] = useState('');
    const [ refetch, setRefetch ] = useState(false);
    const [ loadingBar,  setLoadingBar ] = useState(true);
    const [ newImageRequest, setNewImageRequest ] = useState(false)

    const [render, setRerender ] = useState(true)


    const getData = async () => {
        await fetch (`http://localhost:3000/images/${gallery}`)
            .then(res => res.json())
            .then(res => setData(res) || setLastImageName((res[res.length-1].name) ))
            
    };

    const handelChange = e => {
        setProgess(0)
        const file = (e.target.files[0]); 
        setFile(file);
    };

    const postFileNewImage = (oldImage, imageIndex) => {
        setLoadingBar(true);
        const url = 'http://localhost:3000/galleryChange';
        const formData = new FormData();
        console.log(imageIndex, oldImage)
        formData.append( 'file', file, [ oldImage, imageIndex ])
        axios.post(url, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 99) + '%';
                setProgess(progress);
            },
        })
        .then(res => res.data === 'Its done' ? setRefetch(true)|| setLoadingBar(false): null)
        
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
    };

    const goBack = () => {
        updateRender('MyWork');
        updateAuthenticate(true);
    };

    const postData = (e) => {
        if ( file !== null ) {
            console.log(e.target.getAttribute('imageName'))
            postFileNewImage(e.target.getAttribute('imageName'), e.target.getAttribute('index'))
        }
    };

    const updadateReRender = (childData) => {
        setRefetch(childData);
    }

    const updateNewImageRequest = (childData) => {
        setNewImageRequest(childData);
    }

    useEffect(() => {
        if (refetch) {
            setRefetch(false)
            getData()
        }
    })

    useEffect(() => {
        getData();
    },[])

    return (
        <div className="wrapper-remote">
            {progress !== 0 && loadingBar === true ?
                <div className="progress-bar" style={{width: '100%', height:'20px', backgroundColor: '#ddd'}} >
                <div style={{ width: progress, height:"20px", backgroundColor:'green'}}>
                    <p style={{color:'white' , textAlign:'center'}}>{progress}</p>
                </div>
            </div>
            :
            null
            }
            <div className="remote-header">
                <img src={Back} onClick={goBack} />
                <AddImageRemote lastimageName={lastimageName} updadateReRender={updadateReRender} updateNewImageRequest={updateNewImageRequest}/>
            </div>
            <div className="remote-gallery-wrapper">
            {data.map((item, i) => 
            <>
            {item !== null ? 
                <div style={!refetch && newImageRequest  ? {filter:'blur(3px)'}: null} key={i}  className="gallery-remote">
                    <img className="gallery-remote-img" src={item.picture} />
                    <DeleteImageRemote imageName={item.name} updadateReRender={updadateReRender}/>
                    <input type="file" name={item.name} onChange={handelChange} />
                    <input type="submit" imageName={item.name} index={i} value="Change" onClick={postData}/>
                </div> : null
            }
            </>
                ) }
            </div>
        </div>
    )
}
export default RemoteGallery;