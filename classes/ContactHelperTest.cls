@isTest
public class ContactHelperTest {
    @isTest
    public static void testGetFirstAttachmentId() {
        Contact testContact = new Contact(LastName = 'TestContact');
        insert testContact;
        
        Attachment testAttachment = new Attachment(
            ParentId = testContact.Id,
            Name = 'TestAttachment.txt',
            Body = Blob.valueOf('Test attachment content')
        );
        insert testAttachment;
        
        String attachmentId = ContactHelper.getFirstAttachmentId(testContact.Id);
        
        System.assertEquals(testAttachment.Id, attachmentId, 'Attachment Id should match the expected value.');
    }
    
    @isTest
    public static void testGetFirstAttachmentIdNoAttachments() {
        Contact testContact = new Contact(LastName = 'TestContactNoAttachments');
        insert testContact;
        
        String attachmentId = ContactHelper.getFirstAttachmentId(testContact.Id);
        
        System.assertEquals(null, attachmentId, 'Attachment Id should be null for contacts with no attachments.');
    }
}