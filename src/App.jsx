import { Route, Routes, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./utils/protectedRoutes";
const App = () => {
  const isAuth = localStorage.getItem("token");
  const Login = lazy(() => import("./pages/login"));
  const Home = lazy(() => import("./pages/homePage"));
  const Edit = lazy(() => import("./components/editPage"));
  const NotFound = lazy(() => import("./pages/pagenotfound"));

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/user/edit/:id" element={<Edit />} />
          </Route>
          <Route element={<ProtectedRoute isAuth={!isAuth} Redirect="/home" />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
