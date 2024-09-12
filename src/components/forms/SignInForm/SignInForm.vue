<script setup lang="ts">
import { ref } from 'vue';
import { Form } from 'vee-validate';
import SignInValidationSchema from './SignInValidationSchema';
import { CustomInput } from '../../../components';
import axiosWorker from '@/shared/axios';

const inputType = ref('password');

const onSubmit = async (values: any) => {
  await axiosWorker().post('/auth/login', values);
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
