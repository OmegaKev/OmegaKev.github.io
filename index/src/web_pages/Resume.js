import pdf_resume from '../assets/documents/KevinHall_Resume_081924.pdf';

const Page_Resume = () =>
{
    console.log("Loading Resume...");
    return (
        <div>
            <object className = "pdf-viewer" data = {pdf_resume} type="application/pdf">
                <p>Resume</p>
            </object>
        </div>
      );
}

export default Page_Resume;