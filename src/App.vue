<template>
  <main v-if="homePage" class="homePage">
    <Suspense>
      <template #default>
        <Homepage @start="OpenQuestionPage" />
      </template>
      <template #fallback>
        <div class="container-lg vw-100 vh-100 d-flex justify-content-center align-items-center">
          <div class="card bg-transparent text-center p-5">
            <h1 class="display-1 fw-bold fst-italic">Take A Quiz</h1>
            <h3 class="display-3 fst-italic">Loading...</h3>
            <div class="d-flex justify-content-center">
              <div class="spinner-border m-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Suspense>
  </main>
  <main v-if="questionPage" class="questionPage vh-100 vw-100">
    <Suspense>
      <template #default>
        <QuestionPage :difficulty="difficulty" :category="category" :questionListProps="questionList" @submit="OpenResultPage"/>
      </template>
      <template #fallback>
        <div class="container-lg vw-100 vh-100 d-flex justify-content-center align-items-center">
          <div class="card bg-transparent text-center p-5">
            <h1 class="display-1 fw-bold fst-italic">Thinking of questions</h1>
            <h3 class="display-3 fst-italic">Loading...</h3>
            <div class="d-flex justify-content-center">
              <div class="spinner-border m-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Suspense>
  </main>
  <main v-if="resultPage" class="resultPage text-light vw-100">
    <ResultPage :yourAnswers="yourAnswers" :correctAnswers="correctAnswers" :titleList="titleList" @tryAgain="tryAgain" @restart="restart" @newGame="newGame"/>
  </main> 
</template>

<script setup>
import { ref } from 'vue'
import Homepage from './components/Homepage.vue'
import ResultPage from './components/ResultPage.vue'
import QuestionPage from './components/QuestionPage.vue'

/* const Homepage = defineAsyncComponent(() => 
  import('./components/Homepage.vue')
);
 */
/* const QuestionPage = defineAsyncComponent(() =>
  import('./components/QuestionPage.vue')
); */

const homePage = ref(true);
const questionPage = ref(false);
const resultPage = ref(false);
const difficulty = ref(null);
const category = ref(null);
const questionList = ref([]);
const titleList = ref(null);
const yourAnswers = ref(null);
const correctAnswers = ref(null);

const OpenQuestionPage = data => {
  difficulty.value = data[0];
  category.value = data[1];
  homePage.value = false;
  questionPage.value = true;
};
const OpenResultPage = data => {
  yourAnswers.value = data[0];
  correctAnswers.value = data[1];
  titleList.value = data[2];
  questionList.value = data[3];
  homePage.value = false;
  questionPage.value = false;
  resultPage.value = true;
};
const tryAgain = () => {
  resultPage.value = false;
  questionPage.value = true;
};
const restart = () => {
  questionList.value = [],
  resultPage.value = false;
  questionPage.value = true;
};
const newGame = () => {
  questionList.value = [],
  resultPage.value = false;
  homePage.value = true;
}

</script>
