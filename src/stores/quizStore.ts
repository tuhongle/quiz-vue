import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"

import { type categoryListType, type question } from '../types/quizTypes'

export const useQuizStore = defineStore('quiz', () => {
    const Router = useRouter();
    // home page 
    const categoryList = ref<categoryListType[]>([]);
    const difficulty = ref<string>('');
    const category = ref<number | null>(null);
    const newQuestionList = ref<boolean>(true);

    const getCategories = async () => {
        try {
            const response = await fetch('https://opentdb.com/api_category.php');
            const jsonResponse = await response.json();
            categoryList.value = jsonResponse.trivia_categories;
        } catch (err) {
            console.log(err);
        }
    };

    const URL = computed(() => {
        let url = 'https://opentdb.com/api.php?amount=5&type=multiple';
        if (difficulty.value) {
            url += `&difficulty=${difficulty.value}`;
        }
        if (category.value) {
            url += `&category=${category.value}`;
        }
        return url;
    });

    // question page

    const questionList = ref<question[]>([]);
    const currentQuestion = ref<question>();
    const currentNumber = ref<number>(1);
    const backNumber = ref<number>(0);
    const currentAnswers = ref<string[]>([]);
    const currentAnswer = ref<string>('');
    const yourAnswers = ref<string[]>([]);
    
    const getQuestionList = async() => {
        try {
            const response = await fetch(URL.value);
            const jsonResponse = await response.json();
            if (newQuestionList.value) {
                questionList.value = jsonResponse.results;
            };
        } catch (err) {
            console.log(err);
        }
    };
    
    const correctAnswers = computed(() => {
        return questionList.value.map(el => el.correct_answer);
    });

    const shuffledAnswers = computed(() => {
        return shuffle(currentAnswers.value);
    });

    const titleList = computed(() => {
        return questionList.value.map(el => el.question);
    });

    const getQuestion = () => {
        currentQuestion.value = questionList.value[currentNumber.value - 1];
        currentAnswers.value = [currentQuestion.value.correct_answer, ...currentQuestion.value.incorrect_answers];
    };

    /* function to shuffle items inside array */
    const shuffle = (array: string[]) => {
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
        if (!yourAnswers.value[currentNumber.value - 1]) {
            yourAnswers.value.push(currentAnswer.value);
        } else {
            yourAnswers.value[currentNumber.value - 1] = currentAnswer.value;
        }
        currentNumber.value ++;
        backNumber.value = 0;
    }

    const prevQuestion = () => {
        if (currentNumber.value > 1) {
            currentNumber.value --
        };
        currentAnswer.value = yourAnswers.value[currentNumber.value - 1];
        backNumber.value = 0;
    }

    const chooseQuestion = (n: number) => {
        if (backNumber.value) {
            yourAnswers.value[backNumber.value - 1] = currentAnswer.value;
        }
        currentNumber.value = n;
        currentAnswer.value = yourAnswers.value[currentNumber.value - 1];
        backNumber.value = n;
    }

    const submitQuestion = () => {
        if (!yourAnswers.value[currentNumber.value - 1]) {
            yourAnswers.value.push(currentAnswer.value);
        } else {
            yourAnswers.value[currentNumber.value - 1] = currentAnswer.value;
        }
        backNumber.value = 0;
        Router.push('/result');
    }
    

    // resulte page

    const questionResults = computed(() => {
        const results = [];
        for (let i = 0; i < titleList.value.length; i ++) {
            results.push([titleList.value[i], correctAnswers.value[i], yourAnswers.value[i]]);
        };
        return results;
    });
    
    const score = computed(() => {
        let score = 0;
        for (let i = 0; i < correctAnswers.value.length; i ++) {
            if (yourAnswers.value[i] === correctAnswers.value[i]) {
                score ++;
            };
        };
        return score;
    });

    const tryAgain = () => {
        newQuestionList.value = false;
        yourAnswers.value = [];
        currentNumber.value = 1;
        getQuestion();
        Router.push('/question');
    };
    const restart = () => {
        newQuestionList.value = true;
        yourAnswers.value = [];
        currentNumber.value = 1;
        getQuestion();
        Router.push('/question');
    };
    const newGame = () => {
        newQuestionList.value = true;
        yourAnswers.value = [];
        currentNumber.value = 1;
        getQuestion();
        category.value = null;
        difficulty.value = '';
        Router.push('/');
    };

    return { category, categoryList, difficulty, getCategories
           , currentAnswer, currentAnswers, currentNumber, questionList, currentQuestion, shuffledAnswers, yourAnswers
           , getQuestionList, getQuestion, nextQuestion, prevQuestion, chooseQuestion, submitQuestion
           , questionResults, score, tryAgain, restart, newGame
    }
})