import { BrowserRouter ,Routes ,Navigate, Route, useNavigate } from "react-router-dom";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/ProfilePage";
import HomePage from "scenes/homepage/HomePage";


import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline , ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import Error from "scenes/Error";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // const navigate = useNavigate();
  const [themeMode ,setThemeMode] = useState(mode);

  const isAuth = useSelector((state) => state.token);

  return (
    <div className={`app ${themeMode}`}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
              <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/home" element={ isAuth ? (<HomePage/>) : (<Error/>)} />
                <Route path="/profile/:uid" element={ isAuth ? (<ProfilePage/>) : (<Error/>)} />




                <Route path='*' element={<Error />}/>

              </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
