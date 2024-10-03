from django.db import models

class SearchResult(models.Model):
    content = models.JSONField()
    url = models.URLField(blank=True)
    type = models.CharField(max_length=50)
    metadata = models.JSONField(default=dict)
    similarity_score = models.FloatField()

    def __str__(self):
        return f"{self.type} - {self.similarity_score}"