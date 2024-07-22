import React from "react";
import PropTypes from "prop-types";
import "../App.css";
const Page = React.forwardRef(function Page(props, ref) {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <div className="page-paragraph">{props.children}</div>
        <div className="page-footer">{props.number}</div>
      </div>
    </div>
  );
});

Page.propTypes = {
  number: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
