// rrd imports
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export function logoutAction() {
  // delete user
  deleteItem({
    key: "userName",
  });

  deleteItem({
    key: "budgets",
  });

  deleteItem({
    key: "expenses",
  });

  toast.success("You've deleted your account!");
  // redirect
  return redirect("/");
}
