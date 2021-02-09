import {useState} from 'react';

//const SERVER_URL = window.location.href + 'send';
//const backend_port = 9000;

// Disables form submit
// Will be used until php code is finished
const disable_submit = (event) => {
    event.preventDefault();
    alert('E-mail not implemented.');
}

const Page_Contact = () =>
{
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // Handle changes to the form
    const handleChange = (event, state_func) =>
    {
        state_func(event.target.value);
    }

    const email_is_valid = (email) =>
    {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
            return false;
        
        return true;
    }

    const sendMail = (values) => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(values)
        };

        let res = {};

        fetch('/send', requestOptions)
        .then(response => res = response);

        switch(res.status)
        {
            case 530:
                alert('Authentication error.');
                break;
            default:
                alert('No server connection. Please try again later.');
                break;
        }
    }

    const handleEmail = (event) =>
    {
        event.preventDefault();

        if(email_is_valid(email) || subject === "")
        {
            alert("Please provide a valid email and a non-blank subject");
            return;
        }

        // Send post request to email me
        console.log("Attempting to send mail");
        sendMail({email, subject, message});
    }

    return (
        <div>
            <span>Contact Page</span>
            <form className="email-form text-border" onSubmit={handleEmail}>
                <span>From:</span><input type="text" value={email} onChange = {(event) => handleChange(event, setEmail)}></input>
                <span>Subject:</span><input type="text" value={subject} onChange = {(event) => handleChange(event, setSubject)}></input>
                <textarea className= "item-e" value={message} onChange = {(event) => handleChange(event, setMessage)}></textarea>
                <input type="submit" value="Send" />
            </form>
        </div>
      );
}

export default Page_Contact;