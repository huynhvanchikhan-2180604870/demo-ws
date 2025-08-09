import React from "react";
import Routers from "../../router/Routers.js";
import Footer from "./../Footer/Footer";
import Header from "./../Header/Header";

const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <Routers />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
