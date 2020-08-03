import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import '../Style/Remote.css'

function RemoteMyWork ({ uppDateTitle }) {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState('Loading');
    const [ file, setFile ] = useState(null);
    const [ oldImage, setOldImage ] = useState('');
    const [ progress, setProgess ] = useState(0);
    const [ authenticate, setAuthenticate ] = useState(false);
    const [ user, setUser ] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
        firstPass: '',
        secondPass: '',
        }
      );

    const handleChangePass = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUser({[name]: newValue});
    }

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

    const getTitle = (e) => {
        uppDateTitle(e.target.getAttribute('value'));
    }

    useEffect(() => {
        getData();
    },[])
    console.log(user)
    return(
        <>
        {authenticate ? 
        <div className="remote-wrapper">
            {progress !== 0 && progress !== '100%' ?
                <div className="progress-bar" style={{width: '100%', height:'20px', backgroundColor: '#ddd'}} >
                <div style={{ width: progress, height:"20px", backgroundColor:'green'}}>
                    <p style={{color:'white'}}>{progress}</p>
                </div>
            </div>
            :
            null
            }
            {data.length === 0 ? loading
            :
            <div className="cathegories-wrapper-remote">
                {data.map((item, i) => 
                    <div key={i}  className="cathegory-remote">
                        <h4>{item.title}</h4>
                        <NavLink to ={"/remote/" + item.title.toLowerCase()}>
                            <img value={item.title} src={item.image} onClick={getTitle} />
                        </NavLink>
                        <input type="file"  url={item.image} onChange={handelChange} />
                        <input type="submit" value="Change" onClick={postData} />
                    </div> 
                ) }
            </div>
            }
        </div>
        :
        
        <div className="login-wraper">
            <input className="login" type="text" name="firstPass" value={user.firstPass} placeholder="First password" onChange={ handleChangePass } />
            <input className="login" type="text" name="secondPass" value={user.secondPass} placeholder="Second password" onChange={ handleChangePass } />
            <input className="submit" type="submit" />
        </div>
        }
        </>
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