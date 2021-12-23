import "styled-components";
import { Theme } from "~/hooks/useTheme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
