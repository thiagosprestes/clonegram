import { ThemeName } from "~/models/theme";
import { colors } from "~/styleguide";

export const darkTheme = {
  name: ThemeName?.dark,
  colors: {
    primary: colors.black,
    input: colors.darkGrey,
    inputText: colors.darkGreyText,
    textPrimary: "#fff",
  },
};
