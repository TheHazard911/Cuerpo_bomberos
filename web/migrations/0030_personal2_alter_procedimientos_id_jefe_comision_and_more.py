# Generated by Django 5.1.2 on 2024-10-29 19:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0029_investigacion_tipo_siniestro_investigacion_comercio_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Personal2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombres', models.CharField(max_length=50)),
                ('apellidos', models.CharField(max_length=50)),
                ('jerarquia', models.CharField(max_length=50)),
                ('cargo', models.CharField(max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='procedimientos',
            name='id_jefe_comision',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='personal2', to='web.personal'),
        ),
        migrations.AlterField(
            model_name='procedimientos',
            name='id_solicitante',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='personal1', to='web.personal'),
        ),
    ]
