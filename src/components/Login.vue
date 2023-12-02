<template>
  <section id="Formulario">
    <div class="contenedor">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="handleSubmit">
        <label for="username">Usuario:</label>
        <input v-model="username" type="text" placeholder="Ingrese su usuario" id="username" name="username" required
          @input="handleUsernameInput"
          :class="{ 'error': (!isUsernameValid && username !== '') || showUsernameNotFoundError || !isUsernameFilled, 'success': isUsernameValid }"
          autocomplete="username">
        <span v-if="(!isUsernameValid && username !== '') || showUsernameNotFoundError || !isUsernameFilled"
          class="error-message">{{ getUsernameErrorMessage() }}</span>

        <br>

        <label for="password">Contraseña</label>
        <input v-model="password" type="password" placeholder="Ingrese su contraseña" id="password" name="password"
          required @input="handlePasswordInput"
          :class="{ 'error': !isPasswordValid && password !== '' || showPasswordMismatchError || !isPasswordFilled, 'success': isPasswordValid }"
          autocomplete="current-password">
        <span v-if="!isPasswordValid && password !== '' || showPasswordMismatchError || !isPasswordFilled"
          class="error-message">{{ getPasswordErrorMessage() }}</span>

        <div id="registro">
          <RouterLink to="/registro">¿No tienes una cuenta? Regístrate</RouterLink>
        </div>
        <button type="submit" :disabled="!isFormValid">Iniciar Sesión</button>
      </form>
    </div>
  </section>
</template>
<script lang="ts">
interface User {
  username: string;
  password: string;
  // Otros campos si es necesario
}
export default {
  data() {
    return {
      username: '',
      password: '',
      showUsernameNotFoundError: false,
      showPasswordMismatchError: false,
    };
  },
  computed: {
    isUsernameValid() {
      const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9_]{8,20}$/;
      return usernameRegex.test(this.username);
    },
    isPasswordValid() {
      const passwordRegex = /^.{8,}$/;
      return passwordRegex.test(this.password);
    },
    isFormValid() {
      return this.isUsernameValid && this.isPasswordValid;
    },
    isUsernameFilled() {
      return this.username !== '';
    },
    isPasswordFilled() {
      return this.password !== '';
    },
  },
  methods: {
    handleSubmit() {
      // Validar si los campos están llenos antes de continuar
      if (!this.isUsernameFilled || !this.isPasswordFilled) {
        console.log('Por favor, completa todos los campos.');
        return;
      }

      // Obtener usuarios almacenados del localStorage
      const storedUsersString = localStorage.getItem('userList');
      const existingUsers: User[] = storedUsersString ? JSON.parse(storedUsersString) : [];

      // Verificar si el usuario existe en la lista
      const userExists = existingUsers.some((user: User) => user.username === this.username);

      if (userExists) {
        // Encontró el usuario, ahora verifica la contraseña
        const currentUser = existingUsers.find((user: User) => user.username === this.username);

        if (currentUser && this.password === currentUser.password) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));

          console.log('Inicio de sesión exitoso.');
          this.showUsernameNotFoundError = false;
          this.showPasswordMismatchError = false;
          this.$router.push('/CursosRecomendados');
        } else {
          console.log('Contraseña incorrecta.');
          this.showUsernameNotFoundError = false;
          this.showPasswordMismatchError = true;
        }
      } else {
        console.log('Nombre de usuario no encontrado.');
        this.showUsernameNotFoundError = true;
      }
    },
    getUsernameErrorMessage() {
      if (!this.isUsernameFilled) {
        return 'Por favor, ingresa tu nombre de usuario.';
      } else if (!this.isUsernameValid) {
        return 'El nombre de usuario debe contener al menos una letra mayúscula, una letra minúscula y un número, y tener entre 8 y 20 caracteres.';
      } else if (this.showUsernameNotFoundError) {
        return 'Nombre de usuario no encontrado.';
      }
      return '';
    },
    getPasswordErrorMessage() {
      if (!this.isPasswordFilled) {
        return 'Por favor, ingresa tu contraseña.';
      } else if (!this.isPasswordValid) {
        return 'La contraseña debe tener al menos 8 caracteres.';
      } else if (this.showPasswordMismatchError) {
        return 'Contraseña incorrecta.';
      }
      return '';
    },
    handleUsernameInput() {
      this.showUsernameNotFoundError = false;
    },
    handlePasswordInput() {
      this.showPasswordMismatchError = false;
    },

  },
};
</script>


<style scoped>
h1 {
  font-size: 3.5em;
}

p {
  font-size: 1.25em;
}

#Formulario {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(30, 30, 30);
  color: white;
  text-align: center;
  min-height: 90vh;
  background-image: linear-gradient(0deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.8)), url(../assets/hero.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
}

.contenedor form {
  text-align: left;
  font-weight: bold;
  padding: 40px;
  border: 4px solid rgb(5, 5, 5);
  border-radius: 10px;
  margin-bottom: 50px;
  background-color: #b1afaf;
  max-width: 370px;
  overflow: hidden;
  color: black;
}

.contenedor form a {
  text-decoration: none;
}

.contenedor input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.8);
  box-shadow: 2px 2px 10px rgb(0, 0, 0);
  background-color: rgb(240, 240, 240);
}

.contenedor #registro {
  text-align: center;
}

.contenedor #registro a {
  text-align: center;
}

.contenedor #registro a:hover {
  color: rgb(124, 30, 212);
}

.contenedor button {
  font-size: 15px;
  font-weight: bold;
  font-size: 1em;
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: blueviolet;
  color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 2px solid rgb(40, 0, 77);
  box-shadow: 2px 2px 10px rgb(0, 0, 0);
  cursor: pointer;
}

.contenedor button:hover {
  background-color: rgb(94, 35, 150);
}

.contenedor input.error {
  border-color: red;
}

.contenedor input.success {
  border-color: green;
}

.error {
  border: 1px solid #ff4d4f;
}

.error-message {
  color: #ff0004;
  font-size: 0.9em;
}
</style>
