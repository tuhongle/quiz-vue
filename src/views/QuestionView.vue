<template>
    <main class="questionPage vh-100 vw-100">
        <Suspense>
            <template #default>
                <QuestionPage />
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
</template>

<script setup lang="ts">
import QuestionPage from '../components/QuestionPage.vue'
</script>