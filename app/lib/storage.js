export default{
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key))
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    set: (key, val) => {
        try {
            return localStorage.setItem(key, JSON.stringify(val))
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
}