import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/HomePage.jsx";
import LoginPage from "scenes/LoginPage.jsx";
import ProfilePage from "scenes/ProfilePage.jsx";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { setPosts, setPage, setHasMore } from "state";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  dispatch(setPosts({ posts: [] }));
  dispatch(setPage({ page: 1 }));
  dispatch(setHasMore({ hasMore: true }));
  

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
