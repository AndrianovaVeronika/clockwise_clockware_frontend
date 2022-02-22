const initialState = {
    auth: {
        currentUser: {},
        isAuth: false,
        userLoading: true,
        isAdmin: false
    },
    users: {
        usersList: [],
        rolesList: []
    },
    orders: {
        ordersList: [],
    },
    masters: {
        mastersList: [],
        availableMasters: []
    },
    cities: {
        citiesList: [],
    },
    clockTypes: {
        clockTypesList: [],
    }
};

export default initialState;