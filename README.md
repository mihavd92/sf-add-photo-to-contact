# Salesforce: How to add photo to Contact?

I Googled: 'salesforce how to add a photo to a contact,' and nothing came of it...
Let's start with the backstory. These days, I came across an interesting task. I needed to create an LWC component that would display a contact card with its information. At first glance, the task seemed simple, but it had many hidden challenges.
<br />
<img src="https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/b70ae5de-63ed-47a1-af43-4a81c25217d3" width="350">

I set up a sandbox and started working on it.

I created an LWC component and displayed it on the Contact page.

Here's the initial working prototype:
<br />
<img src="https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/c9ae0775-c9ba-4b40-a185-0691c7f7bf73" width="400">

As you can see, when we go to the contact page, it displays the contact's information and photo. This was a temporary solution where the photo was taken from the OwnderId.

Of course, it was far from the ideal presentation shown in the sample, but it was a start.

Next, I encountered a situation where (unfortunately, I didn't take a screenshot at that stage) the field was empty when there was no information, or in certain contact fields (such as the address, which is a combination of several fields), it displayed missing values as 'null.'

It didn't look good when it could appear on a contact card like this:

_Phone:_ - and empty, or where there was information about the address, it displayed something like:
<br />
_Address:_ 1301, null, null, KS, 66045.

I solved this issue by adding a condition in the component layout to check if there was information and then display it.
![image](https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/543afeda-9379-4199-876f-74a2282381dd)

However, this didn't solve the problem of 'null' values, so I had to implement logic in the JS Helper to check if the fields had values, and if so, display them; otherwise, do not display them.

Next, I worked on the CSS styles and HTML layout, and the component started to look like this:
<img src="https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/492e7c70-a970-4acd-a3ba-79050b9629ce" width="400">

Here are a few contacts as an example where the information was incomplete:
![image](https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/500664ec-0efa-47e8-9663-ea5c9fad8369)

As you can see, the issue with the contact photo still wasn't resolved. While I initially thought it would be the simplest thing to implement, it turned out to be the opposite. I spent several hours figuring out how to solve this task.

I deliberately didn't ask the community for help because I wanted to reach a solution on my own, knowing that the solution was simple and likely right on the surface.

Suddenly, I came across the SF app 'Picture Uploader,' which helped me.
<br />
<img src="https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/6789105c-50c3-4024-985d-2e6ca6bba22b" width="700">


This app allows you to upload a photo for each contact, attaching it as an Attachment. When a photo was successfully added, it appeared on the contact page, but it didn't show up on the information card. So, I had to write an additional Apex Controller that checked if the contact had attachments and, if so, displayed that photo on the card. If there were no attachments, it took the photo from the OwnerId.
![image](https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/7e322a8b-85f3-41dc-86ae-f40cf2839665)

I also created a test coverage because where would we be without tests?
![image](https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/fd075ab5-fab3-4eb4-bb96-1432767522a9)

The tests include two checks: creating a contact with an attachment and verifying if the method returns the correct Attachment Id, and creating a contact without attachments and verifying if the method returns a null value.

Here is the final appearance of the component:
**PreAlpha:** Here, I changed the background and played with background gradients and other styles, and in the FINAL stage, it looked more like the initial expectations.
<br />
<img src="https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/fea9a12a-44eb-4781-a031-917d6f978776" width="700">
<br />
**Final:**
<br />
<img src="https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/f5ec248b-cd06-4c55-973e-21dc9f05b9aa" width="700">
<br />
<img src="https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/f9871f39-04f5-4b13-a987-d043ebc0b417" width="700">
<br />
<img src="https://github.com/mihavd92/sf-add-photo-to-contact/assets/50591995/7a12b592-2bcd-4b90-8299-9dfb9079c57a" width="700">
<br />
This task was interesting to me because it was a unique challenge, and when you overcome the problems that arise in your work, you get a sense of satisfaction. This is one of the reasons why I love Salesforce. It's really cool!

I hope someone will find my experience useful, and you can apply it in your practice.

Also, if you plan to use this in your work, don't forget to install the 'Picture Uploader' app and activate it on the Contact Page Layout."
