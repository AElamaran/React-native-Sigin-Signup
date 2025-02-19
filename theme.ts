import { DefaultTheme, withTheme } from "react-native-paper";

// withTheme({ theme: DefaultTheme});

export const theme = {
  ...DefaultTheme,
  components: {
    Button: {
      mode: "contained",
      dark: false,
      color: "secondary",
    },
  },
  colors: {
    ...DefaultTheme.colors,

    primary: "tomato",
    secondary: "yellow",
  },
};
