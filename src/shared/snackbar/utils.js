import { useSnackbar } from "notistack";
import React from "react";

const InnerSnackbarUtilsConfigurator = (props) => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef;

const setUseSnackbarRef = (useSnackbarRefProp) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
  );
};

const toast = (msg, options = {}) => {
  useSnackbarRef.enqueueSnackbar(msg, options);
};

const snackbars = {
  success(msg, options = {}) {
    toast(msg, { ...options, variant: "success" });
  },
  warning(msg, options = {}) {
    toast(msg, { ...options, variant: "warning" });
  },
  info(msg, options = {}) {
    toast(msg, { ...options, variant: "info" });
  },
  error(msg, options = {}) {
    toast(msg, { ...options, variant: "error" });
  },
};

export default snackbars;
