import React from "react";
import proImage from "src/assets/images/kh_picture.jpg";
import { Stack, Box, Typography } from "@mui/material";
import { NavigationButton } from "./components/NavigationButton/NavigationButton.js";
import { MainPageContent } from "./components/MainPageContent/MainPageContent.js";
import { leftColumnSx, navigationColumnSx } from "./styles";

const TemplateLayout = () => {
  const mpRef = React.useRef();

  return (
    <Box className="side-by-side_layout">
      <Stack className="left-column" sx={leftColumnSx}>
        <Box component="img" src={proImage} alt="Kevin Hall" />
        <Typography variant="h4">Kevin Hall</Typography>
        <Stack sx={navigationColumnSx}>
          <NavigationButton
            handleClick={() => mpRef.current.changePage("Resume")}
            text="Resume"
          />
          <NavigationButton
            handleClick={() => mpRef.current.changePage("Projects")}
            text="Projects"
          />
          <NavigationButton
            handleClick={() => mpRef.current.changePage("About Me")}
            text="About"
          />
          <NavigationButton
            handleClick={() => mpRef.current.changePage("Contact")}
            text="Contact"
          />
        </Stack>
      </Stack>
      <Box className="right-column">
        <MainPageContent ref={mpRef} />
      </Box>
    </Box>
  );
};

export { TemplateLayout };
