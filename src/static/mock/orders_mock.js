export const ORDERS_MOCK = [
    {
        id: 1,
        name: 'Лисия',
        login: 'avalisika@gmail.com',
        clockType: clockType.small,
        city: citiesAvailable.Dnipro,
        datetime: 'January 1, 2022 15:00:00'
    }
]

export const clockType = {
    small: 'small',
    average: 'average',
    big: 'big'
}

export const citiesAvailable = {
    Dnipro: 'Днепр',
    Uzhgorod: 'Ужгород'
};