import React, { useState } from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

// helpers
import { getSearchQueries, setSearchQueries } from "shared/helpers";

const useStyles = makeStyles((theme) => ({
  searchSection: {
    backgroundColor: theme.palette.primary.main,
    minHeight: theme.spacing(20),
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    position: "sticky",
    top: "0",
    [theme.breakpoints.down("sm")]: {
      minHeight: theme.spacing(10),
      padding: theme.spacing(2),

      "& h3": {
        display: "none",
      },
    },
  },

  textBox: {
    backgroundColor: "#fff",
  },

  searchBox: {
    marginTop: theme.spacing(3),
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
}));

const filter = createFilterOptions();

const SearchSection = ({ search, setSearch }) => {
  const classes = useStyles();

  // getSearchQueries gets array stored in local storage if not present it initialises an array and returns
  const [options, setOptions] = useState(getSearchQueries());

  return (
    <div className={classes.searchSection}>
      <Typography variant="h3" color="secondary">
        Search Photos
      </Typography>
      <div className={classes.searchBox}>
        <Autocomplete
          options={options}
          value={search}
          selectOnFocus
          clearOnBlur
          fullWidth
          freeSolo
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setSearch({
                title: newValue,
              });
              const newOptions = [...options];
              let optionAlreadypresent = false;
              newOptions.forEach((option) => {
                if (option.title === newValue) optionAlreadypresent = true;
                return option;
              });
              if (!optionAlreadypresent) {
                newOptions.push({ title: newValue });
                setOptions(newOptions);
                setSearchQueries(newOptions);
              }
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input when user clicks -->  Add "xxx"
              setSearch({
                title: newValue.inputValue,
              });

              const newOptions = [...options];
              newOptions.push({ title: newValue.inputValue });
              setOptions(newOptions);
              setSearchQueries(newOptions);
            } else {
              setSearch(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            // Suggest the creation of a new value
            if (params.inputValue !== "" && filtered.length === 0) {
              filtered.push({
                inputValue: params.inputValue,
                title: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.title;
          }}
          renderOption={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search images ..."
              variant="filled"
              className={classes.textBox}
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SearchSection;
