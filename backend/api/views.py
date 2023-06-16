from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Prompt
from .serializers import PromptSerializer

class GetRoutes(APIView):
    def get(self, request):
        routes = [
            {'GET': '/'},
            {'GET': '/prompt/'},
            {'POST': '/prompt/'}, 
            {'GET': '/prompt/<id>/'},
            {'DELETE': '/prompt/<id>/'},
        ]
        return Response(routes)

class PromptList(generics.ListCreateAPIView):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer


class PromptDetail(generics.RetrieveDestroyAPIView):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer
