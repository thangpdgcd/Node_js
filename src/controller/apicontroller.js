const testApi = (req, res) => {
    return res.status(200).json(
        {
            message: 'ok',
            data: 'test api'
        }
    )
}

///trả ra 1 loạt data
module.exports = {
    testApi
}