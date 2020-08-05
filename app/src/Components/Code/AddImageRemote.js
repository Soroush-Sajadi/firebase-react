import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AddImageRemote ({ lastimageName }) {
    const [ file, setFile ] = useState(null);
    const [ progress, setProgess ] = useState(0);

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
        await axios.post(url, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            },
        })
    }

    const saveData = () => {
        if( file !== null ) {
            postData();
        }
    }

    return(
        <div>
            <input type="file" onChange={handleChange} />
            <input type="submit" value="Add Image" onClick={saveData} />
        </div>
    )
}
export default AddImageRemote;