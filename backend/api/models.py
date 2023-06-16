from django.db import models

class Prompt(models.Model):
    author = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    
    def __str__(self):
        return self.text
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = 'Prompts'


class GeneratedVideo(models.Model):
    prompt = models.ForeignKey(Prompt, on_delete=models.CASCADE)
    script = models.TextField()
    video_file = models.FileField(upload_to='videos/', blank=True, null=True)
    
    def __str__(self):
        return self.prompt.text[:50]