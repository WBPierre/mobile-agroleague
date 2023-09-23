/**
 * @param status
 * @returns {string}
 */
const StatusFormater = (status: string): string => {

    switch(status){
        case "pending":
            return "Pending";
        case "active":
            return "Active";
        case "archived":
            return "Archived"
        default:
            return "";
    }

}

export default StatusFormater;
