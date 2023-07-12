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
                        <button class="btn btn-light px-5 py-3" :disabled="this.currentNumber === 1 || this.backNumber === 1" @click="previousQuestion">Back</button>
                        <button class="btn btn-light px-5 py-3" :disabled="!currentAnswer" :class="{'active': currentAnswer}" @click="nextQuestion">
                            <span v-if="currentNumber !== 5">Next</span>
                            <span v-else>Submit</span>
                        </button>
                    </div>
                    <div class="pagination justify-content-center">
                        <button class="btn btn-light py-2 px-3 me-2" v-for="n in 5" :class="{'active': n === currentNumber}" :disabled="(!currentAnswer || n !== (currentNumber + 1)) && n > currentNumber" @click="showPreviousQuestion(n)">
                            {{ n }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'QuestionPage',
    props: ['difficulty', 'category', 'questionListProps'],
    data() {
        return {
            questionList: [],
            currentQuestion: {},
            currentNumber: 1,
            backNumber: 1,
            currentAnswers: [],
            currentAnswer: '',
            yourAnswers: [],
            score: 0,
        }
    },
    methods: {
        getQuestionList: async (URL) => {
            try {
                const response = await fetch(URL);
                const jsonResponse = await response.json();
                return jsonResponse.results;
            } catch (err) {
                console.log(err);
            }
        },
        getQuestion(num) {
            this.currentQuestion = this.questionList[num - 1];
            this.currentAnswers = [this.currentQuestion.correct_answer, ...this.currentQuestion.incorrect_answers]
        },
        shuffle(array) {
            let currentIndex = array.length,  randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex != 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }

            return array;
        },
        nextQuestion() {
            if (this.currentNumber === 5) {
                this.yourAnswers.push(this.currentAnswer);
                this.$emit('submit',[this.yourAnswers, this.correctAnswers, this.titleList, this.questionList])
            } else {
                if (this.backNumber < this.currentNumber) {
                    this.yourAnswers[this.backNumber - 1] = this.currentAnswer;
                    this.backNumber ++;
                    this.getQuestion(this.backNumber);
                    this.currentAnswer = this.yourAnswers[this.backNumber - 1];
                } else {
                    this.yourAnswers.push(this.currentAnswer);
                    this.currentAnswer = '';
                    this.currentNumber ++;
                    this.backNumber ++ ;
                    this.getQuestion(this.currentNumber);
                }
            }
        },
        previousQuestion() {
            this.backNumber --;
            this.getQuestion(this.backNumber);
            this.currentAnswer = this.yourAnswers[this.backNumber - 1];
        },
        showPreviousQuestion(n) {
            this.backNumber = n;
            this.getQuestion(this.backNumber);
            this.currentAnswer = this.yourAnswers[this.backNumber - 1];
        }
    },
    computed: {
        shuffledAnswers() {
            return this.shuffle(this.currentAnswers);
        },
        correctAnswers() {
            return this.questionList.map(el => el.correct_answer);
        },
        titleList() {
            return this.questionList.map(el => el.question);
        }
    },
    async mounted() {
        if (!this.questionListProps.length) {
            const URLtoFetch = `https://opentdb.com/api.php?amount=5&category=${this.category}&difficulty=${this.difficulty}&type=multiple`;
            this.questionList = await this.getQuestionList(URLtoFetch);
        } else {
            this.questionList = this.questionListProps;
        }
        this.getQuestion(this.currentNumber);
    },
}
</script>