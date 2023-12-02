<template>
    <section id="cursos-recomendados">
        <div class="contenedor">
            <div class="buscador-container">
                <input id="buscador" type="text" v-model="filtro" placeholder="Buscar..." @input="filtrarCursos">
            </div>
            <h1>Cursos Recomendados</h1>
            <div class="cursospro">
                <div class="cursos" v-for="(curso, index) in cursosFiltrados" :key="index">
                    <h2>{{ curso.titulo }}</h2>
                    <p>{{ curso.descripcion }}</p>
                    <button @click="agregarCurso(curso.id)">Agregar al perfil</button>
                    <button><router-link :to="`/CursosRecomendados/${curso.id}`">Ver Más</router-link></button>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup lang="ts">
import { ref } from 'vue';

interface User {
    username: string;
    password: string;
    cursos: string[];

}

const cursos = [
    { id: 'Curso1', titulo: 'Curso de Desarrollo Web', descripcion: 'Aprende a crear sitios web profesionales' },
    { id: 'Curso2', titulo: 'Curso de Marketing Digital', descripcion: 'Domina las estrategias de marketing en línea.' },
    { id: 'Curso3', titulo: 'Curso de Desarrollo Python', descripcion: 'Aprende a programar en uno de los lenguajes más populares.' },
    { id: 'Curso4', titulo: 'Curso de Diseño Gráfico', descripcion: 'Aprende a crear gráficos atractivos, logotipos, imágenes y materiales promocionales' },
    { id: 'Curso5', titulo: 'Aplicaciones Móviles', descripcion: 'Aprenderás a usar tecnologías como React Native, Flutter o desarrollo nativo para iOS y Android.' },
    { id: 'Curso6', titulo: 'Gestión de Proyectos', descripcion: 'Aprender a planificar, ejecutar y controlar proyectos de manera eficiente.' },
];

const filtro = ref('');
const cursosFiltrados = ref(cursos);

const filtrarCursos = () => {
    const textoFiltro = filtro.value.toLowerCase();
    cursosFiltrados.value = cursos.filter(curso => curso.titulo.toLowerCase().includes(textoFiltro));
};

const agregarCurso = (cursoId: string) => {
    // Recuperar la lista de usuarios del Local Storage
    const userListString = localStorage.getItem('userList');
    const userList: User[] = userListString ? JSON.parse(userListString) : [];

    // Recuperar el usuario del Local Storage
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);

        // Verificar si el curso ya está en la lista del usuario
        if (!currentUser.cursos || !currentUser.cursos.includes(cursoId)) {
            // Si no está, agregar el curso al array de cursos del usuario
            currentUser.cursos = currentUser.cursos || [];
            currentUser.cursos.push(cursoId);

            // Actualizar el usuario en el Local Storage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // También agregar el curso al array de cursos del usuario en la lista de usuarios
            const userToUpdate = userList.find(user => user.username === currentUser.username);
            if (userToUpdate) {
                userToUpdate.cursos = currentUser.cursos;
            }

            // Actualizar la lista de usuarios en el Local Storage
            localStorage.setItem('userList', JSON.stringify(userList));

            alert(`${cursoId} agregado al perfil.`);
        } else {
            alert(`El ${cursoId} ya está en el perfil.`);

        }

    }
};
</script>
  

<style scoped>
h1 {
    font-size: 3.5em;
    margin-top: 0;
    margin-bottom: 15px;
}

h2 {
    font-size: 2em;
    margin-top: 0;
}

p {
    font-size: 1.25em;
    display: none;
}

#buscador {
    border: 2px solid blueviolet;
    border-radius: 8px;
    padding: 4px;
    outline: none;
    margin-bottom: 10px;
}

#buscador::placeholder {
    text-align: center;
}

#cursos-recomendados {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 90vh;
    margin: 0;
    background-color: rgb(30, 30, 30);
    text-align: center;
    color: white;
}

#cursos-recomendados .contenedor {
    padding: 30px 20px;
}

#cursos-recomendados .cursos {
    background-size: cover;
    background-position: center center;
    padding: 50px;
    margin: 20px;
    border-radius: 15px;
}

#cursos-recomendados .cursospro {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    /* Asegura que ocupa todo el ancho disponible */
}

.cursos:first-child {
    background-image: linear-gradient(0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)), url(../assets/imagenes/curso1.jpg);
}

.cursos:nth-child(2) {
    background-image: linear-gradient(0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)), url(../assets/imagenes/curso2.jpg);
}

.cursos:nth-child(3) {
    background-image: linear-gradient(0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)), url(../assets/imagenes/curso3.png);
}

.cursos:nth-child(4) {
    background-image: linear-gradient(0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)), url(../assets/imagenes/curso4.jpg);
}

.cursos:nth-child(5) {
    background-image: linear-gradient(0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)), url(../assets/imagenes/curso5.jpg);
}

.cursos:nth-child(6) {
    background-image: linear-gradient(0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)), url(../assets/imagenes/curso6.jpg);
}

button {
    font-size: 1.5em;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid rgb(26, 26, 26);
    box-shadow: 2px 2px 10px rgb(26, 26, 26);
    background-color: blueviolet;
    color: white;
    margin-bottom: 10px;
}

button:hover {
    background-color: rgb(94, 35, 150);
}

button a {
    padding: 5px 12px;
    text-decoration: none;
    color: white;
}

@media (min-width: 720px) {
    #buscador {
        margin-bottom: 0;
    }

    #cursos-recomendados .cursospro {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
    }

    #cursos-recomendados p {
        display: block;
        margin-bottom: 30px;
    }

    #cursos-recomendados .cursos {
        padding: 50px;
    }


    .cursos {
        width: calc(30% - 0px);
        margin-bottom: 0px;
        border: 1px solid #ccc;
        padding: 10px;
        box-sizing: border-box;
    }

}
</style>
  