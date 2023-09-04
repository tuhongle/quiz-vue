import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useQuizStore = defineStore('quiz', () => {
    // home page 
    const categoryList = ref<string[]>([]);
    const difficulty = ref<string>('');
    const category = ref<string>('');

    const getCategories = async () => {
        try {
            const response = await fetch('https://opentdb.com/api_category.php');
            const jsonResponse = await response.json();
            categoryList.value = jsonResponse.trivia_categories;
        } catch (err) {
            console.log(err);
        }
    };

    getCategories();

/* 
    // question page

    const questionList = ref([]);
    const currentQuestion = ref({});
    const currentNumber = ref(1);
    const backNumber = ref(1);
    const currentAnswers = ref([]);
    const currentAnswer = ref('');
    const yourAnswers = ref([]);


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

    // resulte page

    const questionResults = computed(() => {
        const results = [];
        for (let i = 0; i < props.titleList.length; i ++) {
            results.push([props.titleList[i], props.correctAnswers[i], props.yourAnswers[i]]);
        };
        return results;
    });
    const score = computed(() => {
        let score = 0;
        for (let i = 0; i < props.correctAnswers.length; i ++) {
            if (props.yourAnswers[i] === props.correctAnswers[i]) {
                score ++;
            };
        };
        return score;
    });

    const tryAgain = () => {
    };
    const restart = () => {
    };
    const newGame = () => {
    };
 */
    return { category, categoryList, difficulty

    }
})