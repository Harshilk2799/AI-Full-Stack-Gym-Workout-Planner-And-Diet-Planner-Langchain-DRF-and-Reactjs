from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from decouple import config
from langchain.schema.runnable import RunnableParallel
from pydantic import BaseModel, Field
from typing import List, Annotated, Optional, Literal

class Exercise(BaseModel):
    exercise_name: Annotated[str, Field(description="Name of the exercise")]
    exercise_reps: Annotated[int, Field(description="Number of repetitions")]
    exercise_delay: Annotated[str, Field(description="Rest time between sets")]
    exercise_sets: Annotated[int, Field(description="Number of sets")]
    exercise_duration: Annotated[str, Field(description="Duration of the exercise")]
    muscle_groups: Annotated[List[str], Field(description="Target muscle groups")]
    equipment_needed: Annotated[str, Field(description="Equipment required")]
    difficulty_level: Annotated[Literal["Beginner", "Intermediate", "Advanced"], Field(description="provided difficulty level")]

class DayWorkout(BaseModel):
    day: Annotated[str, Field(description="Day of the week or Day number", examples=["Monday", "Tuesday", "Wednesday"])]
    workout_type: Annotated[str, Field(description="Type of workout (Upper Body, Lower Body, Full Body, Cardio, Rest)")]
    exercises: Annotated[List[Exercise], Field(description="List of exercises for this day")]
    total_duration: Annotated[str, Field(description="Expected total workout duration")]
    warm_up: Annotated[str, Field(description="Warm-up routine")]
    cool_down: Annotated[str, Field(description="Cool-down routine")]

class WorkoutPlanner(BaseModel):
    weekly_schedule: Annotated[List[DayWorkout], Field(description="Weekly workout schedule based on workout days")]
    rest_days: Annotated[List[str], Field(description="Designated rest days")]
    progression_notes: Annotated[str, Field(description="How to progress over time")]
    safety_tips: Annotated[str, Field(description="Important safety considerations")]

class Meal(BaseModel):
    meal_name: Annotated[str, Field(description="Name of the meal", examples=["Monday", "Tuesday", "Wednesday"])]
    meal_type: Annotated[str, Field(description="Type of meal (breakfast, lunch, dinner, snack)")]
    ingredients: Annotated[List[str], Field(description="List of ingredients")]
    portion_size: Annotated[str, Field(description="Recommended portion size")]
    calories: Annotated[Optional[int], Field(description="Estimated calories", default=None)]
    protein: Annotated[Optional[str], Field(description="Protein content", default=None)]
    carbs: Annotated[Optional[str], Field(description="Carbohydrate content", default=None)]
    fats: Annotated[Optional[str], Field(description="Fat content", default=None)]
    prep_time: Annotated[Optional[str], Field(description="Preparation time", default=None)]

class DayMealPlan(BaseModel):
    day: Annotated[str, Field(description="Day of the week")]
    meals: Annotated[List[Meal], Field(description="List of meals for the day")]
    daily_calories: Annotated[Optional[int], Field(description="Total daily calories", default=None)]
    daily_protein: Annotated[Optional[str], Field(description="Total daily protein", default=None)]

class DietPlanner(BaseModel):
    weekly_plan: Annotated[List[DayMealPlan], Field(description="7-day meal plan")]
    hydration_tips: Annotated[str, Field(description="Daily hydration recommendations")]
    special_notes: Annotated[str, Field(description="Special dietary notes based on goals")]
    supplement_suggestions: Annotated[Optional[str], Field(description="Supplement recommendations", default=None)]

def workout_diet_planner(full_name, age, gender, height_cm, current_weight, target_weight, fitness_level, nutrition_preference, primary_goal, workout_days_per_week, time_per_session):
    chat_model = ChatGoogleGenerativeAI(model="gemini-2.0-flash", api_key=config("GOOGLE_API_KEY"))

    # Prompt Design for Workout planner
    prompt1 = PromptTemplate(
    template="""
        I want you to act as a certified personal trainer and nutritionist. Based on the following user profile, generate a personalized weekly workout plan and basic nutrition guidance.

        The plan should:
        - Align with the user's fitness level and primary goal
        - Include types of workouts (e.g., strength, cardio, HIIT)
        - Provide recommended sets, reps, or duration
        - Specify rest days and workout intensity
        - Offer a brief nutrition suggestion based on dietary preference

        User Profile:
        - Full Name: {full_name}
        - Age: {age} years
        - Gender: {gender}
        - Height: {height_cm} cm
        - Current Weight: {current_weight} kg
        - Target Weight: {target_weight} kg
        - Fitness Level: {fitness_level}
        - Nutrition Preference: {nutrition_preference}
        - Primary Goal: {primary_goal}
        - Workout Days/Week: {workout_days_per_week}
        - Time per Session: {time_per_session} minutes
        """,
        input_variables=["full_name", "age", "gender", "height_cm", "current_weight", "target_weight", "fitness_level", "nutrition_preference",
        "primary_goal", "workout_days_per_week", "time_per_session"],
        validate_template=True
    ) 

    
    # Prompt Design for nutritionist planner
    prompt2 = PromptTemplate(
    template="""

        I want you to act as a certified nutritionist and diet planner. Based on the following user profile, create a 7-day personalized diet plan.

        The plan should:
        - Match the user's nutrition preference and primary goal
        - Be appropriate for their fitness level and workout frequency
        - Include meals for breakfast, lunch, dinner, and snacks each day
        - Provide estimated portion sizes and macros (protein, carbs, fats)
        - Include hydration tips and any special nutrients relevant to the goal

        User Profile:
        - Full Name: {full_name}
        - Age: {age} years
        - Gender: {gender}
        - Height: {height_cm} cm
        - Current Weight: {current_weight} kg
        - Target Weight: {target_weight} kg
        - Fitness Level: {fitness_level}
        - Nutrition Preference: {nutrition_preference}
        - Primary Goal: {primary_goal}
        - Workout Days/Week: {workout_days_per_week}
        - Time per Session: {time_per_session} minutes

        """,
        input_variables=["full_name", "age", "gender", "height_cm", "current_weight", "target_weight", "fitness_level", "nutrition_preference",
        "primary_goal", "workout_days_per_week", "time_per_session"],
        validate_template=True
    )

    paraller_chain = RunnableParallel({
        "workout": prompt1 | chat_model.with_structured_output(WorkoutPlanner),
        "diet": prompt2 | chat_model.with_structured_output(DietPlanner)
    })

    response = paraller_chain.invoke({
        "full_name": full_name,
        "age": age, 
        "gender": gender, 
        "height_cm": height_cm, 
        "current_weight": current_weight, 
        "target_weight": target_weight, 
        "fitness_level": fitness_level, 
        "nutrition_preference": nutrition_preference, 
        "primary_goal": primary_goal, 
        "workout_days_per_week": workout_days_per_week, 
        "time_per_session": time_per_session
    })

    # Convert to pure dict
    dict_response = {
        "workout": response["workout"].model_dump(),
        "diet": response["diet"].model_dump()
    }

    print("Data: ", dict_response["diet"])
    return dict_response
