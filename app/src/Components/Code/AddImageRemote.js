import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../Style/AddImageRemote.css'

function AddImageRemote ({ lastimageName, updadateReRender, updateNewImageRequest }) {
    const [ file, setFile ] = useState(null);
    const [ progress, setProgess ] = useState(0);
    const [ message, setMessage ] = useState('');
    const [ loadingBar,  setLoadingBar ] = useState(true);

    const handleChange = e => {
        setProgess(0)
        const file = (e.target.files[0]); 
        setFile(file);
        // setOldImage(e.target.getAttribute('url'));
    }

    const postData = async () => {
        setLoadingBar(true);
        const url = 'http://localhost:3000/add/image';
        const formData = new FormData();
        formData.append( 'file', file, lastimageName)
        axios.post(url, formData, {
            headers: {'Content-Type': 'application/json'},
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            },
        })
        .then((res) => res.data === 'Its done' ? updadateReRender(true) || setLoadingBar(false) || updateNewImageRequest(false): null)
        
    }

    const saveData = () => {
        if( file !== null ) {
            updateNewImageRequest(true)
            postData();
        }
       
    }
    return(
        <div className="add-image-remote-wrapper">
            {progress !== 0 && loadingBar === true ?
                <div className="progress-bar-wrapper-add">
                <div className="progress-bar" style={{width: '50%', height:'30px', backgroundColor: '#ddd', position:'absolute', left:'20px'}} >
                <div style={{ width: progress, height:"30px", backgroundColor:'#881d1d', borderRadius:'20px'}}>
                    <p style={{color:'white', fontSize:'21px'}}>{progress === '100%' ? 'Please wait...' : progress }</p>
                </div>
            </div>
            </div>
            :
            null
            }
            <div>
                <input type="file" onChange={handleChange} />
                <input type="submit" value="Add Image" onClick={saveData} />
            </div>
        </div>
    )
}
export default AddImageRemote;