// rrd
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// components
import Table from "../components/Table";

// helper
import { deleteItem, fetchData, wait } from "../helpers";

// loader
export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  return expenses;
}

// action
export const expensesAction = async ({ request }) => {
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
};

const ExpensesPage = () => {
  const expenses = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};
export default ExpensesPage;
