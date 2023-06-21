const CustomerModel = require('../models/customer')

exports.createCustomer = async (req, res) => {
    try {
        const existedCustomer = await CustomerModel.findOne({ email: req.body.email })
        if(existedCustomer) return res.status(400).json({ error: 'Người dùng đã tồn tại!'})
        const newCustomer = await CustomerModel.create(req.body)
        return res.status(200).json({ newCustomer: newCustomer });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.findCustomer = async (req, res) => {
    try {
        const existedCustomer = await CustomerModel.findOne({ email: req.query.email })
        if(existedCustomer) {
            if(existedCustomer.password === req.query.password) return res.status(200).json({ existedCustomer: existedCustomer })
            else return res.status(400).json({ error: 'Thông tin đăng nhập không chính xác!' });
        }
        else return res.status(400).json({ error: 'Thông tin đăng nhập không chính xác!' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.findCustomerById = async (req, res) => {
    try {
        const existedCustomer = await CustomerModel.findOne({ _id: req.params.id })
        return res.status(200).json({ existedCustomer: existedCustomer });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateCustomer = async (req, res) => {
    try {
        const updateCustomer = await CustomerModel.findByIdAndUpdate(req.params.id, req.body)
        res.json({ data: updateCustomer, status: "success" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        const deleteCustomer = await CustomerModel.findOneAndDelete(req.params.id);
        res.json({ data: deleteCustomer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};