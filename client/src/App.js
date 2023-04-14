import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useReducer } from "react";
import { intialState, reducer } from "./reducer/useReducer";

import Header from "./componets/Layout/Header";
import Footer from "./componets/Layout/Footer";
import Home from "./componets/Home/Home";
import SignUp from "./componets/Authetication/SignUp";
import Login from "./componets/Authetication/Login";
import Contact from "./componets/Contact/Contact";
import About from "./componets/About/About";
import ErrorPage from "./componets/Extra/ErrorPage";
import Logout from "./componets/Authetication/Logout";
import ProfileUpdate from "./componets/About/ProfileUpdate";
import PassUpdate from "./componets/About/PassUpdate";

import "./styles/app.css";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profileupdate" element={<ProfileUpdate />} />
      <Route path="/credentialupdate" element={<PassUpdate />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
};

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <Router>
      <UserContext.Provider value={{ state, dispatch }}>
        <Header />
        <Routing />
        <Footer />
      </UserContext.Provider>
    </Router>
  )
};

export default App;