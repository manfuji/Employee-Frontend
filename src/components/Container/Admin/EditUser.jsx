import React, { useState, useEffect, useRef } from "react";

import { useReactToPrint } from "react-to-print";

import ComponentToPrint from "../pages/ComponentToPrint";

function Dashboard(props) {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  return (
    <>
     
      <div className="container">
        <ComponentToPrint ref={componentRef} />
        <button className="btn btn-success" onClick={handlePrint}>
          Print out sales
        </button>
      </div>
      
    </>
  );
}

export default Dashboard;
