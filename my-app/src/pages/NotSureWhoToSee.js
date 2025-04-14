import React, { useState } from "react";
import SymptomForm from "../components/SymptomForm";
import { useNavigate } from "react-router-dom";

const NotSureWhoToSee = () => {
  const [symptomData, setSymptomData] = useState({});
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    setSymptomData(data);
    // In a real app, you might want to store data in global state (Redux/context) or pass via route state
    navigate("/ehr-summary", { state: data });
  };

  return (
    <div>
      <SymptomForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default NotSureWhoToSee;
