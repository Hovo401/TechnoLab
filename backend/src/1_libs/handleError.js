
export default (error, res) => {
    
    console.error(error);
    let status;
    let errorMessage;

    if (error?.response) {
        // Ошибка на стороне сервера
        status = error.response?.status ?? 500;
        errorMessage = error.response?.data ?? 'Internal Server Error';
        console.error(error);
    } else if (error?.request) {
        // Ошибка в процессе отправки запроса
        status = 500;
        errorMessage = 'Request Error';
        console.error(error);
    } else {
        // Клиентская ошибка или другие ошибки
        status = error?.status ?? 400;
        errorMessage = error?.message ?? 'Client Error';
    }

    res.status(status).json({ error: errorMessage });
};
