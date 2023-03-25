export default defineNuxtRouteMiddleware((to) => {
  // /character/** -> /characters/**
  const match = to.path.match(/^\/character(?:\/.*)?$/)

  if (match) {
    return navigateTo(`/characters${match[1] || ""}`, {redirectCode: 308})
  }
})
