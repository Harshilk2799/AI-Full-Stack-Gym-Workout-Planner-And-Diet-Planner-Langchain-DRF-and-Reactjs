from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import *
from App.serializers import *
from App.langchain_script import workout_diet_planner
from App.models import *

class PersonalInfoAPI(APIView):
    def post(self, request):
        print("Data: ", request.data)
        serializer = PersonalInfoSerializer(data=request.data)
        if serializer.is_valid():
            personal_info = serializer.save()

            full_name = personal_info.full_name
            age = personal_info.age
            gender = personal_info.gender
            height_cm = personal_info.height_cm
            current_weight = personal_info.current_weight
            target_weight = personal_info.target_weight
            fitness_level = personal_info.fitness_level
            nutrition_preference = personal_info.nutrition_preference
            primary_goal = personal_info.primary_goal
            workout_days_per_week = personal_info.workout_days_per_week
            time_per_session = personal_info.time_per_session 

            workout_diet_response = workout_diet_planner(
                full_name = full_name,
                age = age,
                gender = gender,
                height_cm = height_cm,
                current_weight = current_weight,
                target_weight = target_weight,
                fitness_level = fitness_level,
                nutrition_preference = nutrition_preference,
                primary_goal = primary_goal,
                workout_days_per_week = workout_days_per_week,
                time_per_session = time_per_session
            )
            
            # Workout Planner
            rest_days = workout_diet_response["workout"]["rest_days"]
            progression_notes = workout_diet_response["workout"]["progression_notes"]
            safety_tips = workout_diet_response["workout"]["safety_tips"]
            
            workout_planner = WorkoutPlanner.objects.create(
                personal_info = personal_info,
                rest_days = rest_days,
                progression_notes = progression_notes,
                safety_tips = safety_tips
            )

            weekly_schedules = workout_diet_response["workout"]["weekly_schedule"]

            for weekly_schedule in weekly_schedules:

                day_work_out = DayWorkout.objects.create(
                workout_planner = workout_planner,
                day = weekly_schedule["day"],
                workout_type = weekly_schedule["workout_type"],
                total_duration = weekly_schedule["total_duration"],
                warm_up = weekly_schedule["warm_up"],
                cool_down = weekly_schedule["cool_down"]
                )

                all_exercises = weekly_schedule["exercises"]
                for exercise_data in all_exercises:

                    exercise_obj = Exercise.objects.create(
                        day_workout = day_work_out,
                        exercise_name = exercise_data["exercise_name"],
                        exercise_reps = exercise_data["exercise_reps"],
                        exercise_delay = exercise_data["exercise_delay"],
                        exercise_sets = exercise_data["exercise_sets"],
                        exercise_duration = exercise_data["exercise_duration"],
                        muscle_groups = exercise_data["muscle_groups"],
                        equipment_needed = exercise_data["equipment_needed"],
                        difficulty_level = exercise_data["difficulty_level"]
                    )


            # Diet Planner
            special_notes = workout_diet_response["diet"]["special_notes"]
            hydration_tips = workout_diet_response["diet"]["hydration_tips"]
            supplement_suggestions = workout_diet_response["diet"]["supplement_suggestions"]

            diet_planner = DietPlanner.objects.create(
                personal_info = personal_info,
                hydration_tips = hydration_tips,
                special_notes = special_notes,
                supplement_suggestions = supplement_suggestions
            )

            weekly_plans = workout_diet_response["diet"]["weekly_plan"]
            for weekly_plan in weekly_plans:

                day_meal_plan = DayMealPlan.objects.create(
                    diet_planner = diet_planner,
                    day = weekly_plan["day"],
                    daily_calories = weekly_plan["daily_calories"],
                    daily_protein = weekly_plan["daily_protein"],
                )

                meals = weekly_plan["meals"]
                for meal in meals:

                    meal_obj = Meal.objects.create(
                        meal = day_meal_plan,
                        meal_name = meal["meal_name"],
                        meal_type = meal["meal_type"],
                        ingredients = meal["ingredients"],
                        portion_size = meal["portion_size"],
                        calories = meal["calories"],
                        protein = meal["protein"],
                        carbs = meal["carbs"],
                        fats = meal["fats"],
                        prep_time = meal["prep_time"]
                    )

            print("Response: ", workout_diet_response)

            return Response({
                "data": serializer.data,
                "success": True
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, personal_info_id):
        instance = PersonalInfo.objects.get(id = personal_info_id)
        serializer = PersonalInfoSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            personal_info = serializer.save()

            full_name = personal_info.full_name
            age = personal_info.age
            gender = personal_info.gender
            height_cm = personal_info.height_cm
            current_weight = personal_info.current_weight
            target_weight = personal_info.target_weight
            fitness_level = personal_info.fitness_level
            nutrition_preference = personal_info.nutrition_preference
            primary_goal = personal_info.primary_goal
            workout_days_per_week = personal_info.workout_days_per_week
            time_per_session = personal_info.time_per_session 

            workoutplanner_delete = WorkoutPlanner.objects.get(personal_info = personal_info)
            workoutplanner_delete.delete()

            dietplanner_delete = DietPlanner.objects.get(personal_info = personal_info)
            dietplanner_delete.delete()

            workout_diet_response = workout_diet_planner(
                full_name = full_name,
                age = age,
                gender = gender,
                height_cm = height_cm,
                current_weight = current_weight,
                target_weight = target_weight,
                fitness_level = fitness_level,
                nutrition_preference = nutrition_preference,
                primary_goal = primary_goal,
                workout_days_per_week = workout_days_per_week,
                time_per_session = time_per_session
            )
            
            # Workout Planner
            rest_days = workout_diet_response["workout"]["rest_days"]
            progression_notes = workout_diet_response["workout"]["progression_notes"]
            safety_tips = workout_diet_response["workout"]["safety_tips"]
            
            workout_planner = WorkoutPlanner.objects.create(
                personal_info = personal_info,
                rest_days = rest_days,
                progression_notes = progression_notes,
                safety_tips = safety_tips
            )

            weekly_schedules = workout_diet_response["workout"]["weekly_schedule"]

            for weekly_schedule in weekly_schedules:

                day_work_out = DayWorkout.objects.create(
                workout_planner = workout_planner,
                day = weekly_schedule["day"],
                workout_type = weekly_schedule["workout_type"],
                total_duration = weekly_schedule["total_duration"],
                warm_up = weekly_schedule["warm_up"],
                cool_down = weekly_schedule["cool_down"]
                )

                all_exercises = weekly_schedule["exercises"]
                for exercise_data in all_exercises:

                    exercise_obj = Exercise.objects.create(
                        day_workout = day_work_out,
                        exercise_name = exercise_data["exercise_name"],
                        exercise_reps = exercise_data["exercise_reps"],
                        exercise_delay = exercise_data["exercise_delay"],
                        exercise_sets = exercise_data["exercise_sets"],
                        exercise_duration = exercise_data["exercise_duration"],
                        muscle_groups = exercise_data["muscle_groups"],
                        equipment_needed = exercise_data["equipment_needed"],
                        difficulty_level = exercise_data["difficulty_level"]
                    )


            # Diet Planner
            special_notes = workout_diet_response["diet"]["special_notes"]
            hydration_tips = workout_diet_response["diet"]["hydration_tips"]
            supplement_suggestions = workout_diet_response["diet"]["supplement_suggestions"]

            diet_planner = DietPlanner.objects.create(
                personal_info = personal_info,
                hydration_tips = hydration_tips,
                special_notes = special_notes,
                supplement_suggestions = supplement_suggestions
            )

            weekly_plans = workout_diet_response["diet"]["weekly_plan"]
            for weekly_plan in weekly_plans:

                day_meal_plan = DayMealPlan.objects.create(
                    diet_planner = diet_planner,
                    day = weekly_plan["day"],
                    daily_calories = weekly_plan["daily_calories"],
                    daily_protein = weekly_plan["daily_protein"],
                )

                meals = weekly_plan["meals"]
                for meal in meals:

                    meal_obj = Meal.objects.create(
                        meal = day_meal_plan,
                        meal_name = meal["meal_name"],
                        meal_type = meal["meal_type"],
                        ingredients = meal["ingredients"],
                        portion_size = meal["portion_size"],
                        calories = meal["calories"],
                        protein = meal["protein"],
                        carbs = meal["carbs"],
                        fats = meal["fats"],
                        prep_time = meal["prep_time"]
                    )

            print("Response: ", workout_diet_response)

            return Response({"data": serializer.data ,"message": "Personal Info Updated!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, personal_info_id):
        try:
            personal = PersonalInfo.objects.get(id = personal_info_id)
            personal.delete()
            return Response({"message": "Personal info and all related data deleted successfully."}, status=200)
        except PersonalInfo.DoesNotExist:
            return Response({"error": "Personal info not found."}, status=404)

    def get(self, request):
        personal_info = PersonalInfo.objects.all()
        serializer = PersonalInfoSerializer(personal_info, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

class WorkoutPlannerAPI(APIView):
    def get(self, request, personal_info_id):
        try:
            workout_planner = WorkoutPlanner.objects.prefetch_related(
                "weekly_schedule__exercises"
            ).get(personal_info_id=personal_info_id)
            
            diet_planner = DietPlanner.objects.prefetch_related(
                "weekly_plan__meals"
            ).get(personal_info_id=personal_info_id)

            workout_serializer = WorkoutPlannerSerializer(workout_planner)
            diet_serializer = DietPlannerSerializer(diet_planner)
            
            return Response({
                "workout_planner": workout_serializer.data,
                "diet_planner": diet_serializer.data
            }, status=status.HTTP_200_OK)
            
        except (WorkoutPlanner.DoesNotExist, DietPlanner.DoesNotExist):
            return Response({
                "error": "Workout or diet planner not found for the given personal info."
            }, status=status.HTTP_404_NOT_FOUND)