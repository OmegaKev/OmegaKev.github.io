import React from "react";
import Page_About from "src/web_pages/About/About.js";
import Page_Resume from "src/web_pages/Resume/Resume.js";
import Page_Contact from "src/web_pages/Contact/Contact.js";
import Page_Projects from "src/web_pages/Projects/Projects.js";
import Page_UnderConstruction from "src/web_pages/UnderConstruction/UnderConstruction.js";
import * as Toolbox from "src/ComponentToolbox.js";
import { Box } from "@mui/material";

// MainPageContent as a class component to allow reference
class MainPageContent extends React.Component {
    constructor(props) {
      super(props);
  
      this.default = { page_state: "Resume" };
      this.state = this.default;
      this.page = {
        "About Me": Page_About,
        UnderConstruction: Page_UnderConstruction,
        Resume: Page_Resume,
        Projects: Page_Projects,
        Contact: Page_Contact,
      };
    }
  
    changePage(page) {
      let new_page = this.default;
  
      if (page in this.page) new_page = { page_state: page };
      this.setState(new_page);
    }
  
    componentDidMount() {
      console.log("MainPageContent: Mounted");
    }
  
    componentWillUnmount() {
      console.log("MainPageContent: Unmounted");
    }
  
    render() {
      const Page = this.page[this.state.page_state];
  
      return (
        <>
          <Toolbox.Header text={this.state.page_state} />
          <Box className="content-area">
            <Page />
          </Box>
        </>
      );
    }
  }

  export { MainPageContent }