import { ThemeName } from "~/models/theme";
import { colors } from "~/styleguide/colors";

export const lightTheme = {
  name: ThemeName?.light,
  colors: {
    primary: colors.white,
    input: colors.lightGrey,
    inputText: colors.lightGreyText,
    textPrimary: colors.black,
  },
};
