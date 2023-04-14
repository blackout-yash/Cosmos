export const intialState = 0;

export const reducer = (state, action) => {
    if (action.type === "USER") {
        if (action.refresh) return localStorage.getItem('storedState') === "true";
        else localStorage.setItem('storedState', action.payload);
        return action.payload;
    }

    return state;
    // return localStorage.getItem('storedState') || state;
}