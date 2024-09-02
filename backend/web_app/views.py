from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def Home(request):
    return HttpResponse("Hello World!")

def Render(request):
    render(request, "Cuerpo_bomberos\frontend\index.html")