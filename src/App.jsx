// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/Expenses";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/Budget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <Error />,
        loader: dashboardLoader,
        action: dashboardAction,
      },
      {
        path: "budget/:budgetId",
        element: <BudgetPage />,
        errorElement: <Error />,
        loader: budgetLoader,
        action: budgetAction,
        children: [{ path: "delete", action: deleteBudget }],
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        errorElement: <Error />,
        loader: expensesLoader,
        action: expensesAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
