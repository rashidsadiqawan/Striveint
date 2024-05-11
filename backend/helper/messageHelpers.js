const sendResponse = (res, status, message, error = '') => {
    res.status(status).json({ status, message, error });
};

const successResponse = (res, status, message, data) => {
    res.status(status).json({ status, message, data });
};

export { sendResponse, successResponse };