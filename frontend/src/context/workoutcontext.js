import { createContext, useState } from "react";

export const WorkoutContext = createContext();

export const WorkoutContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  return (
    <WorkoutContext.Provider value={{ user, setUser }}>
      {children}
    </WorkoutContext.Provider>
  );
};

// false matlab abhi login nhi hai
