<script setup lang="ts">
</script>

<template>
    <section id="hero">
        <h1>Aprende y Crece <br>con los Mejores</h1>
        <p>Accede a una amplia gama de cursos en línea y desarrolla <br>nuevas habilidades desde cualquier lugar.</p>
        <button>
            <RouterLink to="/registro">Regístrate Ahora!</RouterLink>
        </button>
    </section>
</template>

<style scoped>
h1 {
    font-size: 4.5em;
}

p {
    font-size: 1.80em;
}

#hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 90vh;
    color: white;
    background-image: linear-gradient(0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)), url("../assets/hero.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}

button {
    font-size: 1.5em;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 15px;
    border: 3px solid rgb(255, 255, 255);
    box-shadow: 2px 2px 10px rgb(0, 0, 0);
    background-color: blueviolet;
}

button a {
    color: white;
    text-decoration: none;
    padding: 5px 12px;
}

button:hover {
    background-color: rgb(74, 30, 112);
}
</style>
