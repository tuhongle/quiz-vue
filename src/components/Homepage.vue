<template>
    <!-- homePage -->
    <main v-if="homePage" class="homePage">
        <section class="title text-light py-5">
            <div class="container-lg">
                <h1 class="display-1 text-center fst-italic fw-bold">Take a Quiz!</h1>
            </div>
        </section>
        <section class="difficult text-light py-5">
            <div class="container-lg">
                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                        <h3 class="text-center fw-bold border-5 border-bottom px-2 pb-3">Difficulty</h3>
                    </div>
                </div>
                <div class="row row-cols-md-2 row-cols-lg-4 g-3">
                    <div class="col">
                        <label class="btn btn-light text-center w-100 py-3 fs-5" :class="{'active': difficulty === ''}">
                            <input type="radio" class="d-none" value="" v-model="difficulty">
                            Any Difficulty
                        </label>
                    </div>
                    <div class="col">
                        <label class="btn btn-light text-center w-100 py-3 fs-5" :class="{'active': difficulty === 'easy'}">
                            <input type="radio" class="d-none" value="easy" v-model="difficulty">
                            Easy
                        </label>
                    </div>
                    <div class="col">
                        <label class="btn btn-light text-center w-100 py-3 fs-5" :class="{'active': difficulty === 'medium'}">
                            <input type="radio" class="d-none" value="medium" v-model="difficulty">
                            Medium
                        </label>
                    </div>
                    <div class="col">
                        <label class="btn btn-light text-center w-100 py-3 fs-5" :class="{'active': difficulty === 'hard'}">
                            <input type="radio" class="d-none" value="hard" v-model="difficulty">
                            Hard
                        </label>
                    </div>
                </div>
            </div>
        </section>
        <section class="category text-light py-5">
            <div class="container-lg">
                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                        <h3 class="text-center fw-bold border-5 border-bottom px-2 pb-3">Category</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col d-flex justify-content-between flex-wrap">
                        <label class="btn btn-light text-center py-3 fs-5 me-3 mb-3 flex-grow-1" :class="{'active': category === ''}">
                            <input type="radio" class="d-none" value="" v-model="category">
                            Any Category
                        </label>
                        <label class="btn btn-light text-center py-3 fs-5 me-3 mb-3 flex-grow-1" :class="{'active': category === categoryItem.id}" v-for="categoryItem in categoryList" :key="categoryItem.id">
                            <input type="radio" class="d-none" :value="categoryItem.id" v-model="category">
                            {{ categoryItem.name }}
                        </label>
                    </div>
                </div>
            </div>
        </section>
        <section class="button text-light">
            <div class="container-lg text-center">
                <button class="btn btn-danger py-3 px-5 fs-3" @click="startGame">Start</button>
            </div>
        </section>
    </main>
    <!-- questionPage -->
    <main v-if="questionPage" class="questionPage vh-100 vw-100">
        <section class="question h-100">
            <div class="container-lg text-center py-5 h-100 d-flex align-items-center justify-content-center">
                <div class="row d-flex justify-content-center">
                    <div class="col-8 text-light">
                        <h3 class="lh-lg fw-bold">{{ currentQuestion.question }}</h3>
                        <ul class="answerLists list-unstyled mt-5">
                            <li class="answer" v-for="answer in shuffledAnswers" :key="answer">
                                <label class="btn btn-light w-100 py-3 fs-5 mb-3">
                                    <input type="radio">
                                    {{ answer }}
                                </label>
                            </li>                          
                        </ul>
                        <div class="navigation d-flex justify-content-between mb-5">
                            <button class="btn btn-secondary px-5 py-3">Back</button>
                            <button class="btn btn-secondary px-5 py-3">Next</button>
                        </div>
                        <div class="pagination justify-content-center">
                            <button class="btn btn-secondary py-2 px-3 me-2">1</button>
                            <button class="btn btn-secondary py-2 px-3 me-2">2</button>
                            <button class="btn btn-secondary py-2 px-3 me-2">3</button>
                            <button class="btn btn-secondary py-2 px-3 me-2">4</button>
                            <button class="btn btn-secondary py-2 px-3 me-2">5</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <!-- resultPage -->
    <main v-if="resultPage" class="resultPage text-light vw-100">
        <section class="result">
            <div class="container-lg py-5 text-center">
                <div class="row border-bottom border-3">
                    <div class="col">
                        <div class="display-1 rounded-circle border-3 border border-light mb-5 text-center d-flex align-items-center justify-content-center fw-bold mx-auto" id="score">1/5</div>
                        <h1 class="fw-bold mb-5">Better luck next time</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="questions">
            <div class="container-lg text-center">
                <div class="row flex-column align-items-center py-5">
                    <h3 class="mb-4 fw-bold px-5">There aren't any live-action clones in "Star Wars: Episode III - Revenge of the Sith".</h3>
                    <div class="rectangle-line bg-light py-1 px-3 mb-5"></div>
                    <div class="col-10 col-md-8">
                        <p class="bg-success py-4 fw-bold fs-5 mb-3">Correct answer: True</p>
                        <p class="bg-danger py-4 fw-bold fs-5">Your answer: True</p>
                    </div>
                </div>
                <div class="row flex-column align-items-center py-5">
                    <h3 class="mb-4 fw-bold px-5">There aren't any live-action clones in "Star Wars: Episode III - Revenge of the Sith".</h3>
                    <div class="rectangle-line bg-light py-1 px-3 mb-5"></div>
                    <div class="col-10 col-md-8">
                        <p class="bg-success py-4 fw-bold fs-5 mb-3">Correct answer: True</p>
                        <p class="bg-danger py-4 fw-bold fs-5">Your answer: True</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="functions">
            <div class="container-lg py-5 text-center">
                <div class="row justify-content-center">
                    <div class="col-8 col-md-6 col-lg-4 mb-3 mb-lg-0">
                        <button class="btn btn-light w-100 py-3 fw-bold">Try Again</button>
                    </div>
                    <div class="col-8 col-md-6 col-lg-4 mb-3 mb-lg-0">
                        <button class="btn btn-light w-100 py-3 fw-bold">Restart with new questions</button>
                    </div>
                    <div class="col-8 col-md-6 col-lg-4 mb-3 mb-lg-0">
                        <button class="btn btn-light w-100 py-3 fw-bold">New Game</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
export default {
    name: 'Homepage',
    data() {
        return {
            homePage: true,
            questionPage: false,
            resultPage: false,
            categoryList: [],
            difficulty: '',
            category: '',
            questionList: [],
            currentQuestion: {},
            currentAnswers: [],
        }
    },
    methods: {
        getCategories: async () => {
            try {
                const response = await fetch('https://opentdb.com/api_category.php');
                const jsonResponse = await response.json();
                return jsonResponse.trivia_categories;
            } catch (err) {
                console.log(err);
            }
        },
        getQuestionList: async (URL) => {
            try {
                const response = await fetch(URL);
                const jsonResponse = await response.json();
                return jsonResponse.results;
            } catch (err) {
                console.log(err);
            }
        },
        startGame() {
            this.homePage = false;
            this.questionPage = true;
            this.resultPage = false;
            this.currentQuestion = this.questionList[0];
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
        }
    },
    computed: {
        shuffledAnswers() {
            return this.shuffle(this.currentAnswers);
        }
    },
    async mounted() {
        this.categoryList = await this.getCategories();
    },
    async updated() {
        if (this.category && this.difficulty) {
            const URLtoFetch = `https://opentdb.com/api.php?amount=10&category=${this.category}&difficulty=${this.difficulty}&type=multiple`;
            this.questionList = await this.getQuestionList(URLtoFetch);
        };
    }
}
</script>