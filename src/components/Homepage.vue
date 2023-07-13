<template>
    <!-- homePage -->
    <section class="title text-light py-5">
        <div class="container-lg">
            <h1 class="display-1 text-center fst-italic fw-bold">Take a Quiz!</h1>
        </div>
    </section>
    <section class="difficult text-light py-5">
        <div class="container-lg">
            <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                    <h3 class="text-center fw-bold border-5 border-bottom px-2 pb-3">Difficulty</h3>
                </div>
            </div>
            <div class="row row-cols-md-2 row-cols-lg-4 g-3">
                <div class="col">
                    <label class="btn btn-light text-center w-100 py-3 fs-5" :class="{'active': difficulty === ''}">
                        <input type="radio" class="d-none" value="" v-model="difficulty">
                        Any Difficulty
                    </label>
                </div>
                <div class="col">
                    <label class="btn btn-light text-center w-100 py-3 fs-5" :class="{'active': difficulty === 'easy'}">
                        <input type="radio" class="d-none" value="easy" v-model="difficulty">
                        Easy
                    </label>
                </div>
                <div class="col">
                    <label class="btn btn-light text-center w-100 py-3 fs-5" :class="{'active': difficulty === 'medium'}">
                        <input type="radio" class="d-none" value="medium" v-model="difficulty">
                        Medium
                    </label>
                </div>
                <div class="col">
                    <label class="btn btn-light text-center w-100 py-3 fs-5" :class="{'active': difficulty === 'hard'}">
                        <input type="radio" class="d-none" value="hard" v-model="difficulty">
                        Hard
                    </label>
                </div>
            </div>
        </div>
    </section>
    <section class="category text-light py-5">
        <div class="container-lg">
            <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                    <h3 class="text-center fw-bold border-5 border-bottom px-2 pb-3">Category</h3>
                </div>
            </div>
            <div class="row">
                <div class="col d-flex justify-content-between flex-wrap">
                    <label class="btn btn-light text-center py-3 fs-5 me-3 mb-3 flex-grow-1" :class="{'active': category === ''}">
                        <input type="radio" class="d-none" value="" v-model="category">
                        Any Category
                    </label>
                    <label class="btn btn-light text-center py-3 fs-5 me-3 mb-3 flex-grow-1" :class="{'active': category === categoryItem.id}" v-for="categoryItem in categoryList" :key="categoryItem.id">
                        <input type="radio" class="d-none" :value="categoryItem.id" v-model="category">
                        {{ categoryItem.name }}
                    </label>
                </div>
            </div>
        </div>
    </section>
    <section class="button text-light">
        <div class="container-lg text-center">
            <button class="btn btn-danger py-3 px-5 fs-3" @click="startGame">Start</button>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";

const categoryList = ref([]);
const difficulty = ref('');
const category = ref('');

const emit = defineEmits(['start'])

const getCategories = async () => {
    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const jsonResponse = await response.json();
        return jsonResponse.trivia_categories;
    } catch (err) {
        console.log(err);
    }
};

/* await fetch('https://opentdb.com/api_category.php')
    .then(response => response.json())
    .then(data => categoryList.value = data.trivia_categories) */

const startGame = () => {
    emit('start',[difficulty.value, category.value]);
};

categoryList.value = await getCategories();

/* onMounted(async () => {
    categoryList.value = await getCategories();
}); */

</script>
