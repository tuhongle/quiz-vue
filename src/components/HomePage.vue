<template>
    <!-- homePage -->
    <section class="title text-light pb-5">
        <div class="container-lg">
            <div class="row">
                <div class="col d-flex align-items-center justify-content-center">
                    <img src="/logo.png" alt="QUIZ!!!" class="img-fluid" width="200">
                    <h1 class="display-1 text-center fst-italic fw-bold">Take a Quiz!</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="difficult text-light pb-5">
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
                    <label class="btn btn-light text-center py-3 fs-5 me-3 mb-3 flex-grow-1" :class="{'active': category === null}">
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
            <RouterLink :to="{ name: 'question'}" type="button" class="btn btn-danger py-3 px-5 fs-3">Start</RouterLink>
        </div>
    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuizStore } from "../stores/quizStore";
import { RouterLink } from "vue-router";

const quizStore = useQuizStore();
await quizStore.getCategories();

const { category, difficulty, categoryList } = storeToRefs(quizStore);
</script>
