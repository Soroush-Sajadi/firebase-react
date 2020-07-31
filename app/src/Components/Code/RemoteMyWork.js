import React, {useState, useEffect} from 'react';
import {formDataToBuffer} from 'form-data'
import axios from 'axios'
import '../Style/Remote.css'

function RemoteMyWork () {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState('Loading');
    const [ file, setFile ] = useState(null);
    const [ oldImage, setOldImage ] = useState('');
    const [progress, setProgess] = useState(0); // progess bar
    const [newData, getFile] = useState({ name: "", path: "" });

    const getData = async() => {
        await fetch(`http://localhost:3000/`)
            .then(res => res.json())
            .then(res => setData(res))
    }
    const handelChange = e => {
        setProgess(0)
        const file = (e.target.files[0]); 
        setFile(file);

        setOldImage(e.target.getAttribute('url'));
    }

    const postFileNewImage = async () => {
        const url = 'http://localhost:3000/cathegoryChange';
        const formData = new FormData();
        formData.append( 'file', file,oldImage)
        
     
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

    
   
	const postData = async () => {
        if (file !== null) {
            await postFileNewImage();
        }
       
    }

    useEffect(() => {
        getData();
    },[])
    console.log(oldImage)
    return(
        <div className="remote-wrapper">
            {data.length === 0 ? loading
            :
            <div className="cathegories-wrapper-remote">
                {data.map((item, i) => 
                    <div key={i}  className="cathegory-remote">
                        <h4>{item.title}</h4>
                        <img src={item.image} />
                        <input type="file"  url={item.image} onChange={handelChange} />
                        <input type="submit" value="Change" onClick={postData} />
                    </div> 
                ) }
            </div>
            }
        </div>
    )
}
export default RemoteMyWork;

// const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
// const [data, getFile] = useState({ name: "", path: "" });
// const [progress, setProgess] = useState(0); // progess bar
// const el = useRef(); // accesing input element
// const handleChange = (e) => {
//     setProgess(0)
//     const file = e.target.files[0]; // accesing file
//     console.log(file);
//     setFile(file); // storing file
// }
// const uploadFile = () => {
//     const formData = new FormData();        formData.append('file', file); // appending file
//     axios.post('http://localhost:4500/upload', formData, {
//         onUploadProgress: (ProgressEvent) => {
//             let progress = Math.round(
//             ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
//             setProgess(progress);
//         }
//     }).then(res => {
//         console.log(res);
//         getFile({ name: res.data.name,
//                  path: 'http://localhost:4500' + res.data.path
//                })
//     }).catch(err => console.log(err))}
// return (
//     <div>
//         <div className="file-upload">
//             <input type="file" ref={el} onChange={handleChange} />                <div className="progessBar" style={{ width: progress }}>
//                {progress}
//             </div>
//             <button onClick={uploadFile} className="upbutton">                   Upload
//             </button>
//         <hr />
//         {/* displaying received image*/}
//         {data.path && <img src={data.path} alt={data.name} />}
//         </div>
//     </div>
// );
// }
// export default FileUpload;