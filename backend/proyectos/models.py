# proyectos/models.py
from django.db import models

class Proyecto(models.Model):
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    tecnologias = models.CharField(max_length=255)
    link_repositorio = models.URLField(blank=True, null=True)  # Link opcional
    link_demo = models.URLField(blank=True, null=True)  # Link a la demo opcional
    imagen = models.ImageField(upload_to='proyectos/', blank=True, null=True)  # Imagen opcional
    fecha_creacion = models.DateField(auto_now_add=True)  # Fecha de creación automática

    def __str__(self):
        return self.titulo
