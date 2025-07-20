import { BrowserRouter as Router, Routes, Route } from "react-router";
import CreateRecord from "./components/CreateRecord";
import WorkoutDietPlanner from "./components/WorkoutDietPlanner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateRecord />} />
        <Route
          path="/workout-diet-planner/:personId"
          element={<WorkoutDietPlanner />}
        />
      </Routes>
    </Router>
  );
}

export default App;
