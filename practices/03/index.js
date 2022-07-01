const order1 = {
    customer: {
        name: 'Bob',
        phone: '123'
    },
    cart: [
        {
            product: 'Bread',
            quantity: 10,
            unitPrice: 10,
            totalPrice: 100
        }
    ],
    total: 100,
    paid: 80,
    due: 20
};

const order2 = {
    customer: {
        name: 'Alice',
        phone: '124'
    },
    cart: [
        {
            product: 'Rice',
            quantity: 10,
            unitPrice: 5,
            totalPrice: 50
        },
    ],
    total: 50,
    paid: 50,
    due: 0
};

const orders = [order];