<template>
  <div id="AuthLayout" class="h-screen w-full flex justify-between">
    <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
      <NuxtLink to="/" class="flex items-center gap-1">
        <h1 class="lg:text-2xl text-xl text-bold">Linkfree</h1>
        <img
          src="~/assets/images/linktree-logo.png"
          alt="linktreelogo"
          class="lg:w-7 w-6"
        />
      </NuxtLink>
      <main class="w-full">
        <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
          <slot></slot>
        </div>
      </main>
    </div>
    <div class="lg:block hidden w-1/3 pointer-events-none">
      <img
        src="~/assets/images/side1.png"
        alt="auth-bg"
        class="w-full h-screen object-cover select-none"
      />
    </div>
  </div>
</template>
<script setup></script>
<style scoped></style>
