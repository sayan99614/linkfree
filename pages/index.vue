<template>
  <ClientOnly>
    <AuthLayout>
      <div class="mt-12 mx-auto">
        <div class="text-center">
          <h1 class="text-4xl font-bold">Welcome Back</h1>
          <p class="mt-3 text-gray-400">Login to your linkfree</p>
        </div>
        <form class="mt-10 flex flex-col gap-4" @submit.prevent="loginSubmit">
          <TextInput
            id="email"
            type="text"
            placeholder="Email or Username"
            :required="true"
            v-model:value="email.value"
            :error="email.error"
          />

          <TextInput
            id="password"
            type="password"
            placeholder="Password"
            :required="true"
            v-model:value="password.value"
            :error="password.error"
          />
          <div class="text-sm ml-2">
            <a class="text-blue-700" href="#">Forgot password?</a>
            &nbsp;&#x25CF;&nbsp;
            <a class="text-blue-700" href="#">Forgot username?</a>
          </div>
          <button
            :class="[
              'mt-6 login__btn',
              email.value && password.value ? 'has_email_password' : 'inactive',
            ]"
            type="submit"
          >
            Login
          </button>
        </form>
        <div class="text-center mt-5">
          Don't have an account &nbsp;
          <NuxtLink
            class="text-blue-500 border-b border-blue-500"
            to="/register"
            >Sign up</NuxtLink
          >
        </div>
      </div>
    </AuthLayout>
  </ClientOnly>
</template>
<script setup>
import AuthLayout from "~/layouts/AuthLayout.vue";
import TextInput from "~/components/TextInput.vue";
import InputValidator from "~/utils/Validator.js";

definePageMeta({
  middleware: "auth",
});

const email = ref({
  value: "",
  error: "",
});
const password = ref({
  value: "",
  error: "",
});

const { loginUser } = useUserStore();
const router = useRouter();

const loginSubmit = async () => {
  const inputValidator = new InputValidator();
  email.value.error = inputValidator.validateEmail(email.value.value, {
    required: true,
  });
  password.value.error = inputValidator.validatePassword(password.value.value, {
    required: true,
    minLength: 5,
    maxLength: 15,
  });

  if (!inputValidator.hasError) {
    const user = {
      email: email.value.value,
      password: password.value.value,
    };

    const data = await loginUser(user);

    if (data) {
      router.replace("/admin");
    }
  }
};
</script>
<style scoped></style>
