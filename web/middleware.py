# # middleware.py
# from django.shortcuts import redirect
# from django.urls import reverse

# class AuthenticationMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         # Aquí puedes definir las rutas que requieren autenticación
#         protected_urls = [
#             # Cambia esto por tus URLs protegidas
#             '/dashboard/',  
#             '/tablageneral/',
#             '/procedimientos/',
#             '/estadisticas/', 
#             '/rescate/', 
#             '/operaciones/',
#             '/prevencion/', 
#             '/prehospitalaria/',
#             '/grumae/',
#             '/capacitacion/',
#             '/enfermeria/',   
#             '/serviciosmedicos/',
#             '/psicologia/'
#         ]

#         if request.path in protected_urls and not request.user.is_authenticated:
#             return redirect(reverse('home'))  # Cambia 'login' por el nombre de tu vista de login

#         response = self.get_response(request)
#         return response
