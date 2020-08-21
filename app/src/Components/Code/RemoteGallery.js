import React, { useState, useEffect, useRef, useCallback } from 'react';
import AddImageRemote from './AddImageRemote';
import DeleteImageRemote from './DeleteImageRemote';
import { Spinner } from 'react-spinners-css';
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
        await fetch (`https://us-central1-makan-5c9d1.cloudfunctions.net//app/images/${gallery}`)
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
        const url = 'https://us-central1-makan-5c9d1.cloudfunctions.net/app/galleryChange';
        const formData = new FormData();
        formData.append( 'file', file, [ oldImage, imageIndex ])
        axios.post(url, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            },
        })
        .then(res => res.data === 'Its done' ? setRefetch(true)|| setLoadingBar(false) : null)
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
                <div className="progress-bar-wrapper-add">
                <div className="progress-bar" style={{width: '50%', height:'30px', backgroundColor: '#ddd', left:'20px'}} >
                <div style={{ width: progress, height:"30px", backgroundColor:'#881d1d', borderRadius:'20px'}}>
                    <p style={{color:'white', fontSize:'21px'}}>{progress === '100%' ? 'Please wait...' : progress }</p>
                </div>
            </div>
            </div>
            :
            null
            }
            <div className="remote-header">
                <img src={Back} onClick={goBack} />
                <AddImageRemote lastimageName={lastimageName} updadateReRender={updadateReRender} updateNewImageRequest={updateNewImageRequest}/>
            </div>
            <div style={progress !== 0 && loadingBar === true || newImageRequest ? {position:'absolute', zIndex:'1'}: null} className="remote-gallery-wrapper">
            {data.length === 0 ? <div className="loading"><Spinner color="white" size={200} /></div> 
            :
            <>
            {data.map((item, i) => 
            <>
            {item !== null ? 
                <div style={ (progress !== 0 && loadingBar === true) || newImageRequest ? {filter:'blur(3px)'}: null} key={i} className="gallery-remote">
                    <img className="gallery-remote-img" src={item.picture} />
                    <DeleteImageRemote imageName={item.name} updadateReRender={updadateReRender}/>
                    <div className="file-wrapper">
                        <input className="file" type="file" name={item.name} onChange={handelChange} />
                        <input type="submit" imageName={item.name} index={i} value="Change" onClick={postData}/>
                    </div>
                </div> : null
            }
            </>
                ) }
                </>
            }
            </div>
        </div>
    )
}
export default RemoteGallery;