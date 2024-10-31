<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import SignUpValidationSchema from './SignUpValidationSchema';
import { CustomInput } from '../../../components';
import { useAuthStore } from '@/store/authStore';

const inputType = ref('password');

const authStore = useAuthStore();

const { handleSubmit } = useForm({
  validationSchema: SignUpValidationSchema,
  initialValues: {
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    password: ''
  }
});

const { value: firstName } = useField<string>('firstName');
const { value: lastName } = useField<string>('lastName');
const { value: bio } = useField<string>('bio');
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit((values: any) => {
  authStore.register(values);
});
</script>

<template>
  <form @submit="onSubmit" class="max-w-md p-6 mx-auto border-2 border-lime-600">
    <CustomInput name="email" type="text" v-model="email" />
    <CustomInput name="password" :type="inputType" v-model="password" />
    <CustomInput name="firstName" type="text" v-model="firstName" />
    <CustomInput name="lastName" type="text" v-model="lastName" />
    <CustomInput name="bio" type="textarea" v-model="bio" />

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
  </form>
</template>
