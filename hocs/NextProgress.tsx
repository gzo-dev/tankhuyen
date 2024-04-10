import NextProgressComponent from "next-progress";

import { useTheme } from "@chakra-ui/react";

const NextProgress = () => {
  const theme = useTheme();

  return (
    <NextProgressComponent
      delay={300}
      color={theme.colors.primary[800]}
      options={{ showSpinner: false }}
    />
  );
};

export default NextProgress;
