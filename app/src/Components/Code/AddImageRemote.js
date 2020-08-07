import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AddImageRemote ({ lastimageName, updadateReRender }) {
    const [ file, setFile ] = useState(null);
    const [ progress, setProgess ] = useState(0);
    const [ message, setMessage ] = useState(false);

    const handleChange = e => {
        setProgess(0)
        const file = (e.target.files[0]); 
        setFile(file);
        // setOldImage(e.target.getAttribute('url'));
    }

    const postData = async () => {
        const url = 'http://localhost:3000/add/image';
        const formData = new FormData();
        formData.append( 'file', file, lastimageName)
        axios.post(url, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            },
        })
        // .then(res => res.json())
        // .then(res => setMessage(res))
    }

    const saveData = () => {
        if( file !== null ) {
            postData();
        }
        // updadateReRender(true);
    }

    return(
        <div>
            {progress !== 0 && progress !== '100%' ?
                <div className="progress-bar" style={{width: '100%', height:'20px', backgroundColor: '#ddd'}} >
                <div style={{ width: progress, height:"20px", backgroundColor:'green'}}>
                    <p style={{color:'white' , textAlign:'center'}}>{progress}</p>
                </div>
            </div>
            :
            null
            }
            <input type="file" onChange={handleChange} />
            <input type="submit" value="Add Image" onClick={saveData} />
        </div>
    )
}
export default AddImageRemote;