<template>
    <section id=Formulario>
        <div class="contenedor">
            <h1>Regístrate</h1>
            <form @submit.prevent="handleSubmit">
                <label for="name">Nombre y Apellido:</label>
                <input v-model="name" type="name" placeholder="Ingrese su nombre y apellido" id="name" name="name"
                    required><br>
                <span v-if="!isNameValid && name !== ''" class="error-message">{{ getNameErrorMessage() }}</span> <br>

                <label for="email">Correo Electrónico:</label>
                <input v-model="email" type="email" placeholder="Ingrese su correo" id="email" name="email" required><br>
                <span v-if="!isEmailValid && email !== ''" class="error-message">{{ getEmailErrorMessage() }}</span> <br>

                <label for="telefono">Número de telefono:</label>
                <input v-model="telefono" type="tel" placeholder="Ingrese su numero" id="telefono" name="telefono"
                    required><br>
                <span v-if="!isTelefonoValid && telefono !== ''" class="error-message">{{ getTelefonoErrorMessage()
                }}</span> <br>

                <label for="usuario">Usuario:</label>
                <input v-model="username" type="usuario" placeholder="Ingrese su usuario" id="usuario" name="usuario"
                    required><br>
                <span v-if="!isUsernameValid && username !== ''" class="error-message">{{ getUsernameErrorMessage()
                }}</span> <br>

                <label for="password">Contraseña:</label>
                <input v-model="password" type="password" placeholder="Ingrese su contraseña" id="password" name="password"
                    required><br>
                <span v-if="!isPasswordValid && password !== ''" class="error-message">{{ getPasswordErrorMessage()
                }}</span> <br>

                <label for="password2">Repita la Contraseña:</label>
                <input v-model="password2" type="password" placeholder="Repita su contraseña" id="password2"
                    name="password2" required><br>
                <span v-if="!isPassword2Valid && password2 !== ''" class="error-message">{{ getPassword2ErrorMessage()
                }}</span> <br>

                <button type="submit" :disabled="!isFormValid">Guardar</button>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
export default {
    data() {
        return {
            name: '',
            email: '',
            telefono: '',
            username: '',
            password: '',
            password2: ''
        };
    },
    computed: {
        // Propiedades calculadas que se actualizan automáticamente cuando cambian las dependencias
        isNameValid() {
            // Expresión regular para validar el nombre y apellido
            const nameRegex = /^[a-zA-ZÀ-ÿ]+(\s[a-zA-ZÀ-ÿ]{4,}){1,15}$/;
            return nameRegex.test(this.name);
        },
        isEmailValid() {
            // Expresión regular para validar el correo electrónico
            const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            return emailRegex.test(this.email);
        },
        isTelefonoValid() {
            // Expresión regular para validar el número de teléfono
            const telefonoRegex = /^\d{10}$/;
            return telefonoRegex.test(this.telefono);
        },
        isUsernameValid() {
            // Expresión regular para validar el nombre de usuario
            const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9_]{8,20}$/;
            return usernameRegex.test(this.username);
        },
        isPasswordValid() {
            // Expresión regular para validar la contraseña
            const passwordRegex = /^.{8,}$/;
            return passwordRegex.test(this.password);
        },
        isPassword2Valid() {
            // Validar si la contraseña 2 es igual a la contraseña 1
            return this.password2 === this.password;
        },
        isFormValid() {
            // Propiedad calculada que verifica si tanto el nombre de usuario como la contraseña son válidos
            return this.isUsernameValid && this.isPasswordValid;
        },
    },
    methods: {
        // Método llamado al enviar el formulario
        handleSubmit() {
            if (this.isFormValid) {
                // Recuperar la lista de usuarios del localStorage
                const existingUsersString = localStorage.getItem('userList');
                const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

                // Verificar si el nombre de usuario ya existe en la lista
                const userExists = existingUsers.some((user: { username: string }) => user.username === this.username);

                if (userExists) {
                    // Mostrar un mensaje de error si el nombre de usuario ya existe
                    alert('El nombre de usuario ya existe. Por favor, elija otro.');
                } else {
                    // Agregar el nuevo usuario a la lista
                    const newUser = {
                        name: this.name,
                        email: this.email,
                        telefono: this.telefono,
                        username: this.username,
                        password: this.password,
                    };
                    existingUsers.push(newUser);

                    // Guardar la lista actualizada en el localStorage
                    localStorage.setItem('userList', JSON.stringify(existingUsers));

                    localStorage.setItem('currentUser', JSON.stringify(newUser));

                    // Muestra un mensaje y redirige a otra página
                    console.log('Formulario válido. Iniciando sesión...');
                    this.$router.push('/CursosRecomendados');
                }
            }
        },
        // Método para obtener mensajes de error del nombre
        getNameErrorMessage() {
            if (!this.isNameValid) {
                return 'El nombre debe tener de 5 a 40 dígitos y solo puede contener letras (incluyendo acentos y espacios)';
            }
            return '';  // Retorna una cadena vacía si el nombre es válido
        },
        // Método para obtener mensajes de error del correo electrónico
        getEmailErrorMessage() {
            if (!this.isEmailValid) {
                return 'No es un correo válido';
            }
            return '';  // Retorna una cadena vacía si el correo electrónico es válido
        },
        // Método para obtener mensajes de error del número de teléfono
        getTelefonoErrorMessage() {
            if (!this.isTelefonoValid) {
                return 'El teléfono solo puede contener números y debe tener 10 dígitos';
            }
            return '';  // Retorna una cadena vacía si el número de teléfono es válido
        },
        // Método para obtener mensajes de error del nombre de usuario
        getUsernameErrorMessage() {
            if (!this.isUsernameValid) {
                return 'El nombre de usuario debe tener al menos 8 dígitos y contener al menos una letra mayúscula, una letra minúscula y un número.';
            }
            return '';  // Retorna una cadena vacía si el nombre de usuario es válido
        },
        // Método para obtener mensajes de error de la contraseña
        getPasswordErrorMessage() {
            if (!this.isPasswordValid) {
                return 'La contraseña debe tener al menos 8 caracteres.';
            }
            return '';  // Retorna una cadena vacía si la contraseña es válida
        },
        // Método para obtener mensajes de error de la repetición de la contraseña
        getPassword2ErrorMessage() {
            if (!this.isPassword2Valid) {
                return 'La contraseña debe ser igual.';
            }
            return '';  // Retorna una cadena vacía si la repetición de la contraseña es válida
        }
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
    border: 4px solid rgb(0, 0, 0);
    border-radius: 10px;
    margin-bottom: 50px;
    background-color: #b1afaf;
    max-width: 440px;
    overflow: hidden;
    color: rgb(0, 0, 0);
}

.contenedor form a {
    text-decoration: none;
}

.contenedor input {
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
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
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    background-color: blueviolet;
    color: white;
    border-radius: 10px;
    border: 2px solid rgba(0, 0, 0, 0.8);
    box-shadow: 2px 2px 10px rgb(0, 0, 0);
    cursor: pointer;
}

.contenedor button:hover {
    background-color: rgb(94, 35, 150);
}

#mensaje {
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
}

#mensajefinal {
    margin-top: 20px;
    text-align: center;
}

.advertencia {
    font-size: 1em;
    color: rgb(230, 0, 0);
    text-align: center
}

span {
    color: red;
}
</style>