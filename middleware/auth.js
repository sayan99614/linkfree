export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return;

  const { isAuthenticated, getUser } = useUserStore();

  if (!isAuthenticated) {
    try {
      const user = await getUser();
      console.log("user", user);
    } catch (error) {
      console.log(error);
    }
  }

  if (to.name === "admin" && !isAuthenticated) {
    return navigateTo("/", { replace: true });
  } else if (to.name === "index" && !isAuthenticated) {
    return navigateTo("/", { replace: true });
  } else if (to.name === "index" && isAuthenticated) {
    return navigateTo("/admin", { replace: true });
  } else if (to.name === "register" && !isAuthenticated) {
    return navigateTo("/register", { replace: true });
  } else if (to.name === "register" && isAuthenticated) {
    return navigateTo("/admin", { replace: true });
  } else {
    return;
  }
});
