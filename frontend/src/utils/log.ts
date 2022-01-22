const log = {
  i(screen: string, description: unknown) {
    console.info(screen, description);
  },
  e(screen: string, description: unknown) {
    console.error(screen, description);
  },
};

export { log };
