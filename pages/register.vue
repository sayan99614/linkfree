<template>
  <AuthLayout>
    <div class="mt-12 mx-auto">
      <div class="text-center">
        <h1 class="text-4xl font-bold">Join Linkfree</h1>
        <p class="mt-3 text-gray-400">Signup for free!</p>
      </div>
      <form class="mt-10 flex flex-col gap-4" @submit.prevent="loginSubmit">
        <TextInput
          id="username"
          type="text"
          placeholder="Username"
          :required="true"
          v-model:value="email.value"
          :error="email.error"
        />
        <TextInput
          id="email"
          type="text"
          placeholder="Email"
          :required="true"
          v-model:value="username.value"
          :error="username.error"
        />

        <button
          :class="[
            'mt-6 login__btn',
            email.value && username.value ? 'has_email_password' : 'inactive',
          ]"
          type="submit"
        >
          Register
        </button>
      </form>
      <div class="text-center mt-5">
        Already have an account &nbsp;
        <NuxtLink class="text-blue-500 border-b border-blue-500" to="/"
          >Login</NuxtLink
        >
      </div>
    </div>
  </AuthLayout>
</template>
<script setup>
import AuthLayout from "~/layouts/AuthLayout.vue";
import TextInput from "~/assets/components/TextInput.vue";
import InputValidator from "~/utils/Validator.js";

const email = ref({
  value: "",
  error: "",
});
const username = ref({
  value: "",
  error: "",
});

const loginSubmit = () => {
  const inputValidator = new InputValidator();
  email.value.error = inputValidator.validateEmail(email.value.value, {
    required: true,
  });
  username.value.error = inputValidator.validateText(username.value.value, {
    required: true,
    minLength: 5,
    maxLength: 15,
  });

  console.log(inputValidator.hasError);
};
</script>
<style scoped></style>
