export class Helpers {
    static getStatusString(status: number): string {
        switch (status) {
            case 0:
                return 'Draft';
            case 1:
                return 'Sent';
            case 2:
                return 'Paid';
            default:
                return 'Unknown';
        }
    }

    static isNullOrEmpty(str: string): boolean {
        str = str.trim().toLowerCase();
        if (str && str != null && str != undefined && str != '')
            return false;
        else return true;
    }
}