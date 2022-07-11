const initialState = {
    auth: {
        currentUser: {},
        isAuth: false,
        userLoading: true,
        isAdmin: false,
    },
    users: {
        usersList: [],
    },
    orders: {
        ordersList: [],
        orderUser: {},
    },
    masters: {
        mastersList: [],
        availableMasters: [],
    },
    cities: {
        citiesList: [],
        foundById: {},
    },
    clockTypes: {
        clockTypesList: [],
        foundById: {},
    },
    errors: {
        auth: [],
        users: [],
        orders: [],
        masters: [],
        cities: [],
        clockTypes: [],
    }
};

export default initialState;