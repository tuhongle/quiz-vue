<template>
    <!-- Question Page -->
    <section class="question h-100">
        <div class="container-lg text-center py-5 h-100 d-flex align-items-center justify-content-center">
            <div class="row d-flex justify-content-center">
                <div class="col-8 text-light">
                    <h3 class="lh-lg fw-bold" v-html="currentQuestion.question"></h3>
                    <ul class="answerLists list-unstyled mt-5">
                        <li class="answer" v-for="answer in shuffledAnswers" :key="answer">
                            <label class="btn btn-light w-100 py-3 fs-5 mb-3" :class="{'active': answer === currentAnswer}">
                                <input type="radio" class="d-none" :value="answer" v-model="currentAnswer">
                                <span v-html="answer"></span>
                            </label>
                        </li>                          
                    </ul>
                    <div class="navigation d-flex justify-content-between mb-5">
                        <button class="btn btn-light px-5 py-3" :disabled="currentNumber === 1 || backNumber === 1" @click="previousQuestion">Back</button>
                        <button class="btn btn-light px-5 py-3" :disabled="!currentAnswer" :class="{'active': currentAnswer}" @click="nextQuestion">
                            <span v-if="currentNumber !== 5">Next</span>
                            <span v-else>Submit</span>
                        </button>
                    </div>
                    <div class="pagination justify-content-center">
                        <button class="btn btn-light py-2 px-3 me-2" v-for="n in 5" :class="{'active': n === backNumber}" :disabled="!(n <= currentNumber)" @click="showPreviousQuestion(n)">
                            {{ n }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuizStore } from '../stores/quizStore';

const quizStore = useQuizStore();
</script>