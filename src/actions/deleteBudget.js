// rrd
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helper functions
import { deleteItem, getAllMatchingItems } from "../helpers";

export const deleteBudget = ({ params }) => {
  deleteItem({
    key: "budgets",
    id: params.budgetId,
  });

  const associatedExpenses = getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.budgetId,
  });

  associatedExpenses.forEach((expense) => {
    deleteItem({
      key: "expenses",
      id: expense.id,
    });
  });

  toast.success("Budget deleted successfully!");

  return redirect("/");
};
