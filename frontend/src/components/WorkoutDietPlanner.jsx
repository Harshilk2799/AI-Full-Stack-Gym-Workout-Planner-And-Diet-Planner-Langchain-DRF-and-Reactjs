import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

function WorkoutDietPlanner() {
  const [workoutPlanner, setWorkoutPlanner] = useState([]);
  const [dietPlanner, setDietPlanner] = useState([]);
  const { personId } = useParams();

  console.log("Person ID: ", personId);

  useEffect(() => {
    async function workoutDietFetch() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/personal-info/${personId}/workout-planner/`
      );

      setWorkoutPlanner(response.data.workout_planner);
      setDietPlanner(response.data.diet_planner);
    }

    workoutDietFetch();
  }, []);

  console.log("workoutPlanner: ", workoutPlanner);
  console.log("dietPlanner: ", dietPlanner);

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          {/* Header */}
          <div className="mb-5">
            <h1 className="display-4 text-center text-primary mb-2 fw-bold">
              <i className="fas fa-dumbbell me-3"></i>
              Workout & Diet Planner
            </h1>
            <p className="text-center text-muted fs-5">
              Your personalized fitness and nutrition guide
            </p>
          </div>

          {/* Workout Planner Section */}
          <div className="card shadow-lg mb-5 border-0">
            <div className="card-header bg-gradient bg-primary text-white py-3">
              <h3 className="card-title mb-0 fw-bold">
                <i className="fas fa-running me-2"></i>
                Workout Planner
              </h3>
            </div>
            <div className="card-body p-4">
              {/* Progression Notes */}
              <div className="mb-4">
                <h5 className="text-secondary fw-bold mb-3">
                  <i className="fas fa-chart-line me-2"></i>
                  Progression Notes
                </h5>
                <div className="alert alert-info border-0 shadow-sm">
                  <i className="fas fa-info-circle me-2"></i>
                  {workoutPlanner.progression_notes ||
                    "No progression notes available"}
                </div>
              </div>

              {/* Rest Days */}
              <div className="mb-4">
                <h5 className="text-secondary fw-bold mb-3">
                  <i className="fas fa-bed me-2"></i>
                  Rest Days
                </h5>
                <div className="row g-3">
                  {workoutPlanner?.rest_days?.map((day, index) => (
                    <div key={index} className="col-md-3 col-sm-4 col-6">
                      <span className="badge bg-secondary fs-6 w-100 py-2 rounded-pill">
                        {day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Tips */}
              <div className="mb-4">
                <h5 className="text-secondary fw-bold mb-3">
                  <i className="fas fa-shield-alt me-2"></i>
                  Safety Tips
                </h5>
                <div className="alert alert-warning border-0 shadow-sm">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {workoutPlanner.safety_tips || "No safety tips available"}
                </div>
              </div>

              {/* Weekly Schedule */}
              <div className="mb-4">
                <h5 className="text-secondary fw-bold mb-3">
                  <i className="fas fa-calendar-week me-2"></i>
                  Weekly Schedule
                </h5>
                <div className="row g-4">
                  {workoutPlanner.weekly_schedule?.map((weeklyData, index) => (
                    <div key={index} className="col-lg-6 col-md-12">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-header bg-gradient bg-success text-white py-3">
                          <h6 className="mb-0 text-center fw-bold">
                            <i className="fas fa-calendar-day me-2"></i>
                            {weeklyData.day}
                          </h6>
                        </div>
                        <div className="card-body p-4">
                          <div className="row mb-3">
                            <div className="col-6">
                              <small className="text-muted">Workout Type</small>
                              <div className="fw-bold text-primary">
                                {weeklyData.workout_type}
                              </div>
                            </div>
                            <div className="col-6">
                              <small className="text-muted">Duration</small>
                              <div className="fw-bold">
                                <i className="fas fa-clock me-1"></i>
                                {weeklyData.total_duration}
                              </div>
                            </div>
                          </div>

                          {/* Exercises */}
                          <div className="mb-3">
                            <small className="text-muted fw-bold">
                              Exercises
                            </small>
                            <div className="mt-2">
                              {weeklyData.exercises?.map(
                                (exercise, exerciseIndex) => (
                                  <div
                                    key={exerciseIndex}
                                    className="card mb-2 border-light"
                                  >
                                    <div className="card-body p-3">
                                      <div className="row align-items-center">
                                        <div className="col-12 col-md-6">
                                          <h6 className="mb-1 text-dark fw-bold">
                                            {exercise.exercise_name}
                                          </h6>
                                          <div className="mb-2">
                                            <span
                                              className={`badge ${
                                                exercise.difficulty_level ===
                                                "Beginner"
                                                  ? "bg-success"
                                                  : exercise.difficulty_level ===
                                                    "Intermediate"
                                                  ? "bg-warning"
                                                  : "bg-danger"
                                              } me-1`}
                                            >
                                              {exercise.difficulty_level}
                                            </span>
                                            {exercise.equipment_needed && (
                                              <span className="badge bg-info">
                                                {exercise.equipment_needed}
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                          <div className="small text-muted">
                                            <div className="d-flex justify-content-between">
                                              <span>Sets:</span>
                                              <span className="fw-bold">
                                                {exercise.exercise_sets}
                                              </span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                              <span>Reps:</span>
                                              <span className="fw-bold">
                                                {exercise.exercise_reps}
                                              </span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                              <span>Duration:</span>
                                              <span className="fw-bold">
                                                {exercise.exercise_duration}
                                              </span>
                                            </div>
                                            {exercise.exercise_delay && (
                                              <div className="d-flex justify-content-between">
                                                <span>Rest:</span>
                                                <span className="fw-bold">
                                                  {exercise.exercise_delay}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      {exercise.muscle_groups?.length > 0 && (
                                        <div className="mt-2">
                                          <small className="text-muted">
                                            Muscle Groups:
                                          </small>
                                          <div className="mt-1">
                                            {exercise.muscle_groups.map(
                                              (muscle_group, mgIndex) => (
                                                <span
                                                  key={mgIndex}
                                                  className="badge bg-light text-dark me-1 mb-1"
                                                >
                                                  {muscle_group}
                                                </span>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-6">
                              <small className="text-muted">Warm Up</small>
                              <div className="text-success">
                                <i className="fas fa-fire me-1"></i>
                                {weeklyData.warm_up}
                              </div>
                            </div>
                            <div className="col-6">
                              <small className="text-muted">Cool Down</small>
                              <div className="text-info">
                                <i className="fas fa-snowflake me-1"></i>
                                {weeklyData.cool_down}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Diet Planner Section */}
          <div className="card shadow-lg mb-5 border-0">
            <div className="card-header bg-gradient bg-warning text-white py-3">
              <h3 className="card-title mb-0 fw-bold">
                <i className="fas fa-utensils me-2"></i>
                Diet Planner
              </h3>
            </div>
            <div className="card-body p-4">
              {/* Hydration Tips */}
              <div className="mb-4">
                <h5 className="text-secondary fw-bold mb-3">
                  <i className="fas fa-tint me-2"></i>
                  Hydration Tips
                </h5>
                <div className="alert alert-info border-0 shadow-sm">
                  <i className="fas fa-info-circle me-2"></i>
                  {dietPlanner.hydration_tips || "No hydration tips available"}
                </div>
              </div>

              {/* Special Notes */}
              <div className="mb-4">
                <h5 className="text-secondary fw-bold mb-3">
                  <i className="fas fa-sticky-note me-2"></i>
                  Special Notes
                </h5>
                <div className="alert alert-warning border-0 shadow-sm">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {dietPlanner.special_notes || "No special notes available"}
                </div>
              </div>

              {/* Supplement Suggestions */}
              <div className="mb-4">
                <h5 className="text-secondary fw-bold mb-3">
                  <i className="fas fa-pills me-2"></i>
                  Supplement Suggestions
                </h5>
                <div className="alert alert-success border-0 shadow-sm">
                  <i className="fas fa-check-circle me-2"></i>
                  {dietPlanner.supplement_suggestions ||
                    "No supplement suggestions available"}
                </div>
              </div>

              {/* Weekly Diet Plan */}
              <div className="mb-4">
                <h5 className="text-secondary fw-bold mb-3">
                  <i className="fas fa-calendar-week me-2"></i>
                  Weekly Diet Plan
                </h5>
                <div className="row g-4">
                  {dietPlanner.weekly_plan?.map((dayData, index) => (
                    <div key={index} className="col-lg-6 col-md-12">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-header bg-gradient bg-info text-white py-3">
                          <h6 className="mb-0 text-center fw-bold">
                            <i className="fas fa-calendar-day me-2"></i>
                            {dayData.day}
                          </h6>
                        </div>
                        <div className="card-body p-4">
                          <div className="row mb-3">
                            <div className="col-6">
                              <small className="text-muted">
                                Daily Calories
                              </small>
                              <div className="fw-bold text-primary">
                                <i className="fas fa-fire me-1"></i>
                                {dayData.daily_calories}
                              </div>
                            </div>
                            <div className="col-6">
                              <small className="text-muted">
                                Daily Protein
                              </small>
                              <div className="fw-bold text-success">
                                <i className="fas fa-dumbbell me-1"></i>
                                {dayData.daily_protein}
                              </div>
                            </div>
                          </div>

                          {/* Meals */}
                          <div className="mb-3">
                            <small className="text-muted fw-bold">Meals</small>
                            <div className="mt-2">
                              {dayData.meals?.map((meal, mealIndex) => (
                                <div
                                  key={mealIndex}
                                  className="card mb-2 border-light"
                                >
                                  <div className="card-body p-3">
                                    <div className="row align-items-center">
                                      <div className="col-12 col-md-6">
                                        <h6 className="mb-1 text-dark fw-bold">
                                          {meal.meal_name}
                                        </h6>
                                        <div className="mb-2">
                                          <span className="badge bg-primary me-1">
                                            {meal.meal_type}
                                          </span>
                                          <span className="badge bg-secondary">
                                            {meal.portion_size}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="col-12 col-md-6">
                                        <div className="small text-muted">
                                          <div className="d-flex justify-content-between">
                                            <span>Calories:</span>
                                            <span className="fw-bold">
                                              {meal.calories}
                                            </span>
                                          </div>
                                          <div className="d-flex justify-content-between">
                                            <span>Protein:</span>
                                            <span className="fw-bold">
                                              {meal.protein}
                                            </span>
                                          </div>
                                          <div className="d-flex justify-content-between">
                                            <span>Carbs:</span>
                                            <span className="fw-bold">
                                              {meal.carbs}
                                            </span>
                                          </div>
                                          <div className="d-flex justify-content-between">
                                            <span>Fats:</span>
                                            <span className="fw-bold">
                                              {meal.fats}
                                            </span>
                                          </div>
                                          <div className="d-flex justify-content-between">
                                            <span>Prep Time:</span>
                                            <span className="fw-bold">
                                              <i className="fas fa-clock me-1"></i>
                                              {meal.prep_time}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Ingredients */}
                                    {meal.ingredients?.length > 0 && (
                                      <div className="mt-2">
                                        <small className="text-muted">
                                          Ingredients:
                                        </small>
                                        <div className="mt-1">
                                          {meal.ingredients.map(
                                            (ingredient, ingredientIndex) => (
                                              <span
                                                key={ingredientIndex}
                                                className="badge bg-light text-dark me-1 mb-1"
                                              >
                                                {ingredient}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutDietPlanner;
