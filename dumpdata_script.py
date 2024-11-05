import os
import django
from django.core.management import call_command

# Establece el módulo de configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Web_App.settings')

# Inicializa Django
django.setup()

# Llama al comando dumpdata
with open('data.json', 'w', encoding='utf-8') as json_file:
    call_command('dumpdata', '--indent', '4', stdout=json_file)
