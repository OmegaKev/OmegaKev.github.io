// Disables form submit
// Will be used until php code is finished
const disable_submit = (event) => {
    event.preventDefault();
    alert('E-mail not implemented.');
}

const Page_Contact = () =>
{
    return (
        <div>
            <span>Contact Page</span>
            <form className="email-form text-border" onSubmit={disable_submit}>
                <span>Name:</span><input type="text"></input>
                <span>Subject:</span><input type="text"></input>
                <textarea className= "item-e"></textarea>
                <input type="submit" value="Send" />
            </form>
        </div>
      );
}

export default Page_Contact;