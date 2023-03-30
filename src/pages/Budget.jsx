// rrd
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// components
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helpers
import {
  createExpense,
  deleteItem,
  getAllMatchingItems,
  wait,
} from "../helpers";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.budgetId,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.budgetId,
  });

  if (!budget) {
    throw new Error("Budget doesn't exist!");
  }

  return { budget, expenses };
}

// action
export const budgetAction = async ({ request }) => {
  await wait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        id: values.expenseId,
        key: "expenses",
      });

      return toast.success(`Expense deleted!`);
    } catch (e) {
      throw new Error("There was a problem deleting your expense!");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      return toast.success(
        `Expense ${values.newExpense} created successfully!`
      );
    } catch (e) {
      throw new Error("There was a problem creating your expense!");
    }
  }
};

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};
export default BudgetPage;
