import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AddImageRemote ({ lastimageName, updadateReRender }) {
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
        .then((res) => res.data === 'Its done' ? updadateReRender(true) || setLoadingBar(false): null)
        
    }

    const saveData = () => {
        if( file !== null ) {
            postData();
        }
       
    }
    return(
        <div>
            {progress !== 0 && loadingBar === true ?
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