import {format} from "date-fns"

/**
 * @param date
 * @param type
 * @returns {string}
 */
const DateFormater = (date: Date, type: string = "fr"):string => {
    if(!date){
        return ""
    }

    let dateFormat = "dd/MM/yyyy HH:mm:ss"

    switch(type){
        case "fr":
            break;
        case "en":
            dateFormat = "yyyy-MM-dd HH:mm:ss"
            break;
        default:
            break;
    }

    return format(new Date(date), dateFormat);
}

export default DateFormater;
