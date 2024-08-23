import { Button } from "@mui/material";

const NavigationButton = ({ handleClick, text }) => {
  return (
    <Button
      className="left-side_button"
      variant="contained"
      size="large"
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export { NavigationButton };
