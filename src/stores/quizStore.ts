import { ref, computed } from "vue"
import { defineStore } from "pinia"

import { type categoryListType, type question } from '../types/quizTypes'

export const useQuizStore = defineStore('quiz', () => {
    // home page 
    const categoryList = ref<categoryListType[]>([]);
    const difficulty = ref<string>('');
    const category = ref<number | null>(null);

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
    const backNumber = ref<number>(1);
    const currentAnswers = ref<string[]>([]);
    const currentAnswer = ref<string>('');
    const yourAnswers = ref<string[]>([]);
    
    const getQuestionList = async() => {
        try {
            const response = await fetch(URL.value);
            const jsonResponse = await response.json();
            questionList.value = jsonResponse.results;
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
        yourAnswers.value.push(currentAnswer.value);
        currentNumber.value ++;
    }

/*     // resulte page

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
    }; */

    return { category, categoryList, difficulty, getCategories
           , currentAnswer, currentAnswers, currentNumber, questionList, currentQuestion, shuffledAnswers, yourAnswers, getQuestionList, getQuestion, nextQuestion,
    }
})