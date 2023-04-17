export default defineNuxtRouteMiddleware((to) => {
  const pathsToRedirect: Record<string, string> = {
    character: "characters",
    weapon: "weapons",
    material: "materials",
    "furnishing-set": "fs",
  }

  const path = to.path.replace(/^\/+/, "")
  const [first, ...rest] = path.split("/")
  const newPath = pathsToRedirect[first]
  if (newPath) {
    return navigateTo(`/${newPath}/${rest.join("/")}`, {redirectCode: 308})
  }
})
