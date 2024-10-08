# Generated by Django 5.1.1 on 2024-09-25 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Proyecto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=255)),
                ('descripcion', models.TextField()),
                ('tecnologias', models.CharField(max_length=255)),
                ('link_repositorio', models.URLField(blank=True, null=True)),
                ('link_demo', models.URLField(blank=True, null=True)),
                ('imagen', models.ImageField(blank=True, null=True, upload_to='proyectos/')),
                ('fecha_creacion', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
