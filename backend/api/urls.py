from django.urls import path
from .views import PromptList, PromptDetail, GetRoutes

urlpatterns = [
    path('', GetRoutes.as_view()),
    path('prompt/', PromptList.as_view()),
    path('prompt/<int:pk>/', PromptDetail.as_view()),

]