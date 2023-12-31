export const removeTags = (str: string | undefined) => {
  return str?.replace(/(<([^>]+)>)/gi, "");
};
