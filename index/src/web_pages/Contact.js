import {useState} from 'react';
import React from 'react';

class InputText extends React.Component
{
    constructor(props)
    {
        super(props);

        this.type = (props.type !== undefined) ? props.type : "text";
        this.handleChange = props.handleChange;
        this.required = (props.required) ? true : false;
        this.style = {backgroundColor: ""};
        this.state = {error: false};
    }

    // Returns the input value attached to the parent state
    getInputValue = () => {
        return this.props.ref_state.value;
    }

    getErrorState = () => {
        return this.state.error;
    }

    setErrorState = (bool_state) => {
        if(bool_state === true)this.style = {backgroundColor: "Pink"};
        else this.style = {backgroundColor: ""};

        this.setState({error: bool_state});
    }

    validateInput = (regex) => {
        // Test against the regex and place the component in the correct state
        let error = !regex.test(this.getInputValue());
        
        if (error)this.setErrorState(true);
        else this.setErrorState(false);

        return error === false;
    }

    render = () => {
        return(
            <>
                <input type = {this.type} 
                    value = {this.getInputValue()}
                    onChange = {this.handleChange}
                    style = {this.style}
                    required = {this.required}
                />
            </>
        );
    }
    
}

const Page_Contact = () =>
{
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const ref_email = React.useRef();
    const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Handle changes to the form
    const handleChange = (event, state_func) =>
    {
        // Only check for errors on email
        if(state_func === setEmail && ref_email.current.getErrorState())
        {
            ref_email.current.validateInput(email_regex);
        }
        
        // Chage the value of the component
        state_func(event.target.value);
    }

    const sendMail = async (values) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(values)
        };

        const res = await fetch('https://formspree.io/f/meqpdbqr', requestOptions);

        console.log(res);

        switch(res.status)
        {
            case 200:
                alert("Thanks for the email. I will attempt to get back to you as soon as possible.");
                break;
            default:
                alert("Email could not be sent. Please try again later.");
                break;
        }

    }

    const handleEmail = (event) =>
    {
        event.preventDefault();
        if(!ref_email.current.validateInput(email_regex))return;

        // Send post request to email me
        console.log("Sending Mail from [" + email + "] [" + subject + "]");
        sendMail({_replyto: email, _subject: subject, _message: message});
    }

    return (
        <div>
            <span>Contact Page</span>
            <form className="email-form text-border" onSubmit={handleEmail}>
                <label>From:</label>
                {/*<input type="text" value={email} onChange = {(event) => handleChange(event, setEmail)} required /> */}
                <InputText ref = {ref_email} ref_state = {{value: email}} handleChange = {(event) => handleChange(event, setEmail)} required = {true} />
                <label>Subject:</label><input type="text" value={subject} onChange = {(event) => handleChange(event, setSubject)} required />
                <textarea className= "item-e" value={message} onChange = {(event) => handleChange(event, setMessage)} required />
                <input type="submit" value="Send" />
            </form>
        </div>
      );
}

export default Page_Contact;