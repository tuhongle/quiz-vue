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

<script setup>
import { ref, computed } from 'vue';

const questionList = ref([]);
const currentQuestion = ref({});
const currentNumber = ref(1);
const backNumber = ref(1);
const currentAnswers = ref([]);
const currentAnswer = ref('');
const yourAnswers = ref([]);

/* const props = defineProps({
    difficulty: String,
    category: String,
    questionListProps: String
}); */
const props = defineProps(['difficulty','category','questionListProps']);
const emit = defineEmits(['submit']);

const correctAnswers = computed(() => {
    return questionList.value.map(el => el.correct_answer);
});
const shuffledAnswers = computed(() => {
    return shuffle(currentAnswers.value);
});
const titleList = computed(() => {
    return questionList.value.map(el => el.question);
});

const getQuestionList = async (URL) => {
    try {
        const response = await fetch(URL);
        const jsonResponse = await response.json();
        return jsonResponse.results;
    } catch (err) {
        console.log(err);
    }
};
const getQuestion = (num) => {
    currentQuestion.value = questionList.value[num - 1];
    currentAnswers.value = [currentQuestion.value.correct_answer, ...currentQuestion.value.incorrect_answers]
};
const shuffle = (array) => {
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
};
const nextQuestion = () => {
    if (currentNumber.value === 5) {
        yourAnswers.value.push(currentAnswer.value);
        emit('submit',[yourAnswers.value, correctAnswers.value, titleList.value, questionList.value]);
    } else {
        if (backNumber.value < currentNumber.value) {
            yourAnswers.value[backNumber.value - 1] = currentAnswer.value;
            backNumber.value ++;
            getQuestion(backNumber.value);
            currentAnswer.value = yourAnswers.value[backNumber.value - 1];
        } else {
            yourAnswers.value.push(currentAnswer.value);
            currentAnswer.value = '';
            currentNumber.value ++;
            backNumber.value ++ ;
            getQuestion(currentNumber.value);
        }
    }
};
const previousQuestion = () => {
    backNumber.value --;
    getQuestion(backNumber.value);
    currentAnswer.value = yourAnswers.value[backNumber.value - 1];
};
const showPreviousQuestion = (n) => {
    if (n > backNumber.value) {
        nextQuestion();
    };
    backNumber.value = n;
    getQuestion(backNumber.value);
    currentAnswer.value = yourAnswers.value[backNumber.value - 1];
};

if (!props.questionListProps.length) {
    const URLtoFetch = `https://opentdb.com/api.php?amount=5&category=${props.category}&difficulty=${props.difficulty}&type=multiple`;
    questionList.value = await getQuestionList(URLtoFetch);
} else {
    questionList.value = props.questionListProps;
}
getQuestion(currentNumber.value);
</script>