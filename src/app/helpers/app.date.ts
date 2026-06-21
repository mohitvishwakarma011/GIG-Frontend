export class AppDate{
    public static unixToDate(unixTimeInSeconds:number):Date{
        return new Date(unixTimeInSeconds * 1000);
    }

    public static getCurrentDate():Date{
        return new Date();
    }

    public static toDate(dateString:string):Date{
        return new Date(dateString);
    }
}