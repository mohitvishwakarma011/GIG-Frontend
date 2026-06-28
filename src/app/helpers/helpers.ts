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
}