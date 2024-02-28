"use client";
import React, { useState, useEffect } from "react";
import campaign from "../../../../ethereum/campaign";

const Page = () => {
  const [summary, setSummary] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summary = await campaign.methods.getSummary().call();
        setSummary(summary);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {summary && (
        <div>
          <div>Address: {summary[0]}</div>
          <div>Minimum Contribution: {summary[1]}</div>
          <div>Number of Requests: {summary[2]}</div>
          <div>Balance: {summary[3]}</div>
        </div>
      )}
    </div>
  );
};

export default Page;
