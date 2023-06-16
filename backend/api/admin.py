from django.contrib import admin
from .models import GeneratedVideo, Prompt

admin.site.register(Prompt)
admin.site.register(GeneratedVideo)