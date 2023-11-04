import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import getFirstAttachmentId from '@salesforce/apex/ContactHelper.getFirstAttachmentId';

const FIELDS = [
'Contact.Name', 
'Contact.Id',
'Contact.Email',
'Contact.Phone',
'Contact.MailingCity',
'Contact.MailingState',
'Contact.MailingStreet',
'Contact.MailingPostalCode',
'Contact.Owner.SmallPhotoUrl'
];


export default class ContactInfo extends LightningElement {
    @api recordId; // Отримує Id поточного Contact

    contactFirstAttachmentId; // Attachment Id для фото контакту

    @wire(getFirstAttachmentId, { contactId: '$recordId' })
    wiredFirstAttachmentId({ error, data }) {
        if (data) {
            this.contactFirstAttachmentId = data;
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;


    get contactName() {
        return getFieldValue(this.contact.data, 'Contact.Name');
    }

    get contactId() {
        return getFieldValue(this.contact.data, 'Contact.Id');
    }

    get contactEmail() {
        return getFieldValue(this.contact.data, 'Contact.Email');
    }

    get contactPhone() {
        return getFieldValue(this.contact.data, 'Contact.Phone');
    }

    get contactLocation() {
        const city = getFieldValue(this.contact.data, 'Contact.MailingCity');
        const state = getFieldValue(this.contact.data, 'Contact.MailingState');

        /*
        if (city === null && state !== null) {
            return `${state}`;
        } else if (city !== null && state === null) {
            return `${city}`;
        } else if (city === null && state === null) {
            return ' ';
        }

        return `${city}, ${state}`;
        */

        return (city || state) ? `${city || state}` : ' ';
    }

    get contactFullLocation() {
        /*
        const street = getFieldValue(this.contact.data, 'Contact.MailingStreet');
        const city = getFieldValue(this.contact.data, 'Contact.MailingCity');
        const state = getFieldValue(this.contact.data, 'Contact.MailingState');
        const postalCode = getFieldValue(this.contact.data, 'Contact.MailingPostalCode');
    
        const parts = [];
    
        // Додаємо дані полів тільки, якщо вони не є null
        if (street !== null) {
            parts.push(street);
        }
        if (city !== null) {
            parts.push(city);
        }
        if (state !== null) {
            parts.push(state);
        }
        if (postalCode !== null) {
            parts.push(postalCode);
        }
    
        return parts.join(', '); // Об'єднуємо тільки непорожні частини рядка
        */
        const fieldsToCheck = ['Contact.MailingStreet', 'Contact.MailingCity', 'Contact.MailingState', 'Contact.MailingPostalCode'];
    
        const parts = fieldsToCheck
            .map(field => getFieldValue(this.contact.data, field)) // Отримуємо значення для кожного поля
            .filter(value => value !== null) // Відфільтруємо поля, що не є null
            .join(', '); // Об'єднуємо непорожні частини рядка
    
        return parts; 
    }

    get contactPhotoUrl() {
        if (this.contactFirstAttachmentId) {
            return `/servlet/servlet.FileDownload?file=${this.contactFirstAttachmentId}`;
        }
        // Якщо немає прикріпленого файлу, повертаємо стандартний URL
        return getFieldValue(this.contact.data, 'Contact.Owner.SmallPhotoUrl');
    }
}
