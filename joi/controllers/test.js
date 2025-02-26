const getController = (req, res) => {
    try {
        res.status(200).send('Welcome to get route');
    } catch (error) {
        console.log(error);
    }
}

module.exports = getController