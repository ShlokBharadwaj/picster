export const fetchUser = () => {
    const userInfoString = localStorage.getItem('picster-user');

    return userInfoString;
}