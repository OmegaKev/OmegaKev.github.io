import pdf_resume from "src/assets/documents/KevinHall_Resume_081924.pdf";
import { Box } from "@mui/material";

const Page_Resume = () => {
  console.log("Loading Resume...");
  return (
    <Box>
      <object className="pdf-viewer" data={pdf_resume} type="application/pdf">
        <p>Resume</p>
      </object>
    </Box>
  );
};

export default Page_Resume;
