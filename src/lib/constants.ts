// export const links = ["Experiments", "Recipes"];
const local = process.env.NEXT_PUBLIC_LOCAL;
console.log("🚀 ~ local:", local);

export const links = ["StudioFree", "Projects", "Experiments", "Plots"];

if (local === "true") {
  links.unshift("WIP");
}
