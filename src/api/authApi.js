export const authenticateUser = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body,
    });

    const resData = await response.json();

    // Return the response data and status
    return { status: response.status, data: resData };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500, data: null };
  }
};
