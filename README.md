# *_SPACEBOOK MESSENGER_*

![KVN](https://static.wikia.nocookie.net/final-space/images/3/37/Final_Space_S1_E4_47.png)

Welcome aboard the [Galaxy One](https://final-space.fandom.com/wiki/Galaxy_One), ~~prisoner~~ _friend_! I'm **KVN**, your deep space insanity avoidance companion - a.ka. _your new best friend_! I'll be your guide for the duration of your ~~sentence~~ _time on board_.

As the newest member of the crew, it falls to you to repair our onboard messaging system which _someone_ - definitely not KVN - accidentally destroyed. Fortunately, while the interface is crippled, the data was safe from harm, so it should be possible for you to restore _full_ glorious functionality to the system, **_Spacebook Messenger_**.

You may even be able to improve it, if you have the skills. Let's see, rookie.

## Instructions

Complete the following challenges to proceed. This should take a few hours, depending on how much effort you want to invest in your solution, and how much detail you go into. Take as long as you need.

Treat this challenge as if you were writing a real messaging app, running on a real mobile device. We've designed it to be similar to what you'd be working on if you joined our team, so we want you to demonstrate that you understand the constraints and expectations of writing hybrid mobile apps.

What would you add to your solution beyond the minimum requirements, and why? Even if you don't write it, you should be able to tell us what you think would be missing from a production-ready solution.

<img src="https://static.wikia.nocookie.net/final-space/images/8/8a/Ventrexian_father_and_son_duo.jpg/revision/latest/scale-to-width-down/300?cb=20211114035828" align="right" style="margin-left: 1.0em" />

## How your submission will be assessed

The minimum requirements for each task are satisfied when the corresponding Cypress tests pass, and we expect you to use the technologies present in this scaffold: React, Ionic, Firestore, etc.

Beyond that, your submission will be assessed in the following areas, where we will gauge the degree to which you exceeded our minimum expectations as an indication of your skill level.

* **Basic functionality:** <br/>Did you achieve the minimum requirements listed in each challenge?
* **State management:** <br/>How do you keep track of the data you load? What happens when it changes?
* **Working with new tools:** <br/>Firestore and Ionic are new to most people. We want to see how you handle working with unfamiliar tools, how quickly you can pick them up and how you prioritize learning them exhaustively over putting them to use
* **Async code:** <br/>Ever the bane of JavaScript developers, let's see if you keep your promises 🤭
* **React:** <br/>This position requires a thorough knowledge of React, and so does this code challenge. What are common considerations when working with React?
* **UI/UX:** <br/>Did you consider the UX of your messaging app, or just meet the basic requirements?
* **TypeScript / static typing:** <br/>If you haven't used TypeScript before, can you get the hang of it in this project? If you have, how well can you use the type system?

Some things will be easier for you than others, depending on your familiarity with them and your personal preferences. E.g. some people enjoy working in the UI so picking up Ionic will be easy, while others prefer low-level code, and Firestore will be easier.

## Getting started

1. Install NPM packages
2. Start local server: `npx ionic serve`
3. Run Cypress tests: `npx cypress open`

This will give you a running local server.

This repo contains the scaffold of a basic Ionic/React app and cypress tests for each challenge. Reach out to us if you think something is missing.

<img src="https://static.wikia.nocookie.net/final-space/images/2/2c/Final_Space_S1_E7_4.png/revision/latest/scale-to-width-down/300?cb=20200110173200" align="right" style="margin-left: 1.0em" />

## Task 1: Restore data access!! 🚨

The ship's data core is available and accessible via **Firestore**. Your first task is to restore the crew's access to their messages.

[Read more about loading data from Firestore](https://firebase.google.com/docs/firestore/query-data/get-data)

Credentials for Firestore are available in [src/config/firebaseConfig.tsx](src/config/firebaseConfig.tsx). These credentials are for public access to the Spacebook Messenger Firestore database.

You can look at `bin/seed.ts`, which was used to populate the database, in order to familiarize yourself with the data structure, which is also documented below.

NOTE: do not try to load `firebase-admin` in the browser, it won't work.

### Data Structure

Data is stored in the following structure:

* `/channels/{channelId}` - messages are organized into "channels". Each channel has:
  * `name: string`
  * `image: string` - (a URL)
  * `members: { id: string; name: string; avatar: string }[]`
* `/channels/{channelId}/messages` - each message has the following properties
  * `senderId: string`
  * `senderAvatar: string`
  * `senderName: string`
  * `text: string`
  * `sentAt: Timestamp` - (a Firestore Timestamp)

### Requirements

NOTE: authentication is not necessary for this task.

* It should be possible to read the messages in a channel by navigating to the channel after opening the app.
* Messages should be formatted in a sensible way and it should be possible to read the text without obstruction.
* The sender of each message should be identifiable
* It should be possible to read the messages in chronological order

<img src="https://pbs.twimg.com/profile_images/1027069105398984704/y7dBMFgW_200x200.jpg" align="right" style="margin-left: 1.0em" />

## Task 2: Real, **_raw_**, real-time updates ✨

In this task your goal is to improve your existing solution. By now you should be able to load data from Firestore and display it, satisfying the crew's need to re-read their old messages. But what happens when they send new messages?

Extend your UI so that it will keep the list of messages up-to-date while the user watches (i.e. without reloading the window or navigating into and out-of the page for the messages).

This task is designed to test your skills in managing changing state in a frontend application. Show us you have considered typical situations that occur and provide sensible handling for them.

[Read more about Firestore real-time updates](https://firebase.google.com/docs/firestore/query-data/listen)

### Creating messages

The Firestore security rules applied to the Spacebook Messenger database (see [./firestore.rules](./firestore.rules)) will permit only crew members of the Galaxy One to write messages. The auth system is currently disabled (maybe we'll fix it in a future task 🤔), but the ship's AI, H.U.E., is still smart enough to prohibit creating messages that aren't from a known crew member.

In order to create new messages, you must provide the name, ID and avatar of a known crew member, which you can find in `src/config/data.ts`. You can see an example of a new message being created in the Cypress test.

### Requirements

* After opening the list of messages for a channel, it should be possible to see a new message added via Firestore without a page reload

## END OF TRANSMISSION

Good luck and _Goodspeed_!
