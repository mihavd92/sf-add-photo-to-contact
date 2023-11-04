public with sharing class ContactHelper {
    @AuraEnabled(cacheable=true)
    public static String getFirstAttachmentId(String contactId) {
        String attachmentId = null;
        List<Contact> contacts = [
            SELECT Id, 
            (SELECT Id FROM Attachments ORDER BY CreatedDate ASC LIMIT 1) 
            FROM Contact WHERE Id = :contactId];
        if (!contacts.isEmpty() && !contacts[0].Attachments.isEmpty()) {
            attachmentId = contacts[0].Attachments[0].Id;
        }
        return attachmentId;
    }
}
