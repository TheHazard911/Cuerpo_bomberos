document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', function () {
      // Obtener los datos de la persona
      const id = this.getAttribute('data-id');
      const nombres = this.getAttribute('data-nombres');
      const apellidos = this.getAttribute('data-apellidos');
      const jerarquia = this.getAttribute('data-jerarquia');
      const cargo = this.getAttribute('data-cargo');
      const cedula = this.getAttribute('data-cedula');
      const sexo = this.getAttribute('data-sexo');
      const rol = this.getAttribute('data-rol');
      const status = this.getAttribute('data-status');
    
      let letra, numeros = cedula.split("-")

      // Llenar el formulario en el modal con los datos obtenidos
      document.getElementById('id_nombres').value = nombres;
      document.getElementById('id_apellidos').value = apellidos;
      document.getElementById('id_jerarquia').value = jerarquia;
      document.getElementById('id_cargo').value = cargo;
      document.getElementById('id_nacionalidad').value = numeros[0];
      document.getElementById('id_cedula').value = parseInt(numeros[1]);
      document.getElementById('id_sexo').value = sexo;
      document.getElementById('id_rol').value = rol;
      document.getElementById('id_status').value = status;
      
      // Guardar el ID de la persona en un campo oculto del formulario para enviarlo al servidor
      document.getElementById('id_persona').value = id;
    });
  });