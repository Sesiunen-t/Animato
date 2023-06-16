from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Prompt, GeneratedVideo
from .serializers import PromptSerializer
from django.core.files.base import ContentFile
from .utils import generate_script 
from django.conf import settings
from django.core.files.base import ContentFile
from pathlib import Path
from rest_framework.views import APIView
from rest_framework.response import Response
import subprocess
import tempfile
import os
import time

class GetRoutes(APIView):
    """API endpoint for getting available routes."""
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
    """API endpoint for listing and creating Prompts."""
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer

class PromptDetail(generics.RetrieveDestroyAPIView):
    """API endpoint for retrieving and deleting a specific Prompt."""
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer

class GenerateScriptView(APIView):
    """API endpoint for generating script from a Prompt."""
    def post(self, request, *args, **kwargs):
        
        prompt = Prompt.objects.get(id=kwargs['pk'])
        script = generate_script(prompt.text)
        video = GeneratedVideo.objects.create(prompt=prompt, script=script)
        return Response({"detail": f"Script generated and video {video.id} record created.", "video_id": video.id})

class GenerateVideoView(APIView):
    """API endpoint for generating video from a script."""
    def post(self, request, *args, **kwargs):
        video = GeneratedVideo.objects.get(id=kwargs['pk'])
        script = video.script

        with tempfile.NamedTemporaryFile(suffix='.py', delete=False) as temp:
            temp.write(script.encode())
            temp_file_name = temp.name

        temp_file_name_path = Path(temp_file_name)
        output_directory = Path(settings.MEDIA_ROOT) / 'videos' / temp_file_name_path.stem
        output_file_path = output_directory / '480p15' / 'Generated.mp4'
        result = subprocess.run(['manim', '-ql', temp_file_name], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        time.sleep(1) # wait for file to be written to disk

        with open(output_file_path, 'rb') as f:
            video_content = f.read()
        video.video_file.save(f'video_{video.id}.mp4', ContentFile(video_content))

        video.save()
        os.remove(temp_file_name)
        return Response({"detail": f"Video {video.id} generated and saved."})

class GenerateScriptAndVideoView(APIView):
    """API endpoint for generating both script and video from a Prompt."""
    def post(self, request, *args, **kwargs):
        script_response = GenerateScriptView().post(request, *args, **kwargs)

        if script_response.status_code != 200:
            return Response({"detail": "Error generating script."})
        
        video_id = script_response.data.get("video_id")
        video_response = GenerateVideoView().post(request, **{'pk': video_id})

        if video_response.status_code != 200:
            return Response({"detail": "Error generating video."})
        
        return Response({"detail": f"Script and video {video_id} generated successfully."})
