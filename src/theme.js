// Material UI and jss-rtl
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  typography: {
    fontSize: 11.5,
    fontFamily: "Nunito",
    fontWeightBold: 600,
    fontWeightBolder: 700,
  },
  palette: {
    primary: {
      main: "#222222",
    },
    secondary: {
      main: "#fff",
    },
    success: {
      main: "#28BC00",
    },
  },
});

// Adjust font sizes based on the viewport width
theme = responsiveFontSizes(theme);

export default theme;
