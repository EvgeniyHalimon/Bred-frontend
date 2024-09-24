<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import UpdateUserSchema from './UpdateUserSchema';
import { useUserStore } from '@/store';
import CustomInput from '@/components/CustomInput.vue';

const userStore = useUserStore();
const user = userStore.user;
const { handleSubmit } = useForm({
  validationSchema: UpdateUserSchema,
  initialValues: {
    firstName: user?.firstName,
    lastName: user?.lastName,
    bio: user?.bio
  }
});

const { value: firstName } = useField<string>('firstName');
const { value: lastName } = useField<string>('lastName');
const { value: bio } = useField<string>('bio');

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<template>
  <form @submit="onSubmit">
    <CustomInput name="firstName" type="text" v-model="firstName" />
    <CustomInput name="lastName" type="text" v-model="lastName" />
    <CustomInput name="bio" type="text" v-model="bio" />

    <button
      type="submit"
      class="px-4 py-2 font-mono text-sm font-medium transition-all cursor-pointer hover:font-bold duration-400 clip-path-custom text-neutral-900 bg-lime-600 hover:bg-lime-500"
    >
      Submit
    </button>
  </form>
</template>
