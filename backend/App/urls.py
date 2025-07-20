from django.urls import path
from App import views

urlpatterns = [
    path("personal-info/", views.PersonalInfoAPI.as_view(), name="personal-info"),
    path("personal-info/<int:personal_info_id>/", views.PersonalInfoAPI.as_view(), name="personal-info"),
    path("personal-info/<int:personal_info_id>/workout-planner/", views.WorkoutPlannerAPI.as_view(), name='workout-planner')
    
]