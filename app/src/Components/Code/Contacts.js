import React, { useState } from 'react';
import email from '../../images/Contacts-Logo/gmail.svg';
import fb from '../../images/Contacts-Logo/facebook.svg';
import instagram from '../../images/Contacts-Logo/instagram-sketched.svg'
import '../Style/Contacts.css';

function Contacts() {
	const [ mail, setMail ] = useState(false);

	const sendMail = () => {
		setMail(!mail)
	}
	
console.log(mail)
  return (
	<div className="wrapper-contact">
		{mail ? 
		<div class="container" >  
		<div id="contact" action=""  >
		  <h3>Ask Me</h3>
		  <h4>We will answer your question in a very short time</h4>
		  <fieldset>
			<input placeholder="Your name" type="text" tabindex="1" required autofocus />
		  </fieldset>
		  <fieldset>
			<input placeholder="Your Email Address" type="email" tabindex="2" required />
		  </fieldset>
		  <fieldset>
			<input placeholder="Your Phone Number (optional)" type="tel" tabindex="3" required />
		  </fieldset>
		  <fieldset>
			<textarea placeholder="Type your message here...." tabindex="5" required></textarea>
		  </fieldset>
		  <fieldset>
			<input className="button" onClick={sendMail} value="submit" name="submit" type="submit" id="contact-submit" data-submit="...Sending"  />
		  </fieldset>
		</div>
	  </div>
		:
		<div className="hexagon-wrapper">
			<div className="hexagon" onClick={sendMail}>
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
		}
	</div>
  	);
	}

export default Contacts;
