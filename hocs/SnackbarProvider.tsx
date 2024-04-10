import { SnackbarProvider as SnackbarWrapper } from "notistack";

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarWrapper
      autoHideDuration={3000}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
    >
      {children}
    </SnackbarWrapper>
  );
};

export default SnackbarProvider;
