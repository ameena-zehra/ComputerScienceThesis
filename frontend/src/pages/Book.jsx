import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../components/Page";
import PageCover from "../components/PageCover";
import HTMLFlipBook from "react-pageflip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../App.css";

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalPage: 0,
      state: "",
      orientation: "",
    };
    this.flipBook = React.createRef();
  }

  nextButtonClick = () => {
    this.flipBook.pageFlip().flipNext();
  };

  prevButtonClick = () => {
    this.flipBook.pageFlip().flipPrev();
  };

  onPage = (e) => {
    this.setState({
      page: e.data,
    });
  };

  onChangeOrientation = (e) => {
    this.setState({
      orientation: e.data,
    });
  };

  onChangeState = (e) => {
    this.setState({
      state: e.data,
    });
  };

  downloadPDF = async () => {
    try {
      const { title, pages } = this.parseStory(this.props.location.state.story);
      console.log("Download PDF");
      const pdf = new jsPDF();
      pdf.setFontSize(32);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const textWidth =
        (pdf.getStringUnitWidth(title) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const textOffset = (pageWidth - textWidth) / 2;

      pdf.text(title, textOffset, 30); // Add the title to the first page at Y position 30

      // Adding a new page for the content
      pdf.addPage();

      for (let i = 0; i < pages.length; i++) {
        const pageElement = document.getElementById(`page-${i}`);
        console.log(pageElement);
        if (pageElement) {
          console.log("got page-", i, "element");
          pageElement.style.display = "block"; // Ensure the element is visible

          try {
            const canvas = await html2canvas(pageElement);
            const imgData = canvas.toDataURL("image/jpeg"); // Ensure the image format is correct

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            if (i > 0) pdf.addPage();

            pdf.setFontSize(22);

            pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
          } catch (canvasError) {
            console.error(
              "Error capturing page element as canvas:",
              canvasError
            );
          } finally {
            pageElement.style.display = "none"; // Hide the element again
          }
        } else {
          console.warn(`Page element with id page-${i} not found`);
        }
      }

      pdf.save(`${title}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  parseStory = (story) => {
    if (!story) return { title: "", pages: [] };

    // Extract the title
    const titleMatch = story.match(/Title: (.+)/);
    const title = titleMatch ? titleMatch[1].trim() : "";

    // Extract pages
    const pages = story
      .split(/Page \d+:/)
      .filter((page, index) => index > 0 && page.trim() !== "")
      .map((page) => page.trim());

    return { title, pages };
  };

  render() {
    const { location, navigate } = this.props;
    const { story, image } = location.state || {};

    const prevPageClick = () => {
      navigate("/", { state: { story, image } });
    };

    const { title, pages } = this.parseStory(story);

    return (
      <>
        {story && image ? (
          <div>
            <Button
              sx={{ marginBottom: "20px", marginTop: "20px" }}
              variant="round"
              size="medium"
              onClick={prevPageClick}
            >
              Try Again
            </Button>
            <Button
              sx={{
                marginBottom: "20px",
                marginTop: "20px",
                marginLeft: "55px",
              }}
              variant="round"
              size="medium"
              onClick={this.downloadPDF}
            >
              Download
            </Button>
            <HTMLFlipBook
              width={500}
              height={633}
              position="relative"
              size="stretch"
              minWidth={515}
              maxWidth={700}
              minHeight={400}
              maxHeight={633}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={this.onPage}
              flippingTime={800}
              onChangeOrientation={this.onChangeOrientation}
              onChangeState={this.onChangeState}
              className="demo-book"
              ref={(el) => (this.flipBook = el)}
            >
              <Box sx={{ boxShadow: 3 }} id="cover-page">
                <PageCover
                  title={title !== "" ? title : "My Story"}
                  image={image}
                />
              </Box>
              {pages.map((page, index) => (
                <Box sx={{ boxShadow: 3 }} key={index} id={`page-${index}`}>
                  <Page number={index + 1}>{page}</Page>
                </Box>
              ))}
            </HTMLFlipBook>
            <div className="container">
              <div>
                <Button
                  variant="small"
                  onClick={this.prevButtonClick}
                  sx={{
                    marginRight: "20px",
                  }}
                >
                  Previous page
                </Button>
                [<span>{this.state.page}</span> of <span>5 </span>]
                <Button
                  variant="small"
                  sx={{
                    marginLeft: "20px",
                  }}
                  onClick={this.nextButtonClick}
                >
                  Next page
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p>No story available. Please generate a story first.</p>
        )}
      </>
    );
  }
}

const withNavigation = (Component) => {
  function ComponentWithNavigationProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    return <Component {...props} location={location} navigate={navigate} />;
  }

  ComponentWithNavigationProp.propTypes = {
    location: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  return ComponentWithNavigationProp;
};

Book.propTypes = {
  location: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default withNavigation(Book);
