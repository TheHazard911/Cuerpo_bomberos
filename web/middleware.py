# from django.shortcuts import redirect
# from django.urls import reverse

# class AdminAccessMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         # Verificar si el usuario no está autenticado y está intentando acceder al admin
#         if request.path.startswith('/admin/') and not request.user.is_authenticated:
#             return redirect(reverse('admin:login'))  # Redirigir al login del admin

