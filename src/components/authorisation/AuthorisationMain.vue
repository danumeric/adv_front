<template>
  <div class="container">
    <form name="auth" class="auth-form" @submit.prevent="submitAuthForm()">
      <input
        v-model="authForm.user"
        class="auth-form__field"
        name="login"
        placeholder="username"
        required
      />
      <input
        minlength="8"
        v-model="authForm.password"
        type="password"
        class="auth-form__field auth-form__field_password"
        name="password"
        placeholder="password"
        required
      />
      <button type="submit" class="auth-form__btn-submit">Войти</button>
      <p class="auth-form__error">{{ errorLoginMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { AuthForm } from '@/models/ts.model'
import { useUserDataStore } from '@/store/userData'
import axios from 'axios'
import router from '@/router'
import type { Ref } from 'vue'

let errorLoginMessage: Ref<string> = ref('')
const authForm: AuthForm = reactive({
  user: 'user',
  password: '123456789',
})
const userDataStore = useUserDataStore()

async function submitAuthForm() {
  await userDataStore
    .submitAuthForm(authForm)
    .then(() => router.push({ path: '/' }))
    .catch((e) => {
      errorLoginMessage.value = 'Неверный логин/пароль'
    })
}
</script>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  margin-top: 11rem;
  background: #d9d9d9;
  padding: 3.5625rem 6.75rem 1.375rem 2.375rem;
  max-width: 344px;
  &__field {
    background: #fffefe;
    padding-left: 1.0625rem;
    width: 180px;
    height: 34px;

    &_password {
      margin-top: 2rem;
    }
  }
  &__btn-submit {
    align-self: end;
    margin-top: 2.3125rem;
    background: #ffffff;
    width: 104px;
    height: 29px;
  }
  &__error {
    margin-top: 1rem;
    color: #ff0000;
  }
}
</style>
