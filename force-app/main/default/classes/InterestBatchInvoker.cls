public class InterestBatchInvoker {

    @InvocableMethod(
        label='Run Daily Interest Batch'
        description='Executes the daily interest calculation batch job'
    )
    public static void runBatch(List<String> dummyInput) {
        // Batch size = 200 (safe default)
        Database.executeBatch(new InterestCalculationBatch(), 200);
    }
}