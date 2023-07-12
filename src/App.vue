<template>
  <main v-if="homePage" class="homePage">
    <Homepage @start="OpenQuestionPage" />
  </main>
  <main v-if="questionPage" class="questionPage vh-100 vw-100">
    <QuestionPage :difficulty="difficulty" :category="category" :questionListProps="questionList" @submit="OpenResultPage"/>
  </main>
  <main v-if="resultPage" class="resultPage text-light vw-100">
    <ResultPage :yourAnswers="yourAnswers" :correctAnswers="correctAnswers" :titleList="titleList" @tryAgain="tryAgain" @restart="restart" @newGame="newGame"/>
  </main> 
</template>

<script>
import Homepage from './components/Homepage.vue'
import QuestionPage from './components/QuestionPage.vue'
import ResultPage from './components/ResultPage.vue'

export default {
  name: 'App',
  emits: ['start'],
  components: {
    Homepage,
    QuestionPage,
    ResultPage
  },
  data() {
    return {
      homePage: true,
      questionPage: false,
      resultPage: false,
      difficulty: null,
      category: null,
      questionList: [],
      titleList: null,
      yourAnswers: null,
      correctAnswers: null,
    }
  },
  methods: {
    OpenQuestionPage(data) {
      this.difficulty = data[0];
      this.category = data[1];
      this.homePage = false;
      this.questionPage = true;
    },
    OpenResultPage(data) {
      this.yourAnswers = data[0];
      this.correctAnswers = data[1];
      this.titleList = data[2];
      this.questionList = data[3];
      this.homePage = false;
      this.questionPage = false;
      this.resultPage = true;
    },
    tryAgain() {
      this.resultPage = false;
      this.questionPage = true;
    },
    restart() {
      this.questionList = [],
      this.resultPage = false;
      this.questionPage = true;
    },
    newGame() {
      this.questionList = [],
      this.resultPage = false;
      this.homePage = true;
    }
  },
}
</script>
