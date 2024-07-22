import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
const PageCover = React.forwardRef(function PageCover(props, ref) {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      {props.image && (
        <div className="page-content">
          <h1 style={{ fontSize: "2.5rem" }}>{props.title}</h1>
          <div className="image-container">
            <Box
              className="page-image"
              component="img"
              sx={{
                width: "80%",
              }}
              src={props.image}
            />
          </div>
        </div>
      )}
    </div>
  );
});

PageCover.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  image: PropTypes.string, // Adding image prop validation
};

export default PageCover;
