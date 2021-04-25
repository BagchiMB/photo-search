import React, { useRef, useCallback, useEffect, useState } from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/CloseRounded";
import { CircularProgress, Dialog, Typography } from "@material-ui/core";

// Components from external libraries
import Masonry from "react-masonry-css";
import SnackbarUtils from "shared/snackbar/utils";

// Helpers
import urls from "shared/urls";
import axios from "shared/axios";
import usePrevious from "shared/hooks/usePrevious";

// breakpoints for gallery view
const breakpoints = {
  default: 3,
  1000: 2,
  600: 1,
};

const useStyles = makeStyles((theme) => ({
  imgBox: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
  },
  image: {
    maxWidth: "95%",
  },
  brokenLink: {
    height: "30vh",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& p": {
      color: theme.palette.secondary.main,
    },
  },

  loading: {
    height: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  imgInModal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },

  dialogTitle: {
    width: "90%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: theme.spacing(1),
    cursor: "pointer",
  },

  analytics: {
    minHeight: theme.spacing(5),
    padding: theme.spacing(2),
  },
}));

const ImageList = ({ search }) => {
  const classes = useStyles();

  const [images, setImages] = useState([]);
  const [metaData, setMetaData] = useState({
    page: 1,
  });

  const [loading, setLoading] = useState(false);

  // For extracting value from props search
  const [query, setQuery] = useState(null);

  // Selected Image
  const [selectedImg, setSelectedImg] = useState({ title: "", url_m: "" });

  const PreviousSearchObj = usePrevious(search);

  // Getting images from the API
  const getImages = useCallback(async () => {
    // loading only kicks in for new search and initial render
    if (metaData.page === 1) setLoading(true);
    try {
      // query state helps in deciding which api url we should go with
      const res = await axios.get(
        query
          ? urls.searchedImages({ page: metaData.page, search: query })
          : urls.defaultImages({ page: metaData.page })
      );
      const images = res.data.photos.photo;
      const { page, pages, perpage, total } = res.data.photos;
      const metaDataFromAPI = {
        page,
        pages,
        perpage,
        total,
      };
      setMetaData(metaDataFromAPI);
      setImages((prevImages) => [...prevImages, ...images]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (err.response.status === 10) {
        SnackbarUtils.error("Search api not working, Try again Later!");
      } else {
        SnackbarUtils.error("Something went wrong!");
      }
    }
  }, [metaData.page, query]);

  useEffect(() => {
    if (search?.title !== PreviousSearchObj?.title) {
      if (search?.title) {
        // On new search setting page number to 1
        setMetaData({ page: 1 });

        // setting the extraction for handling
        setQuery(search.title);
      } else {
        // In case when user clears the input in that case recent photos are fetched
        setQuery(null);
      }

      // Empting the array as new search is there
      setImages([]);
      // Taking the user at the top of the page if any cahnges are made
      window.scrollTo(0, 0);
    }
  }, [search, getImages, PreviousSearchObj]);

  useEffect(() => {
    getImages();
  }, [getImages, query]);

  // For managing when should be apis called for infinite scrolling
  const observer = useRef();
  const IntersectingImageRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setMetaData((prevData) => ({
          ...prevData,
          page:
            prevData.pages > prevData.page ? prevData.page + 1 : prevData.page,
        }));
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={classes.analytics}>
            {query && (
              <Typography align="center" variant="h6">
                {metaData.total} results
              </Typography>
            )}
          </div>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((img, index) => {
              if (!img.url_m) {
                return (
                  <div className={classes.brokenLink} key={index}>
                    <p>Image Link Broken</p>
                  </div>
                );
              } else if (images.length - 5 === index) {
                return (
                  <div
                    ref={IntersectingImageRef}
                    key={index}
                    className={classes.imgBox}
                    onClick={() => setSelectedImg(img)}
                  >
                    <img
                      className={classes.image}
                      src={img.url_m}
                      alt={img.title}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className={classes.imgBox}
                    onClick={() => setSelectedImg(img)}
                  >
                    <img
                      className={classes.image}
                      src={img.url_m}
                      alt={img.title}
                    />
                  </div>
                );
              }
            })}
          </Masonry>
        </>
      )}
      <Dialog
        open={Boolean(selectedImg.id)}
        onClose={() => setSelectedImg({ title: "", url_m: "" })}
        fullWidth
        maxWidth="sm"
      >
        <div className={classes.dialogTitle}>
          <CloseIcon onClick={() => setSelectedImg({ title: "", url_m: "" })} />
        </div>
        <div className={classes.imgInModal}>
          <img
            className={classes.image}
            src={selectedImg.url_m}
            alt={selectedImg.title}
          />
          <p>{selectedImg.title}</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ImageList;
