export const responseHandler = (response) => {
  if (response.hasOwnProperty("data")) {
    const notification = {
      type: "success",
      message: response.data.message,
      data: response.data,
    };
    return notification;
  } else {
    const notification = {
      type: "error",
      message: response?.error?.data?.error
        ? response?.error?.data?.error
        : "Something went wrong",
    };
    return notification;
  }
};
