import NProgress from "nprogress";

export default defineNuxtPlugin(() => {
  const router = useRouter();

  NProgress.configure({ showSpinner: false });

  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });
});
