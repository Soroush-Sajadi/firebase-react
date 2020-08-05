import React, { useState } from 'react'
import DeleteIcon from '../../images/Logo/delete.png';
import axios from 'axios';
import '../Style/DeleteImageRemote.css'

function DeleteImageRemote ({ imageName }) {
    const [ message, setMessage ] = useState('')

    const getImage = async () => {
        const url = `http://localhost:3000/delete/image/${imageName}`
        await fetch(url)
            // .then(res => res.json())
            // .then(res => setMessage(res))
    }

    const deleteImage = () => {
        getImage();
    }

    return(
        <div className="deleteIcon">
            <img  src={DeleteIcon} alt="delete" onClick={deleteImage}/>
        </div>
    )
}

export default DeleteImageRemote;