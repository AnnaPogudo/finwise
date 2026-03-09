import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTE } from "./routes";
import { Categories } from "./pages/Categories/Categories";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { EditProfilePage } from "./pages/EditProfilePage/EditProfilePage";
import { SecurityPage } from "./pages/SecurityPage/SecurityPage";
import { HelpPage } from "./pages/HelpPage/HelpPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import WelcomePage from "./pages/WelcomePage/WelcomPage";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import { useAppSelector } from "./storage/hooks/useAppDispatch";
import  AddPage  from "./pages/AddPage/AddPage";

const MIN_LOADING_MS = 2000;

export const App = () => {
  const authLoading = useAppSelector((state) => state.auth.loading);
  const transactionsLoading = useAppSelector(
    (state) => state.transactions.loading
  );
  const isGlobalLoading = authLoading || transactionsLoading;

  const [minLoadingEndTime, setMinLoadingEndTime] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (isGlobalLoading) {
      setMinLoadingEndTime((prev) => {
        const end = Date.now() + MIN_LOADING_MS;
        return prev == null ? end : Math.max(prev, end);
      });
    }
  }, [isGlobalLoading]);

  useEffect(() => {
    if (isGlobalLoading || minLoadingEndTime == null) return;
    const remaining = minLoadingEndTime - Date.now();
    if (remaining <= 0) {
      setMinLoadingEndTime(null);
      return;
    }
    const timeout = setTimeout(() => setMinLoadingEndTime(null), remaining);
    return () => clearTimeout(timeout);
  }, [isGlobalLoading, minLoadingEndTime]);

  const showLoading = isGlobalLoading || minLoadingEndTime != null;
  const userId = useAppSelector((s) => s.auth.user?.id);

  return (
    <>
      <Routes>
        <Route path={ROUTE.WELCOME_PAGE()} element={<WelcomePage />}></Route>
        <Route path={ROUTE.LOGIN()} element={<LoginPage />} />
        <Route path={ROUTE.SIGN_UP()} element={<RegisterPage />} />
        <Route path={ROUTE.HOME()} element={<MainPage />} />
        <Route path={ROUTE.PROFILE()} element={<ProfilePage />} />
        <Route path={ROUTE.PROFILE_EDIT()} element={<EditProfilePage key={userId ?? "anon"} />} />
        <Route path={ROUTE.PROFILE_SECURITY()} element={<SecurityPage />} />
        <Route path={ROUTE.PROFILE_HELP()} element={<HelpPage />} />
        <Route path={ROUTE.CATEGORIES()} element={<Categories />} />
        <Route path="/home/add/:categoryId" element={<AddPage />} />
      </Routes>

      {showLoading && <LoadingPage />}
    </>
  );
};
