global class InterestCalculationBatch implements Database.Batchable<SObject>{

    // START METHOD
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([
            SELECT Id, Current_Balance__c, Interest_Rate__c, Total_Interest__c
            FROM Financial_Account__c
            WHERE Current_Balance__c > 0
            AND Interest_Rate__c > 0
        ]);
    }

    // EXECUTE METHOD
    global void execute(Database.BatchableContext bc, List<Financial_Account__c> scope) {

        List<Financial_Account__c> accountsToUpdate = new List<Financial_Account__c>();

        for (Financial_Account__c fa : scope) {

            //  Null Safety
            Decimal balance = (fa.Current_Balance__c == null) ? 0 : fa.Current_Balance__c;
            Decimal rate = (fa.Interest_Rate__c == null) ? 0 : fa.Interest_Rate__c;
            Decimal totalInterest = (fa.Total_Interest__c == null) ? 0 : fa.Total_Interest__c;

            // Skip if no valid data
            if (balance <= 0 || rate <= 0) {
                continue;
            }

            // Daily Interest Calculation
            Decimal dailyInterest = (balance * (rate / 100)) / 365;

            //  Round to 2 decimal places (important for currency)
            dailyInterest = dailyInterest.setScale(2, RoundingMode.HALF_UP);

            // Only update if interest > 0
            if (dailyInterest > 0) {
                fa.Total_Interest__c = totalInterest + dailyInterest;
                accountsToUpdate.add(fa);
            }
        }

        //  Bulk Update
        if (!accountsToUpdate.isEmpty()) {
            update accountsToUpdate;
        }
    }

    // FINISH METHOD
    global void finish(Database.BatchableContext bc) {
        System.debug('Interest Calculation Batch Completed Successfully');
    }
}