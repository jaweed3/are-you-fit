import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({});
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [matchResults, setMatchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const updateResumeData = (newData) => {
    setResumeData(prevData => ({
      ...prevData,
      ...newData
    }));
  };
  
  const resetResumeData = () => {
    setResumeData({});
    setJobDescription('');
    setAnalysisResults(null);
    setMatchResults(null);
    setError(null);
  };
  
  return (
    <ResumeContext.Provider value={{
      resumeData,
      updateResumeData,
      resetResumeData,
      jobDescription,
      setJobDescription,
      analysisResults,
      setAnalysisResults,
      matchResults,
      setMatchResults,
      loading,
      setLoading,
      error,
      setError
    }}>
      {children}
    </ResumeContext.Provider>
  );
};