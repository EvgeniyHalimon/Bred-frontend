<script lang="ts">
import { ref } from 'vue';
import { SignInForm, SignUpForm } from '../components';
export default {
  components: {
    SignInForm,
    SignUpForm
  },
  setup() {
    const isSignUpForm = ref(true);
    return {
      isSignUpForm
    };
  }
};
</script>

<template>
  <div>
    <SignUpForm v-if="isSignUpForm" />
    <SignInForm v-else />
  </div>
</template>
