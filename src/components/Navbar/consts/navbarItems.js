import AssessmentIcon from "@mui/icons-material/Assessment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
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
    icon: <Inventory2Icon />,
    label: "Orders",
    route: ROUTES.ORDERS,
  },
  {
    id: 2,
    icon: <SettingsInputCompositeIcon />,
    label: "Threshold notification",
    route: ROUTES.THRESHOLDS,
  },
];
