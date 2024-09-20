<script setup lang="ts">
import { ref } from 'vue';
import { Form } from 'vee-validate';
import SignUpValidationSchema from './SignUpValidationSchema';
import { CustomInput } from '../../../components';
import { useAuthStore } from '@/store/authStore';

const inputType = ref('password');

const authStore = useAuthStore();
const onSubmit = (values: any) => {
  authStore.register(values);
};
</script>

<template>
  <Form
    @submit="onSubmit"
    :validationSchema="SignUpValidationSchema"
    class="max-w-md p-6 mx-auto border-2 border-lime-600"
  >
    <CustomInput name="email" type="email" />
    <CustomInput name="password" :type="inputType" />
    <CustomInput name="firstName" type="firstName" />
    <CustomInput name="lastName" type="lastName" />
    <CustomInput name="bio" type="bio" />

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
      Sign Up
    </button>
    <slot></slot>
  </Form>
</template>
