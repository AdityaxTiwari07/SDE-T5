import React, { useEffect } from "react";
import { useGetKpisQuery } from "@/state/api";

const ApiTest = () => {
  const { data, error, isLoading } = useGetKpisQuery();

  useEffect(() => {
    if (isLoading) {
      console.log("Loading data...");
    }
    if (error) {
      console.error("Error fetching data:", error);
    }
    if (data) {
      console.log("KPI Data received:", data);
    }
  }, [data, error, isLoading]);

  return <div>Check the console for API responses.</div>;
};

export default ApiTest;
