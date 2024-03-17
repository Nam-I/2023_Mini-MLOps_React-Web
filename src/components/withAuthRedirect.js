import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuthRedirect = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const accessToken = localStorage.getItem("access-token");
      if (!accessToken) {
        navigate("/sign-in");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;
