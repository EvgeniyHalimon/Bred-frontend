<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import UpdateUserSchema from './UpdateUserSchema';
import { useUserStore } from '@/store';
import CustomInput from '@/components/CustomInput.vue';
import { ref, toRefs } from 'vue';
import type { IUser } from '@/shared/types';
import { getInitials } from '@/shared/utils';

const userStore = useUserStore();
const { user } = toRefs(userStore);
const { handleSubmit } = useForm({
  validationSchema: UpdateUserSchema,
  initialValues: {
    firstName: user.value?.firstName,
    lastName: user.value?.lastName,
    bio: user.value?.bio,
    file: user.value?.photo
  }
});

const photo = ref<any>(user.value?.photo || null);
const photoPreview = ref<string | null>(null);
const isDragging = ref(false);

const { value: firstName } = useField<string>('firstName');
const { value: lastName } = useField<string>('lastName');
const { value: bio } = useField<string>('bio');

const onSubmit = handleSubmit(async (values) => {
  const { firstName, lastName, bio } = values as {
    firstName: string;
    lastName: string;
    bio: string;
  };
  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('bio', bio);
  photo.value && formData.append('file', photo.value);
  const { data } = await userStore.patchUser(formData as Partial<IUser>);
  if (data) {
    userStore.setUser(data);
  }
});

const handleFileChange = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    photo.value = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(photo.value);
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
  isDragging.value = false;

  const files = event.dataTransfer?.files;
  if (files && files[0]) {
    photo.value = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(photo.value);
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <CustomInput name="firstName" type="text" v-model="firstName" />
    <CustomInput name="lastName" type="text" v-model="lastName" />
    <CustomInput name="bio" type="text" v-model="bio" />

    <div
      class="flex flex-col items-center justify-center p-4 overflow-y-auto border-2 border-dashed rounded-md"
      :class="isDragging ? 'border-lime-700 bg-lime-100' : 'border-lime-500'"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <img
        v-if="photoPreview"
        :src="photoPreview"
        :alt="`${firstName}-${lastName}-avatar-preview`"
        class="object-cover mb-4 rounded-full w-14 h-14"
      />

      <img
        v-else-if="user && user.photo"
        :src="user.photo"
        :alt="`${user.firstName}-${user.lastName}-avatar`"
        class="object-cover mb-4 rounded-full w-14 h-14"
      />
      <div
        v-else-if="user"
        class="flex items-center justify-center mb-4 rounded-full w-14 h-14 bg-neutral-800"
      >
        <span class="font-mono text-xl text-lime-600">
          {{ getInitials(user.firstName, user.lastName) }}
        </span>
      </div>

      <p class="text-sm text-lime-600" v-if="!photoPreview">Drag & Drop your image here</p>

      <label
        for="file"
        class="px-4 py-2 mt-4 text-sm transition-all cursor-pointer text-neutral-900 duration-400 clip-path-custom bg-lime-600 hover:bg-lime-500"
      >
        Or Upload Photo
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          class="sr-only"
          @change="handleFileChange"
        />
      </label>
    </div>

    <button
      type="submit"
      class="px-4 py-2 font-mono text-sm font-medium transition-all cursor-pointer hover:font-bold duration-400 clip-path-custom text-neutral-900 bg-lime-600 hover:bg-lime-500"
    >
      Submit
    </button>
  </form>
</template>
