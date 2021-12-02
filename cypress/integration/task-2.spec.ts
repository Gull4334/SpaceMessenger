/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />
import firebaseConfig from "../fixtures/firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { users } from "../fixtures/data";

const channelId = "commissary";

describe("Task 2: Real, **_raw_**, real-time updates ✨", () => {
  beforeEach(() => {
    cy.visit(`/channels/${channelId}/messages`);
  });

  describe("when a new message is sent", () => {
    const now = Date.now();

    beforeEach(() => {
      const firebaseApp = initializeApp(firebaseConfig);
      const firestore = getFirestore(firebaseApp);

      cy.wrap(
        addDoc(collection(firestore, `/channels/${channelId}/messages`), {
          senderId: "hue",
          senderAvatar: users.hue.avatar,
          senderName: users.hue.name,
          text: `${now}`,
          sentAt: Timestamp.fromMillis(now),
        })
      );
    });

    it("appears in the list of messages", () => {
      cy.contains("[data-cy=message]", now).should("exist");
    });
  });
});
