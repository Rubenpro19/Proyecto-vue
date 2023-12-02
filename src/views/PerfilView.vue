<template>
  <section id="perfil">
    <div class="contenedor">
      <div class="perfil-info">
        <img :src="currentUser.profileImage || '/src/assets/imagenes/fotos-de-perfil.jpg'" alt="Foto de Perfil">
        <h2><b></b>{{ currentUser.name }}</h2>
        <p><b>Correo: </b>{{ currentUser.email }}</p>
        <p><b>Teléfono: </b>{{ currentUser.telefono }}</p>
        <p><b>Usuario: </b>{{ currentUser.username }}</p>
      </div>

      <div class="cursos-asociados">
        <h2>Cursos Asociados</h2>
        <ul class="cursos-lista">
          <router-link
            v-for="cursoId in currentUser.cursos"
            :to="{ name: cursoId }"
            :key="cursoId"
            class="curso-item"
          >
            {{ obtenerTituloCurso(cursoId) }}
          </router-link>
        </ul>
      </div>

      <div class="editar-perfil">
        <h2>Editar Perfil</h2>
        <form @submit.prevent="handleSubmit">
          <label for="nombre">Nombre y Apellido:</label>
          <input type="text" id="nombre" name="nombre" v-model="editedName">

          <label for="correo">Correo:</label>
          <input type="email" id="correo" name="correo" v-model="editedEmail">

          <label for="telefono">Telefono:</label>
          <input type="text" id="telefono" name="telefono" v-model="editedTelefono" pattern="[0-9]+">

          <label for="imagen">Imagen de Perfil:</label>
          <input type="file" id="imagen" name="imagen" accept="image/*" @change="handleImageChange">
          <hr>

          <h3>Cambiar Contraseña</h3>
          <label for="contrasena-actual">Contraseña Actual:</label>
          <input type="password" id="contrasena-actual" name="contrasena-actual">

          <label for="contrasena-nueva">Contraseña Nueva:</label>
          <input type="password" id="contrasena-nueva" name="contrasena-nueva">

          <label for="confirmar-contrasena">Confirmar Contraseña:</label>
          <input type="password" id="confirmar-contrasena" name="confirmar-contrasena">

          <input type="submit" value="Guardar Cambios">
        </form>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

interface User {
  name: string;
  email: string;
  telefono: string;
  username: string;
  profileImage: string;
  cursos?: string[]; // Agrega la propiedad cursos como un array de strings
}

const cursos = [
    { id: 'Curso1', titulo: 'Curso de Desarrollo Web', descripcion: 'Aprende a crear sitios web profesionales' },
    { id: 'Curso2', titulo: 'Curso de Marketing Digital', descripcion: 'Domina las estrategias de marketing en línea.' },
    { id: 'Curso3', titulo: 'Curso de Desarrollo Python', descripcion: 'Aprende a programar en uno de los lenguajes más populares.' },
    { id: 'Curso4', titulo: 'Curso de Diseño Gráfico', descripcion: 'Aprende a crear gráficos atractivos, logotipos, imágenes y materiales promocionales' },
    { id: 'Curso5', titulo: 'Aplicaciones Móviles', descripcion: 'Aprenderás a usar tecnologías como React Native, Flutter o desarrollo nativo para iOS y Android.' },
    { id: 'Curso6', titulo: 'Gestión de Proyectos', descripcion: 'Aprender a planificar, ejecutar y controlar proyectos de manera eficiente.' },
];

export default defineComponent({
  data() {
    return {
      currentUser: {} as User,
      selectedImage: null as File | null,
      editedName: '',
      editedEmail: '',
      editedTelefono: '',
    };
  },
  mounted() {
    this.loadCurrentUser();
  },
  methods: {
    loadCurrentUser() {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        this.currentUser = JSON.parse(currentUserString);
        // Inicializar los campos editables con los valores actuales
        this.editedName = this.currentUser.name;
        this.editedEmail = this.currentUser.email;
        this.editedTelefono = String(this.currentUser.telefono);
      }

      const storedProfileImage = localStorage.getItem(`profileImage_${this.currentUser.username}`);
      if (storedProfileImage) {
        this.currentUser.profileImage = storedProfileImage;
      }
    },
    handleImageChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedImage = input.files[0];
      }
    },
    updateCurrentUser() {
      // Actualizar los datos editados en el objeto currentUser
      this.currentUser.name = this.editedName;
      this.currentUser.email = this.editedEmail;
      this.currentUser.telefono = this.editedTelefono;

      if (this.selectedImage) {
        const imageURL = this.uploadImage(this.selectedImage);
        this.currentUser.profileImage = imageURL;
        localStorage.setItem(`profileImage_${this.currentUser.username}`, imageURL);
      }

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      this.selectedImage = null;
    },
    updateCurrentUserInList() {
      const userListString = localStorage.getItem('userList');
      if (userListString) {
        const userList: User[] = JSON.parse(userListString);
        const index = userList.findIndex(user => user.username === this.currentUser.username);
        if (index !== -1) {
          console.log('Updating user in list:', this.currentUser);
          userList[index] = { ...this.currentUser };
          localStorage.setItem('userList', JSON.stringify(userList));
          console.log('userList updated:', userList);
        } else {
          console.log('User not found in userList:', this.currentUser.username);
          // Si el usuario no se encuentra en la lista, añádelo
          userList.push({ ...this.currentUser });
          localStorage.setItem('userList', JSON.stringify(userList));
          console.log('userList updated with new user:', userList);
        }
      } else {
        console.log('No userList found in localStorage');
      }
    },
    handleSubmit() {
      this.updateCurrentUser();
      this.updateCurrentUserInList();
      // Puedes redirigir al usuario a otra página después de actualizar los datos
      // this.$router.push('/otra-ruta');
    },
    uploadImage(image: File): string {
      const imageURL = URL.createObjectURL(image);
      return imageURL;
    },
    // Método para obtener el título de un curso por su ID
    obtenerTituloCurso(cursoId: string): string {
      const curso = cursos.find((c) => c.id === cursoId);
      return curso ? curso.titulo : 'Curso no encontrado';
    },
    
  },
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#perfil {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

h1 {
  font-size: 4em;
}

h2{
  font-size: 2em;
}
p {
  font-size: 1.8em;
}

.contenedor {
  max-width: 1400px;
  margin: auto;
}

/* Estilos de la sección de perfil */
#perfil {
  flex: 1;
  background-color: #f9f9f9;
  padding: 40px 0;
}


.perfil-info {
  text-align: center;
}

.perfil-info img {
  border-radius: 50%;
  max-width: 150px;
  border: 4px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.perfil-info h2 {
  margin-top: 10px;
  font-size: 2em;
  color: #333;
}

.perfil-info p {
  font-size: 1.2em;
  color: #555;
}

.editar-perfil {
  max-width: 400px;
}

.editar-perfil form {
  text-align: left;
}

.editar-perfil label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.2em;
  color: #333;
}

.editar-perfil input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
}

.editar-perfil hr {
  margin: 20px 0;
  border: 1px solid #ccc;
}

.editar-perfil h3 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
}

.editar-perfil input[type="submit"] {
  background-color: blueviolet;
  color: #fff;
  padding: 10px 20px;
  font-size: 1.2em;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.editar-perfil input[type="submit"]:hover {
  background-color: rgb(80, 11, 145);
}

.cursos-asociados {
  margin-top: 20px;
}

.cursos-lista {
  list-style-type: none;
  padding: 0;
}

.curso-item {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
  text-decoration: none;
  color: #333;
  transition: background-color 0.3s;
}

.curso-item:hover {
  background-color: #f0f0f0;
}

@media (max-width: 600px) {
  h1 {
    font-size: 2.5em;
  }

  p {
    font-size: 1.5em;
  }

}
</style>