#!/usr/bin/env npx ts-node
import firebaseAdmin from "firebase-admin";
import { chunk, shuffle } from "lodash";
import firebaseConfig from "../src/config/firebaseConfig";
import {
  users,
  ship,
  task1ChannelId,
  task1ChannelMessages,
} from "../src/config/data";

const MAX_MESSAGES_IN_CHANNEL = 100;
const MAX_TIME_BETWEEN_MESSAGES_IN_MS = 15 * 60 * 1000;
const MESSAGES_TO_QUINN = 1000;

function chooseRandomElement<T extends unknown>(elements: readonly T[]): T {
  if (elements.length === 0) throw new Error("Array must not be empty");
  const index = Math.floor(Math.random() * elements.length);
  return elements[index];
}

const MAX_WRITES_PER_BATCH = 500;
async function batchCreateMessages(
  firebaseAdminApp: firebaseAdmin.app.App,
  channelId: string,
  messages: {
    text: string;
    sentAt: firebaseAdmin.firestore.Timestamp;
    senderName: string;
    senderAvatar: string;
    senderId: string;
  }[]
) {
  for (const messagesChunk of chunk(messages, MAX_WRITES_PER_BATCH)) {
    const batch = firebaseAdminApp.firestore().batch();

    for (const message of messagesChunk) {
      batch.create(
        firebaseAdminApp
          .firestore()
          .collection(`/channels/${channelId}/messages`)
          .doc(),
        message
      );
    }

    await batch.commit();
  }
}

async function createShipsRoomChannels(
  firebaseAdminApp: firebaseAdmin.app.App
) {
  const allMembers = Array.from(Object.entries(users));

  for (const [channelId, room] of Array.from(Object.entries(ship.rooms))) {
    const numberOfMembers =
      2 + Math.round(Math.random() * (allMembers.length - 2));
    const membersOfChannel = shuffle(allMembers).slice(0, numberOfMembers);

    console.group(`Create channel ${channelId}`);
    await firebaseAdminApp
      .firestore()
      .doc(`/channels/${channelId}`)
      .create({
        name: room.name,
        image: room.image,
        members: membersOfChannel.map(([id, member]) => ({
          id,
          name: member.name,
          avatar: member.avatar,
        })),
      });

    const numberOfMessages = Math.random() * MAX_MESSAGES_IN_CHANNEL;

    let currentTimestamp = Date.now();

    const messages = [];
    for (let i = 0; i < numberOfMessages; i += 1) {
      const [senderId, sender] = chooseRandomElement(membersOfChannel);
      const messageText = chooseRandomElement(sender.quotes);
      messages.push({
        text: messageText,
        sentAt: firebaseAdmin.firestore.Timestamp.fromMillis(currentTimestamp),
        senderName: sender.name,
        senderAvatar: sender.avatar,
        senderId: senderId,
      });
      currentTimestamp -= Math.random() * MAX_TIME_BETWEEN_MESSAGES_IN_MS;
    }

    await batchCreateMessages(firebaseAdminApp, channelId, messages);
  }
}

async function createCaptainsLog(firebaseAdminApp: firebaseAdmin.app.App) {
  const channelId = "captainsLog";

  await firebaseAdminApp
    .firestore()
    .doc(`/channels/${channelId}`)
    .create({
      name: "Captain's Log",
      image: ship.rooms.crewQuarters.image,
      members: [
        {
          id: "gary",
          name: users.gary.name,
          avatar: users.gary.avatar,
        },
      ],
    });

  const messages = [];
  let currentTimestamp = Date.now();
  for (let i = 0; i < MESSAGES_TO_QUINN; i += 1) {
    const senderId = "gary";
    const sender = users.gary;
    const messageText = chooseRandomElement(sender.quotes);

    messages.push({
      text: `CAPTAINS LOG ${
        MESSAGES_TO_QUINN - i
      }:\nDear Quinn, \n${messageText}`,
      sentAt: firebaseAdmin.firestore.Timestamp.fromMillis(currentTimestamp),
      senderName: sender.name,
      senderAvatar: sender.avatar,
      senderId: senderId,
    });
    currentTimestamp -= Math.random() * MAX_TIME_BETWEEN_MESSAGES_IN_MS;
  }

  await batchCreateMessages(firebaseAdminApp, channelId, messages);
}

async function createTask1Channel(firebaseAdminApp: firebaseAdmin.app.App) {
  const channelId = task1ChannelId;
  await firebaseAdminApp
    .firestore()
    .doc(`/channels/${channelId}`)
    .create({
      name: "Task 1",
      image: ship.rooms.hangarBay.image,
      members: [
        {
          id: "gary",
          name: users.gary.name,
          avatar: users.gary.avatar,
        },
        {
          id: "kvn",
          name: users.kvn.name,
          avatar: users.kvn.avatar,
        },
      ],
    });

  let currentTimestamp = Date.now();
  for (const { sender, senderId, text } of task1ChannelMessages) {
    await firebaseAdminApp
      .firestore()
      .collection(`/channels/${channelId}/messages`)
      .add({
        text,
        sentAt: firebaseAdmin.firestore.Timestamp.fromMillis(currentTimestamp),
        senderName: sender.name,
        senderAvatar: sender.avatar,
        senderId,
      });
    currentTimestamp += Math.random() * MAX_TIME_BETWEEN_MESSAGES_IN_MS;
  }
}

async function main() {
  const firebaseAdminApp = firebaseAdmin.initializeApp(firebaseConfig);

  console.log("Create ships room channels");
  await createShipsRoomChannels(firebaseAdminApp);
  console.log("Create Captain's log");
  await createCaptainsLog(firebaseAdminApp);
  console.log("Create Task 1 test data");
  await createTask1Channel(firebaseAdminApp);

  console.log("Done");
}

main();
