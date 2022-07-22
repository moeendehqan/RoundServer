export function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

export const RunningOn= 'http://192.168.1.105:5000'