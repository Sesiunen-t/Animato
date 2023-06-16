from django.urls import path
from .views import GenerateScriptAndVideoView, GenerateScriptView, GenerateVideoView, PromptList, PromptDetail, GetRoutes

urlpatterns = [
    path('', GetRoutes.as_view()),
    path('prompt/', PromptList.as_view()),
    path('prompt/<int:pk>/', PromptDetail.as_view()),
    path('prompt/<int:pk>/generate_script/', GenerateScriptView.as_view()),
    path('video/<int:pk>/generate_video/', GenerateVideoView.as_view()),
    path('prompt/<int:pk>/generate_script_and_video/', GenerateScriptAndVideoView.as_view()),
]