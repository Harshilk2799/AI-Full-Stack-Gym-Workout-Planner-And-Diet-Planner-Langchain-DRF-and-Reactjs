from django.contrib import admin
from App.models import *

@admin.register(PersonalInfo)
class PersonalInfoAdmin(admin.ModelAdmin):
    list_display = ["id","full_name", "age", "gender", "height_cm", "current_weight", "target_weight",
    "fitness_level", "nutrition_preference", "primary_goal", "workout_days_per_week",
    "time_per_session"]
    
@admin.register(WorkoutPlanner)
class WorkoutPlannerAdmin(admin.ModelAdmin):
    list_display = ["id", "personal_info__full_name","rest_days", "progression_notes", "safety_tips"]

@admin.register(DayWorkout)
class DayWorkoutAdmin(admin.ModelAdmin):
    list_display = ["id","workout_planner", "day", "workout_type", "total_duration", "warm_up", "cool_down"]

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ["id","day_workout", "exercise_name", "exercise_reps", "exercise_delay", "exercise_sets", "exercise_duration", 
 "muscle_groups", "equipment_needed", "difficulty_level"]
    

@admin.register(DietPlanner)
class DietPlannerAdmin(admin.ModelAdmin):
    list_display = ["personal_info","hydration_tips", "special_notes", "supplement_suggestions"]

@admin.register(DayMealPlan)
class DayMealPlanAdmin(admin.ModelAdmin):
    list_display = ["day", "daily_calories", "daily_protein"]

@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ["meal_name", "meal_type", "ingredients", "portion_size",
                    "calories", "protein", "carbs", "fats", "prep_time"]