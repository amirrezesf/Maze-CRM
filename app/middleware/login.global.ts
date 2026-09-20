const hasLoggedInBeforeKey = 'maze-crm-has-logged-in-before'

export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) {
    return
  }

  const hasLoggedInBefore = localStorage.getItem(hasLoggedInBeforeKey) === 'true'

  if (!hasLoggedInBefore && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (hasLoggedInBefore && to.path === '/login') {
    return navigateTo('/')
  }
})