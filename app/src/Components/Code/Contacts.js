import React, { useState, useReducer } from 'react';
import '../Style/Contacts.css';

function Contacts() {
	const [ mail, setMail ] = useState(false);
	const [ error, setError ] = useState('');
	const [ emailResponse, setEmailResponse ] = useState('');
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({...state, ...newState}),
		{
		name: '',
		email: '',
		topic: '',
		message: ''
		}
	  );
	const handleChange = evt => {
		const name = evt.target.name;
		const newValue = evt.target.value;
		setUserInput({[name]: newValue});
	}

	const sendMail = () => {
		setMail(true)
	}

	const postData = async () => {
		await fetch (`http://localhost:3000/message`, {
          	method: 'post',
          	headers: {'Content-Type':'application/json'},
          	body: JSON.stringify({
          	"name": userInput.name,
			"email": userInput.email,
			"topic": userInput.topic,
			"message": userInput.message
          	})
		})
		.then(res => res.json())
		.then(res => setEmailResponse(res))
	}

	const mailIsSent = () => {
		if ( userInput.name !== '' && userInput.email !== '' && userInput.message !=='' ) {
			postData();
			setError('')

		} else {
			setError('You need to fill all the requierd blanks')
		}
	}
	
console.log(userInput)
  return (
	<div className="wrapper-contact">
		{mail ? 
		<div class="container" >  
		<div id="contact" action=""  >
		  {emailResponse === 'Email sent' ? 
		  <>
			  <h4>We have recived your message</h4>
			  <h4>We will answer your question in a very short time</h4>
			  </>
			  :
			  <>
			<h3>Ask Me</h3>
			<h4>We will answer your question in a very short time</h4>
			<h5>{ error }</h5>
			</>
		}
		  <fieldset>
			<input name="name" value={userInput.name} onChange={handleChange} placeholder="Your name" type="text" tabindex="1" required autofocus />
		  </fieldset>
		  <fieldset>
			<input name="email" value={userInput.mail} onChange={handleChange} placeholder="Your Email Address" type="email" tabindex="2" required />
		  </fieldset>
		  <fieldset>
			<input name="topic" value={userInput.topic} onChange={handleChange} placeholder="Topic" type="tel" tabindex="3" required />
		  </fieldset>
		  <fieldset>
			<textarea name="message" value={userInput.message} onChange={handleChange} placeholder="Type your message here...." tabindex="5" required></textarea>
		  </fieldset>
		  <fieldset>
			<input className="button" onClick={mailIsSent} value="submit" name="submit" type="submit" id="contact-submit" data-submit="...Sending"  />
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
