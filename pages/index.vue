<template>
  <AuthLayout>
    <div class="mt-12 mx-auto">
      <div class="text-center">
        <h1 class="text-4xl font-bold">Welcome Back</h1>
        <p class="mt-3 text-gray-400">Login to your linkfree</p>
      </div>
      <form class="mt-10 flex flex-col gap-4">
        <input class="inp" type="text" placeholder="Email or username" />
        <input class="inp" type="password" placeholder="Password" />
        <div class="text-sm">
          <a class="text-blue-700" href="#">Forgot password?</a>
          &nbsp;&#x25CF;&nbsp;
          <a class="text-blue-700" href="#">Forgot username?</a>
        </div>
        <button class="mt-6 login__btn inactive" type="submit">Login</button>
      </form>
    </div>
  </AuthLayout>
</template>
<script setup>
import AuthLayout from "~/layouts/AuthLayout.vue";
</script>
<style scoped></style>
