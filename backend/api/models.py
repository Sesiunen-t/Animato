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
        