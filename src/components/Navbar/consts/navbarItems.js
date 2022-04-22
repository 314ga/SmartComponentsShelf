import AssessmentIcon from "@mui/icons-material/Assessment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import * as ROUTES from "../../common/RouterContstants/routes";
export const mainNavbarItems = [
  {
    id: 0,
    icon: <AssessmentIcon />,
    label: "Reports",
    route: ROUTES.REPORTS,
  },

  {
    id: 1,
    icon: <SsidChartIcon />,
    label: "Overview",
    route: ROUTES.OVERVIEW,
  },
  {
    id: 2,
    icon: <Inventory2Icon />,
    label: "Orders",
    route: ROUTES.ORDERS,
  },
  {
    id: 3,
    icon: <SettingsInputCompositeIcon />,
    label: "Components",
    route: ROUTES.COMPONENTS,
  },
  {
    id: 4,
    icon: <AssessmentIcon />,
    label: "Reset Password",
    route: ROUTES.PASSWORD_RESET,
  },
];
