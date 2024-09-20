<script setup lang="ts">
import { ref } from 'vue';
import { Form } from 'vee-validate';
import SignInValidationSchema from './SignInValidationSchema';
import { CustomInput } from '../../../components';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';

const inputType = ref('password');
const router = useRouter();
const authStore = useAuthStore();
const onSubmit = async (values: any) => {
  const result = await authStore.login(values);
  if (result) {
    router.push('/');
  }
};
</script>

<template>
  <Form
    @submit="onSubmit"
    :validationSchema="SignInValidationSchema"
    class="max-w-md p-6 mx-auto border-2 border-lime-600"
  >
    <CustomInput name="email" type="email" />
    <CustomInput name="password" :type="inputType" />

    <div class="flex items-center mb-4">
      <input
        id="show-password"
        type="checkbox"
        @change="inputType = inputType === 'password' ? 'text' : 'password'"
        class="mr-2 cursor-pointer accent-lime-600"
      />
      <label for="show-password" class="text-sm text-lime-600">Show password</label>
    </div>

    <button
      type="submit"
      class="px-4 py-2 font-mono text-sm font-medium transition-all cursor-pointer hover:font-bold duration-400 clip-path-custom text-neutral-900 bg-lime-600 hover:bg-lime-500"
    >
      Login
    </button>
    <slot></slot>
  </Form>
</template>
