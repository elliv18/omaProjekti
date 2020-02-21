import Cookies from 'js-cookie'


const logout = () => {
    Cookies.remove('jwt')
}


export default {
    logout,
}