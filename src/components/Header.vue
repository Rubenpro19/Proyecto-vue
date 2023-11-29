<template>
    <header>
        <div class="contenedor">
            <p class="logo">AprendeYa!</p>
            <nav>
                <router-link v-if="$route.path === '/' || $route.path === '/registro'" to="/login">Iniciar
                    Sesión</router-link>
                <router-link v-if="$route.path === '/'" to="/login">Cursos Recomendados</router-link>

                <router-link v-if="$route.path === '/login' || $route.path === '/registro'" to="/">Regresar</router-link>

                <router-link v-if="$route.path ==='/CursosRecomendados'" to="/CursosRecomendados/Perfil">Ver Perfil</router-link>
                <router-link v-if="$route.path ==='/CursosRecomendados/Perfil'" to="/CursosRecomendados">Regresar</router-link>

                <router-link v-if="$route.path === '/CursosRecomendados'" to="/">Cerrar Sesión</router-link>
                
                <router-link v-if="$route.path === '/CursosRecomendados/Curso1'" to="/CursosRecomendados">Regresar</router-link>
                <router-link v-if="$route.path === '/CursosRecomendados/Curso2'" to="/CursosRecomendados">Regresar</router-link>
                <router-link v-if="$route.path === '/CursosRecomendados/Curso3'" to="/CursosRecomendados">Regresar</router-link>
                <router-link v-if="$route.path === '/CursosRecomendados/Curso4'" to="/CursosRecomendados">Regresar</router-link>
                <router-link v-if="$route.path === '/CursosRecomendados/Curso5'" to="/CursosRecomendados">Regresar</router-link>
                <router-link v-if="$route.path === '/CursosRecomendados/Curso6'" to="/CursosRecomendados">Regresar</router-link>
                
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
h1 {
    font-size: 4.5em;
}

p {
    font-size: 1.80em;
}

header {
    background-color: rgb(218, 218, 218);
}

header .contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
}

header .logo {
    margin: 0;
    padding: 20px 30px;
    font-weight: bold;
    color: blueviolet;
    font-size: 1.6em;
}

header nav {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-bottom: 20px;
}

header a {
    padding: 5px 12px;
    text-decoration: none;
    font-weight: bold;
    color: black;
}

header a:hover {
    color: blueviolet;
}

@media (min-width: 720px) {
    header {
        width: 100%;
    }

    header .contenedor {
        flex-direction: row;
        justify-content: space-between;
    }

    header nav {
        flex-direction: row;
        padding-bottom: 0;
        padding-right: 25px;
    }
}


@media (max-width: 600px) {
    p {
        font-size: 1.5em;
    }

    header .logo {
        padding: 10px;
        font-size: 1.2em;
    }

    header nav {
        padding: 10px;
    }
}
</style>