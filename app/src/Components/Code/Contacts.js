import React, { useState, useReducer } from 'react';
import OpenMenu from './OpenMenu';
import close from '../../images/Logo/close.svg'
import '../Style/Contacts.css';

function Contacts({menuState, language, upDateMenuState, uppDateLanguage}) {
	const [ mail, setMail ] = useState(false);
	const [ error, setError ] = useState('');
	const [ emailResponse, setEmailResponse ] = useState('');
	const [ showTel, setShowTel ] = useState(false)
	const [ userInput, setUserInput ] = useReducer(
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
		setMail(!mail)
	}

	const showTelNumber = () => {
		setShowTel(!showTel)
	}

	const postData = async () => {
		await fetch (`https://us-central1-makan-5c9d1.cloudfunctions.net/app/message`, {
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
	
  return (
	  <>
	  {!menuState ? 
	  	<div className="wrapper-contact">
			{mail ? 
			<div class="container" > 
				
			<div id="contact" action=""  >
			<img className="close" src={close} alt="close" onClick={sendMail}/>
			{emailResponse === 'Email sent' ? 
			<>
				{language === 'English' ? <h4 style={{color: '#4caf50'}}>We have recived your message!</h4>: <h4 style={{color: '#4caf50'}}>Vi har fått ditt medelande!</h4>}
				{language === 'English' ? <h4>We will answer your question in a very short time</h4>: <h4>Vi svarar din fråga i en vädig kort tid</h4>}
				
				</>
				:
				<>
				{language === 'English' ? <h3>Ask Me</h3>: <h3>Fråga Mig</h3>}
				{language === 'English' ? <h4>Write your question in the box bellow.</h4>: <h4>Skriv din fråga här</h4>}
				<h4></h4>
				<h5>{ error }</h5>
				</>
			}
			{emailResponse === 'Internal Error' ?
				<>
					<h4 style={{color: '#e2271a'}}>Email is not valid!</h4>
				</>
				:
				null
			}
			<fieldset>
				<input name="name" value={userInput.name} onChange={handleChange} placeholder={language === 'English' ? "Your name" : 'Ditt Namn' } type="text" tabindex="1" required autofocus />
			</fieldset>
			<fieldset>
				<input name="email" value={userInput.mail} onChange={handleChange} placeholder={language === 'English' ? "Email" : 'Email' } type="email" tabindex="2" required />
			</fieldset>
			<fieldset>
				<input name="topic" value={userInput.topic} onChange={handleChange} placeholder={language === 'English' ? "Topic" : 'Ämne' } type="tel" tabindex="3" required />
			</fieldset>
			<fieldset>
				<textarea name="message" value={userInput.message} onChange={handleChange} placeholder={language === 'English' ? "Type your message here...." : 'Skriv ditt medelande här...' } tabindex="5" required></textarea>
			</fieldset>
			<fieldset>
				<input className="button" onClick={mailIsSent} value={language === 'English' ? 'Submit': 'Skicka '} name="submit" type="submit" id="contact-submit" data-submit="...Sending"  />
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
				<a style={{textDecoration:'none'}} href="https://www.facebook.com/makankamfar/">
					Facebook
				</a>
					<div className="face1"></div>
					<div className="face2"></div>
				</div>
				
				
				<div className="hexagon">
				<a style={{textDecoration:'none'}} href ="https://www.instagram.com/makan.photographer/?fbclid=IwAR2hxzY324MmirhavUb7VbD38bsZeGQsPPKuWciOuEe6S5e-XUA9vzrqkk4">
					Instagram
				</a>
					<div className="face1"></div>
					<div className="face2"></div>
				</div>
				
				<div className="hexagon" onClick={ showTelNumber }>
					{ showTel ? <p style={{fontSize:'12px'}}>+46-76 211 57 51</p> : <p>Tel</p> } 
					<div className="face1"></div>
					<div className="face2"></div>
				</div>
			</div>
			}
		</div>
		:
		<OpenMenu language={language} upDateMenuState={upDateMenuState} menuState={menuState} uppDateLanguage={uppDateLanguage} />
		}
	  </>
	
  	);
	}

export default Contacts;