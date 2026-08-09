import { createContext, useContext, useState } from "react";
import { student as baseStudent } from "../data/mockData";

const DemoStateContext = createContext(null);

// Wraps the mock student in editable state so the prototype can demonstrate
// first-day, missed-day, and empty-profile scenarios interactively —
// purely local, resets on refresh.
export function DemoStateProvider({ children }) {
  const [scenario, setScenario] = useState("normal"); // normal | first-day | missed-day | empty-profile
  const [completedProofs, setCompletedProofs] = useState({ github: false, linkedin: false });

  let student = { ...baseStudent };

  if (scenario === "first-day") {
    student = {
      ...student,
      currentDay: 1,
      completedDays: 0,
      currentStreak: 0,
      overallCompletion: 0,
      githubSubmissions: 0,
      linkedinSubmissions: 0,
      momentumScore: 0,
      missedYesterday: false,
      profileComplete: true,
    };
  } else if (scenario === "missed-day") {
    student = { ...student, currentStreak: 0, missedYesterday: true };
  } else if (scenario === "empty-profile") {
    student = { ...student, profileComplete: false };
  } else if (scenario === "challenge-complete") {
    student = {
      ...student,
      currentDay: 60,
      completedDays: 60,
      currentStreak: 60,
      overallCompletion: 100,
      githubSubmissions: 60,
      linkedinSubmissions: 58,
      momentumScore: 98,
    };
  }

  const value = { student, scenario, setScenario, completedProofs, setCompletedProofs };
  return <DemoStateContext.Provider value={value}>{children}</DemoStateContext.Provider>;
}

export function useDemoState() {
  const ctx = useContext(DemoStateContext);
  if (!ctx) throw new Error("useDemoState must be used within DemoStateProvider");
  return ctx;
}
