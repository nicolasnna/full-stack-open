import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Container } from "@mui/material";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Box marginY={2}>
      <Container style={hideWhenVisible}>
        <Button size="small" variant="contained" onClick={toggleVisibility}>{props.buttonLabelShow}</Button>
      </Container>
      <Container style={showWhenVisible}>
        {props.children}
        <Button sx={{ marginTop: 1}} size="small" variant="outlined" onClick={toggleVisibility}>cancel</Button>
      </Container>
    </Box>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabelShow: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Togglable;
