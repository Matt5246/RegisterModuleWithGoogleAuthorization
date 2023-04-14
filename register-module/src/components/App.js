import React from "react";
import {Container} from "react-bootstrap";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard.js";
import Signin from "./Signin.js";
import PrivateRoutes from "./privateRoutes.js";
import ForgotPassword from "./ForgotPassword.js";
import UpdateProfile from "./UpdateProfile.js";
import SignupSummary from "./SignupSummary.js";
import SignupPage from "./SignupPage.js";
import {AiFillPicture} from "react-icons/ai";
import { backgroundImage, darkTheme, lightTheme } from "../config/options.js";


function App() {
  const [selectedBackgroundImage, setSelectedBackgroundImage] = React.useState(backgroundImage.space); // [state, setState
  const [theme, setTheme] = React.useState(darkTheme);

  const toggleBackground = () => {
    const newBackgroundImage = selectedBackgroundImage === backgroundImage.space 
      ? backgroundImage.lines 
      : backgroundImage.space;
    setSelectedBackgroundImage(newBackgroundImage);
  };

  React.useEffect(() => {
    document.documentElement.style.setProperty('--text-color', theme.text);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <div style={{backgroundImage:` url(${selectedBackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    height: "100%",
    color: theme.text,   
    }}>
    
      <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
        <AuthProvider>
          <Router>
            <Routes>
               <Route element={<PrivateRoutes/>}>
                <Route path="/update-profile" element={<UpdateProfile textColor={theme.text}/>} />
                <Route path="/" element={<Dashboard textColor={theme.text}/>} />
               </Route>
              <Route path="/signup-summary" element={<SignupSummary textColor={theme.text}/>} />
              <Route path="/signup" element={<SignupPage textColor={theme.text}/>} />
              <Route path="/signin" element={<Signin textColor={theme.text} />} />        
              <Route path="/forgot-password" element={<ForgotPassword textColor={theme.text}/>} />    
            </Routes>
          </Router>
        </AuthProvider>          
        </div>
      </Container>
      <button 
      style={{
        position: "fixed",
        bottom: "16px",
        right: "45px",
        border: "none",
        outline: "none",
        background: "none",
        color: "white",
      }}
      onClick={toggleBackground}
      ><AiFillPicture/></button>
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px",
          borderRadius: "50%",
          background: theme.text,
          border: "none",
          outline: "none",
        }}
        onClick={toggleTheme}
      ></button>
      </div>
  );
}

export default App;
