from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class PersonalInfo(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]

    FITNESS_LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced')
    ]

    NUTRITION_PREFERENCE_CHOICES = [
        ('Vegetarian', 'Vegetarian'),
        ('Vegan', 'Vegan'),
        ('Non-Vegetarian', 'Non-Vegetarian'),
    ]

    PRIMARY_GOAL_CHOICES = [
        ('Weight Loss', 'Weight Loss'),
        ('Muscle Gain', 'Muscle Gain'),
        ('Strength Building', 'Strength Building')
    ]

    full_name = models.CharField(max_length=255)
    age = models.PositiveIntegerField() 
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)
    height_cm = models.PositiveIntegerField(help_text="Height in centimeters")
    current_weight = models.PositiveIntegerField(help_text="Current weight in kg")
    target_weight = models.PositiveIntegerField(help_text="Target weight in kg")

    fitness_level = models.CharField(max_length=20, choices=FITNESS_LEVEL_CHOICES)

    nutrition_preference = models.CharField(max_length=20, choices=NUTRITION_PREFERENCE_CHOICES)

    primary_goal = models.CharField(max_length=20, choices=PRIMARY_GOAL_CHOICES)

    workout_days_per_week = models.PositiveIntegerField(
        help_text="Number of workout days per week (1-7)",
        validators=[MinValueValidator(1), MaxValueValidator(7)]
    )

    time_per_session = models.PositiveIntegerField(
        help_text="Time per session in minutes"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class WorkoutPlanner(models.Model):
    personal_info = models.ForeignKey(PersonalInfo, on_delete=models.CASCADE, related_name="workout_plans")
    rest_days = models.JSONField(default=list)
    progression_notes = models.CharField(max_length=255)
    safety_tips = models.CharField(max_length=255)


class DayWorkout(models.Model):
    workout_planner = models.ForeignKey(WorkoutPlanner, on_delete=models.CASCADE, related_name="weekly_schedule")
    day = models.CharField(max_length=255)
    workout_type = models.CharField(max_length=255)
    total_duration = models.CharField(max_length=255)
    warm_up = models.CharField(max_length=255)
    cool_down = models.CharField(max_length=255)

class Exercise(models.Model):
    day_workout = models.ForeignKey(DayWorkout, on_delete=models.CASCADE, related_name="exercises")
    exercise_name = models.CharField(max_length=255)
    exercise_reps = models.PositiveIntegerField()
    exercise_delay = models.CharField(max_length=255)
    exercise_sets = models.PositiveIntegerField()
    exercise_duration = models.CharField(max_length=255)
    muscle_groups = models.JSONField(default=list)
    equipment_needed = models.CharField(max_length=255)
    difficulty_level = models.CharField(max_length=255)


class DietPlanner(models.Model):
    personal_info = models.ForeignKey(PersonalInfo, on_delete=models.CASCADE, related_name="diet_planner")
    hydration_tips = models.CharField(max_length=255)
    special_notes = models.CharField(max_length=255)
    supplement_suggestions = models.CharField(max_length=255, null=True, blank=True)

class DayMealPlan(models.Model):
    diet_planner = models.ForeignKey(DietPlanner, on_delete=models.CASCADE, related_name="weekly_plan")
    day = models.CharField(max_length=50)
    daily_calories = models.CharField(max_length=255, null=True, blank=True) 
    daily_protein = models.CharField(max_length=255, null=True, blank=True) 

class Meal(models.Model):
    meal = models.ForeignKey(DayMealPlan, on_delete=models.CASCADE, related_name="meals")
    meal_name = models.CharField(max_length=255)
    meal_type = models.CharField(max_length=255)
    ingredients = models.JSONField(default=list)
    portion_size = models.CharField(max_length=255)
    calories = models.CharField(max_length=255, null=True, blank=True)
    protein = models.CharField(max_length=255, null=True, blank=True)
    carbs = models.CharField(max_length=255, null=True, blank=True)
    fats = models.CharField(max_length=255, null=True, blank=True)
    prep_time = models.CharField(max_length=255, null=True, blank=True)