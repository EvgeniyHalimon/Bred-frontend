<script lang="ts">
import { ref } from 'vue';
import { SignInForm, SignUpForm } from '../components';
export default {
  components: {
    SignInForm,
    SignUpForm
  },
  setup() {
    const isSignUpForm = ref(false);
    const changeForm = () => (isSignUpForm.value = !isSignUpForm.value);
    return {
      isSignUpForm,
      changeForm
    };
  }
};
</script>

<template>
  <div>
    <SignUpForm v-if="isSignUpForm">
      <p class="mt-3">
        Already have an account?
        <span class="underline cursor-pointer" @click="changeForm">Sign In</span>
      </p>
    </SignUpForm>
    <SignInForm v-else>
      <p class="mt-3">
        Don't have an account?
        <span class="underline cursor-pointer" @click="changeForm">Sign Up</span>
      </p>
    </SignInForm>
  </div>
</template>
