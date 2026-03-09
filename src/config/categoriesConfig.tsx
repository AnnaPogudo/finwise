import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import KeyIcon from "@mui/icons-material/Key";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SavingsIcon from "@mui/icons-material/Savings";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const categoryConfig = {
  income: {
    label: "Salary",
    icon: <AccountBalanceWalletIcon />,
    gradient: "linear-gradient(135deg,#43e97b,#38f9d7)",
  },
  food: {
    label: "Food",
    icon: <RestaurantIcon />,
    gradient: "linear-gradient(135deg,#ff9a9e,#ff6a88)",
  },
  transport: {
    label: "Transport",
    icon: <DirectionsBusIcon />,
    gradient: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
  },
  medicine: {
    label: "Medicine",
    icon: <MedicationIcon />,
    gradient: "linear-gradient(135deg,#84fab0,#8fd3f4)",
  },
  groceries: {
    label: "Groceries",
    icon: <LocalGroceryStoreIcon />,
    gradient: "linear-gradient(135deg,#f6d365,#fda085)",
  },
  rent: {
    label: "Rent",
    icon: <KeyIcon />,
    gradient: "linear-gradient(135deg,#667eea,#764ba2)",
  },
  gifts: {
    label: "Gifts",
    icon: <CardGiftcardIcon />,
    gradient: "linear-gradient(135deg,#ff758c,#ff7eb3)",
  },
  savings: {
    label: "Savings",
    icon: <SavingsIcon />,
    gradient: "linear-gradient(135deg,#43e97b,#38f9d7)",
  },
  entertainment: {
    label: "Entertainment",
    icon: <ConfirmationNumberIcon />,
    gradient: "linear-gradient(135deg,#fa709a,#fee140)",
  },
};