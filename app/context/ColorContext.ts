import React, { createContext, useContext } from "react";

type ColorContextType = {
  textPrimary: string;
  setTextPrimary: React.Dispatch<React.SetStateAction<string>>;
  bgPrimary: string;
  setBgPrimary: React.Dispatch<React.SetStateAction<string>>;
  textSecondary: string;
  setTextSecondary: React.Dispatch<React.SetStateAction<string>>;
};

export const ColorContext = createContext<ColorContextType | null>(null);

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
};
