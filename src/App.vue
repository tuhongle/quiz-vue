<template>
  <main v-if="homePage" class="homePage">
    <Suspense>
      <template #default>
        <Homepage @start="OpenQuestionPage" />
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </main>
  <main v-if="questionPage" class="questionPage vh-100 vw-100">
    <Suspense>
      <template #default>
        <QuestionPage :difficulty="difficulty" :category="category" :questionListProps="questionList" @submit="OpenResultPage"/>
      </template>
      <template #fallback>
        Loading...
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
import QuestionPage from './components/QuestionPage.vue'
import ResultPage from './components/ResultPage.vue'

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
