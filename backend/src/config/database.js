import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Informe o nome do crédito']},
    value: {type: Number, min: 0, required: [true, 'Informe o valor do crédito']}, //value deve ser no minimo 0
});

const debitSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Informe o nome do débito']},
    value: {type: Number, min: 0, required: [true, 'Informe o valor do débito']}, //value deve ser no minimo 0
    status: {type: String, required: false,  set: (v) => v ? v.toUpperCase() : v, enum:['PAGO', 'PENDENTE']}
});

const billingCycleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    month: { type: Number, min: [1, 'O mês deve ser maior ou igual a 1'], max: [12, 'O mês deve ser menor ou igual a 12'], required: true},
    year: {type: Number, min: [1970, 'O ano deve ser maior ou igual a 1970'], max: [2100, 'O ano deve ser menor ou igual a 2100'], required: true},
    credits: [creditSchema],
    debts: [debitSchema]
})


const BillingCycle = mongoose.model('billingCycleSchema', billingCycleSchema)

export default BillingCycle;