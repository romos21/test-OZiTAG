
interface inputElement{
    type: string,
    name: string,
    regExp: RegExp,
}

export const loginInputs:inputElement[]=[
    {
        type: 'email',
        name: 'email',
        regExp: /\S+@\S+\.\S+/,
    },
    {
        type: 'password',
        name: 'password',
        regExp: /\S{3,}/,
    }
]