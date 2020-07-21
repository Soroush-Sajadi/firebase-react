import React from 'react';
import email from '../../images/Contacts-Logo/gmail.svg';
import fb from '../../images/Contacts-Logo/facebook.svg';
import instagram from '../../images/Contacts-Logo/instagram-sketched.svg'
import '../Style/Contacts.css';

function Contacts() {
  return (
		<div className="wrapper-contact">
    <div className="hexagon">
  		Email
  		<div className="face1"></div>
  		<div className="face2"></div>
		</div>
		<div className="hexagon">
		Facebook
		<div className="face1"></div>
		<div className="face2"></div>
	</div>
	<div className="hexagon">
		Instagram
		<div className="face1"></div>
		<div className="face2"></div>
	</div>
	<div className="hexagon">
		Tel
		<div className="face1"></div>
		<div className="face2"></div>
	</div>
	</div>
  	);
	}

export default Contacts;
