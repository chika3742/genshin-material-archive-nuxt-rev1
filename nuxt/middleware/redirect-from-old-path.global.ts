export default defineNuxtRouteMiddleware((to) => {
  // /character/** -> /characters/**
  {
    const match = to.path.match(/^\/character(?:\/.*)?$/)

    if (match) {
      return navigateTo(`/characters${match[1] || ""}`, {redirectCode: 308})
    }
  }

  // /weapon/** -> /weapons/**
  {
    const match = to.path.match(/^\/weapon(?:\/.*)?$/)

    if (match) {
      return navigateTo(`/weapons${match[1] || ""}`, {redirectCode: 308})
    }
  }

  // /material/** -> /materials/**
  {
    const match = to.path.match(/^\/material(?:\/.*)?$/)

    if (match) {
      return navigateTo(`/materials${match[1] || ""}`, {redirectCode: 308})
    }
  }
})
