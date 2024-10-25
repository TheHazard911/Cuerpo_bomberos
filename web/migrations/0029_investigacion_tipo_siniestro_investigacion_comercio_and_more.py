# Generated by Django 5.1.2 on 2024-10-24 19:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0028_tipos_investigacion_investigacion'),
    ]

    operations = [
        migrations.AddField(
            model_name='investigacion',
            name='tipo_siniestro',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Investigacion_Comercio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_comercio', models.CharField(max_length=100)),
                ('rif_comercio', models.CharField(max_length=50)),
                ('nombre_propietario', models.CharField(max_length=50)),
                ('apellido_propietario', models.CharField(max_length=50)),
                ('cedula_propietario', models.CharField(max_length=20)),
                ('descripcion', models.CharField(max_length=100)),
                ('material_utilizado', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=20)),
                ('id_investigacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web.investigacion')),
            ],
        ),
        migrations.CreateModel(
            name='Investigacion_Estructura_Vivienda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_estructura', models.CharField(max_length=80)),
                ('nombre', models.CharField(max_length=50)),
                ('apellido', models.CharField(max_length=50)),
                ('cedula', models.CharField(max_length=20)),
                ('descripcion', models.CharField(max_length=100)),
                ('material_utilizado', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=20)),
                ('id_investigacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web.investigacion')),
            ],
        ),
        migrations.CreateModel(
            name='Investigacion_Vehiculo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('marca', models.CharField(max_length=40)),
                ('modelo', models.CharField(max_length=25)),
                ('color', models.CharField(max_length=20)),
                ('placas', models.CharField(max_length=20)),
                ('año', models.CharField(max_length=4)),
                ('nombre_propietario', models.CharField(max_length=50)),
                ('apellido_propietario', models.CharField(max_length=50)),
                ('cedula_propietario', models.CharField(max_length=50)),
                ('descripcion', models.CharField(max_length=100)),
                ('material_utilizado', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=100)),
                ('id_investigacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web.investigacion')),
            ],
        ),
    ]
