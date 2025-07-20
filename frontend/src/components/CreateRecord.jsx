import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function CreateRecord() {
  const [personalInfo, setPersonalInfo] = useState({
    full_name: "",
    age: "",
    gender: "",
    height_cm: "",
    current_weight: "",
    target_weight: "",
    fitness_level: "",
    nutrition_preference: "",
    primary_goal: "",
    workout_days_per_week: "",
    time_per_session: "",
  });

  const [listPersonInfo, setListPersonInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  console.log("Is Edit: ", isEdit);
  const navigate = useNavigate();

  function handleInputChange(e) {
    setPersonalInfo((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  useEffect(() => {
    async function fetchPersonalInfo() {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/personal-info/"
      );
      console.log("Response: ", response.data);
      setListPersonInfo(response.data);
    }
    fetchPersonalInfo();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(personalInfo);
    setLoading(true);
    try {
      if (isEdit) {
        const response = await axios.patch(
          `http://127.0.0.1:8000/api/personal-info/${personalInfo.id}/`,
          personalInfo
        );

        console.log("Edit Data: ", response.data.data);
        if (response.status === 200) {
          setListPersonInfo((prevList) =>
            prevList.map((person) =>
              person.id === personalInfo.id ? response.data.data : person
            )
          );
        }
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/personal-info/",
          personalInfo
        );
        if (response.status === 201) {
          setListPersonInfo((prevList) => [...prevList, response.data.data]);
        }
      }

      setPersonalInfo({
        full_name: "",
        age: "",
        gender: "",
        height_cm: "",
        current_weight: "",
        target_weight: "",
        fitness_level: "",
        nutrition_preference: "",
        primary_goal: "",
        workout_days_per_week: "",
        time_per_session: "",
      });
      setIsEdit(false);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  }

  // Add a cancel edit function
  function handleCancelEdit() {
    setPersonalInfo({
      full_name: "",
      age: "",
      gender: "",
      height_cm: "",
      current_weight: "",
      target_weight: "",
      fitness_level: "",
      nutrition_preference: "",
      primary_goal: "",
      workout_days_per_week: "",
      time_per_session: "",
    });
    setIsEdit(false);
  }

  function handleEdit(personal) {
    setPersonalInfo(personal);
    setIsEdit(true);
  }

  function handleView(personalId) {
    navigate(`/workout-diet-planner/${personalId}`);
  }

  async function handleDelete(personalId) {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/personal-info/${personalId}/`
    );
    // console.log("Response: ", response.data);
    setListPersonInfo((prevPersonalInfo) =>
      prevPersonalInfo.filter((person) => person.id !== personalId)
    );
  }
  return (
    <>
      <div className="container-fluid bg-light min-vh-100 py-5">
        <div className="container">
          {/* Header Section */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <div className="bg-gradient bg-primary text-white p-4 rounded-3 shadow-lg">
                <h1 className="display-6 fw-bold mb-2">
                  <i className="bi bi-activity me-3"></i>
                  AI Gym Workout & Diet Planner
                </h1>
                <p className="lead mb-0">
                  Transform your fitness journey with personalized AI
                  recommendations
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              <div className="card shadow-lg border-0">
                <div className="card-header bg-white py-4">
                  <h3 className="card-title text-center mb-0 text-primary fw-bold">
                    {isEdit
                      ? "Edit Your Information"
                      : "Tell Us About Yourself"}
                  </h3>
                </div>
                <div className="card-body p-5">
                  <form onSubmit={handleSubmit}>
                    {/* Personal Information Section */}
                    <div className="mb-5">
                      <h5 className="text-secondary mb-4 fw-semibold border-bottom pb-2">
                        <i className="bi bi-person-circle me-2"></i>Personal
                        Information
                      </h5>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label
                            htmlFor="fullName"
                            className="form-label fw-semibold"
                          >
                            Full Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="fullName"
                            name="full_name"
                            value={personalInfo.full_name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div className="col-md-6 mb-4">
                          <label
                            htmlFor="age"
                            className="form-label fw-semibold"
                          >
                            Age <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            id="age"
                            name="age"
                            value={personalInfo.age}
                            onChange={handleInputChange}
                            placeholder="Enter your age"
                            min="16"
                            max="80"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold mb-3">
                          Gender <span className="text-danger">*</span>
                        </label>
                        <div className="d-flex gap-4">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="male"
                              checked={personalInfo.gender === "Male"}
                              onChange={handleInputChange}
                              value="Male"
                            />
                            <label
                              className="form-check-label fw-medium"
                              htmlFor="male"
                            >
                              <i className="bi bi-gender-male me-2"></i>Male
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="female"
                              checked={personalInfo.gender === "Female"}
                              onChange={handleInputChange}
                              value="Female"
                            />
                            <label
                              className="form-check-label fw-medium"
                              htmlFor="female"
                            >
                              <i className="bi bi-gender-female me-2"></i>Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Physical Metrics Section */}
                    <div className="mb-5">
                      <h5 className="text-secondary mb-4 fw-semibold border-bottom pb-2">
                        <i className="bi bi-rulers me-2"></i>Physical Metrics
                      </h5>

                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <label
                            htmlFor="height"
                            className="form-label fw-semibold"
                          >
                            Height (cm) <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            id="height"
                            placeholder="e.g., 175"
                            min="140"
                            max="220"
                            name="height_cm"
                            value={personalInfo.height_cm}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-4 mb-4">
                          <label
                            htmlFor="currentWeight"
                            className="form-label fw-semibold"
                          >
                            Current Weight (kg){" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            id="currentWeight"
                            placeholder="e.g., 70"
                            min="30"
                            max="200"
                            name="current_weight"
                            value={personalInfo.current_weight}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-4 mb-4">
                          <label
                            htmlFor="targetWeight"
                            className="form-label fw-semibold"
                          >
                            Target Weight (kg){" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            id="targetWeight"
                            placeholder="e.g., 65"
                            min="30"
                            max="200"
                            name="target_weight"
                            value={personalInfo.target_weight}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preferences Section */}
                    <div className="mb-5">
                      <h5 className="text-secondary mb-4 fw-semibold border-bottom pb-2">
                        <i className="bi bi-gear me-2"></i>Preferences & Goals
                      </h5>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label
                            htmlFor="fitnessLevel"
                            className="form-label fw-semibold"
                          >
                            Fitness Level <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select form-select-lg"
                            id="fitnessLevel"
                            name="fitness_level"
                            value={personalInfo.fitness_level}
                            onChange={handleInputChange}
                          >
                            <option value="">Choose your fitness level</option>
                            <option value="Beginner">🌱 Beginner</option>
                            <option value="Intermediate">
                              🏃 Intermediate
                            </option>
                            <option value="Advanced">💪 Advanced</option>
                          </select>
                        </div>

                        <div className="col-md-6 mb-4">
                          <label
                            htmlFor="nutritionLevel"
                            className="form-label fw-semibold"
                          >
                            Nutrition Preference{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select form-select-lg"
                            id="nutritionLevel"
                            name="nutrition_preference"
                            value={personalInfo.nutrition_preference}
                            onChange={handleInputChange}
                          >
                            <option value="">
                              Choose your nutrition preference
                            </option>
                            <option value="Vegan">🌱 Vegan</option>
                            <option value="Vegetarian">🥗 Vegetarian</option>
                            <option value="Non-Vegetarian">
                              🍖 Non-Vegetarian
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="goalType"
                          className="form-label fw-semibold"
                        >
                          Primary Goal <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select form-select-lg"
                          id="goalType"
                          name="primary_goal"
                          value={personalInfo.primary_goal}
                          onChange={handleInputChange}
                        >
                          <option value="">Choose your primary goal</option>
                          <option value="Weight Loss">🔥 Weight Loss</option>
                          <option value="Muscle Gain">💪 Muscle Gain</option>
                          <option value="Strength Building">
                            🏋️ Strength Building
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="mb-5">
                      <h5 className="text-secondary mb-4 fw-semibold border-bottom pb-2">
                        <i className="bi bi-calendar-week me-2"></i>Workout
                        Schedule
                      </h5>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label
                            htmlFor="workoutPerWeek"
                            className="form-label fw-semibold"
                          >
                            Workout Days per Week{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={7}
                            className="form-control form-control-lg"
                            id="workoutPerWeek"
                            placeholder="e.g., 4"
                            name="workout_days_per_week"
                            value={personalInfo.workout_days_per_week}
                            onChange={handleInputChange}
                          />
                          <div className="form-text">
                            Choose between 1-7 days per week
                          </div>
                        </div>

                        <div className="col-md-6 mb-4">
                          <label
                            htmlFor="timeAvailabilityPerDay"
                            className="form-label fw-semibold"
                          >
                            Time per Session (minutes){" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            id="timeAvailabilityPerDay"
                            placeholder="e.g., 60"
                            min="15"
                            max="180"
                            name="time_per_session"
                            value={personalInfo.time_per_session}
                            onChange={handleInputChange}
                          />
                          <div className="form-text">
                            Duration in minutes per workout session
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5 py-3 fw-semibold"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            {isEdit ? "Updating..." : "Generating..."}
                          </>
                        ) : (
                          <>
                            <i className="bi bi-rocket-takeoff me-2"></i>
                            {isEdit ? "Update My Plan" : "Generate My AI Plan"}
                          </>
                        )}
                      </button>
                      {isEdit && (
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg px-5 py-3 fw-semibold"
                          onClick={() => handleCancelEdit()}
                        >
                          <i className="bi bi-x-circle me-2"></i>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-gradient bg-primary text-white py-4">
                <h4 className="mb-0 fw-bold text-center">
                  <i className="bi bi-table me-3"></i>
                  Personalized Workout and Diet Planner Data
                </h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-striped mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 fw-semibold text-primary"
                        >
                          <i className="bi bi-person me-2"></i>Full Name
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 fw-semibold text-primary"
                        >
                          <i className="bi bi-calendar me-2"></i>Age
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 fw-semibold text-primary"
                        >
                          <i className="bi bi-gender-ambiguous me-2"></i>Gender
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 fw-semibold text-primary text-center"
                        >
                          <i className="bi bi-gear me-2"></i>Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listPersonInfo.map((person, index) => {
                        return (
                          <tr key={index} className="align-middle">
                            <td className="px-4 py-3">
                              <div className="d-flex align-items-center">
                                <div
                                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                                  style={{ width: "40px", height: "40px" }}
                                >
                                  <i className="bi bi-person-fill text-white"></i>
                                </div>
                                <div>
                                  <span className="fw-semibold">
                                    {person.full_name}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="badge bg-light text-dark border">
                                {person.age} years
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`badge ${
                                  person.gender === "Male"
                                    ? "bg-info"
                                    : "bg-warning"
                                }`}
                              >
                                {person.gender}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="btn-group" role="group">
                                <button
                                  onClick={() => handleEdit(person)}
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  <i className="bi bi-pencil me-1"></i>Edit
                                </button>
                                <button
                                  onClick={() => handleView(person.id)}
                                  className="btn btn-outline-success btn-sm"
                                >
                                  <i className="bi bi-eye me-1"></i>View
                                </button>
                                <button
                                  onClick={() => handleDelete(person.id)}
                                  className="btn btn-outline-danger btn-sm"
                                >
                                  <i className="bi bi-trash me-1"></i>Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {listPersonInfo.length === 0 && (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox display-1 text-muted"></i>
                    <p className="text-muted mt-3">
                      No records found. Create your first record above!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRecord;
