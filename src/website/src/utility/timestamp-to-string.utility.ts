import moment from "moment";

export const timestampToString = (timestamp: Date): String => {
    return moment(timestamp).format(`HH:mm:ss DD-MMMM-YYYY`);
};
