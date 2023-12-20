export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return;

  const { isAuthenticated, getUser } = useUserStore();
  const user = await getUser();

  if (to.name === "admin" && !isAuthenticated) {
    if (user) {
      return navigateTo("/admin", { replace: true });
    }
    return navigateTo("/", { replace: true });
  }

  if (to.name === "index" && user) {
    return navigateTo("/admin", { replace: true });
  }

  if (to.name === "register" && user) {
    return navigateTo("/admin", { replace: true });
  }

  // } else if (to.name === "index" && !isAuthenticated) {
  //   return navigateTo("/", { replace: true });
  // } else if (to.name === "index" && isAuthenticated) {
  //   return navigateTo("/admin", { replace: true });
  // } else if (to.name === "register" && !isAuthenticated) {
  //   return navigateTo("/register", { replace: true });
  // } else if (to.name === "register" && isAuthenticated) {
  //   return navigateTo("/admin", { replace: true });
  // } else {
  //   return;
  // }
});
