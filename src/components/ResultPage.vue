<template>
    <!-- Result Page -->
    <section class="result">
        <div class="container-lg py-5 text-center">
            <div class="row border-bottom border-3">
                <div class="col">
                    <div class="display-1 rounded-circle border-3 border border-light mb-5 text-center d-flex align-items-center justify-content-center fw-bold mx-auto" id="score">{{ score }}/5</div>
                    <h1 v-if="score < 3" class="fw-bold mb-5">Better luck next time</h1>
                    <h1 v-else-if="score == 3" class="fw-bold mb-5">Good work!</h1>
                    <h1 v-else class="fw-bold mb-5">Great work!</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="questions">
        <div class="container-lg text-center">
            <div class="row flex-column align-items-center py-5" v-for="questionResult in questionResults" :key="questionResult[0]">
                <h3 class="mb-4 fw-bold px-5" v-html="questionResult[0]"></h3>
                <div class="rectangle-line bg-light py-1 px-3 mb-5"></div>
                <div class="col-10 col-md-8">
                    <p class="bg-success py-4 fw-bold fs-5 mb-3">Correct answer: <span v-html="questionResult[1]"></span></p>
                    <p v-if="questionResult[1] !== questionResult[2]" class="bg-danger py-4 fw-bold fs-5">Your answer: <span v-html="questionResult[2]"></span></p>
                </div>
            </div>
        </div>
    </section>
    <section class="functions">
        <div class="container-lg py-5 text-center">
            <div class="row justify-content-center">
                <div class="col-8 col-md-6 col-lg-4 mb-3 mb-lg-0">
                    <button class="btn btn-light w-100 py-3 fw-bold" @click="quizStore.tryAgain">Try Again</button>
                </div>
                <div class="col-8 col-md-6 col-lg-4 mb-3 mb-lg-0">
                    <button class="btn btn-light w-100 py-3 fw-bold" @click="quizStore.restart">Restart with new questions</button>
                </div>
                <div class="col-8 col-md-6 col-lg-4 mb-3 mb-lg-0">
                    <button class="btn btn-light w-100 py-3 fw-bold" @click="quizStore.newGame">New Game</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuizStore } from '../stores/quizStore';

const quizStore = useQuizStore();

const { questionResults, score } = storeToRefs(quizStore);
</script>
