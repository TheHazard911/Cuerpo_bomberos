# Generated by Django 5.1.1 on 2024-09-05 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Personal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombres', models.CharField(max_length=50)),
                ('apellidos', models.CharField(max_length=50)),
                ('jerarquia', models.CharField(max_length=50)),
                ('cargo', models.CharField(max_length=50)),
            ],
        ),
    ]
