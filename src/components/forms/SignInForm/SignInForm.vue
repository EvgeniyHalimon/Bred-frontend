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
    class="max-w-md p-6 mx-auto bg-white rounded-md shadow-lg"
  >
    <CustomInput name="email" type="email" />
    <CustomInput name="password" :type="inputType" />

    <div class="flex items-center mb-4">
      <input
        id="show-password"
        type="checkbox"
        @change="inputType = inputType === 'password' ? 'text' : 'password'"
        class="mr-2"
      />
      <label for="show-password" class="text-sm text-gray-700">Show password</label>
    </div>

    <button
      type="submit"
      class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
    >
      Login
    </button>
    <slot></slot>
  </Form>
</template>
