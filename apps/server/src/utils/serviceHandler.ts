const serviceHandler = async <T>(func: () => Promise<T>): Promise<T> => {
  try {
    return await func();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
    serviceHandler
};