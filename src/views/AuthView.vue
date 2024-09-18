<script lang="ts">
import { onMounted, ref } from 'vue';
import { SignInForm, SignUpForm } from '../components';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';
export default {
  components: {
    SignInForm,
    SignUpForm
  },
  setup() {
    const isSignUpForm = ref(false);
    const changeForm = () => (isSignUpForm.value = !isSignUpForm.value);
    const authStore = useAuthStore();
    const router = useRouter();
    onMounted(() => {
      if (authStore.accessTokenFromLocalStorage) {
        router.push('/');
      }
    });
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
