import React, { useState } from 'react';
import RemoteGallery from './RemoteGallery';
import RemoteMyWork from './RemoteMyWork'

function RemoteWrapper () {
    const [ render, setRender ] = useState('MyWork');
    const [ gallery, setGallery ] = useState('');
    const [ remainAuthenticated, setRemainAuthenticate ] = useState(false);

    const updateRender = (childData) => {
        setRender(childData);
    }

    const updateGallery = (childData) => {
        setGallery(childData);
    }

    const updateAuthenticate = (chidDate) => {
        setRemainAuthenticate(chidDate);
    }
    return(
        <div>
            {render === 'MyWork' ? <RemoteMyWork updateRender={updateRender} updateGallery={updateGallery} remainAuthenticated={remainAuthenticated}/>: <RemoteGallery gallery={gallery} updateRender={updateRender} updateAuthenticate={updateAuthenticate}/>}
        </div>
    )
}

export default RemoteWrapper;