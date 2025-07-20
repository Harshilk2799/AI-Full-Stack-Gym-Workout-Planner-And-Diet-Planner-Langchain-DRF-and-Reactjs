from rest_framework import serializers
from App.models import *

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields = ["id","full_name", "age", "gender", "height_cm", "current_weight", "target_weight", "fitness_level",
        "nutrition_preference", "primary_goal", "workout_days_per_week", "time_per_session"]
 
class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ["exercise_name", "exercise_reps", "exercise_delay", "exercise_sets", "exercise_duration", "muscle_groups",
        "equipment_needed", "difficulty_level"]
        
class DayWorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)
    class Meta:
        model = DayWorkout
        fields = ["day", "workout_type", "exercises", "total_duration", "warm_up", "cool_down"]

class WorkoutPlannerSerializer(serializers.ModelSerializer):
    weekly_schedule = DayWorkoutSerializer(many=True)
    class Meta:
        model = WorkoutPlanner
        fields = ["personal_info","weekly_schedule", "rest_days", "progression_notes", "safety_tips"]

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ["meal_name", "meal_type", "ingredients", "portion_size", "calories", "protein",
                  "carbs", "fats", "prep_time"]

class DayMealPlanSerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True)
    class Meta:
        model = DayMealPlan
        fields = ["day", "meals", "daily_calories", "daily_protein"]

class DietPlannerSerializer(serializers.ModelSerializer):
    weekly_plan = DayMealPlanSerializer(many=True)
    class Meta:
        model = DietPlanner
        fields = ["weekly_plan","hydration_tips", "special_notes", "supplement_suggestions"]
