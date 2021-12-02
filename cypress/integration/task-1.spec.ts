/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />

import { ship, task1ChannelId, task1ChannelMessages } from "../fixtures/data";

describe("Task 1: Restore data access!! 🚨", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the list of channels", () => {
    Object.keys(ship.rooms).forEach((channelId) => {
      const channelName = ship.rooms[channelId].name;
      cy.get(`[data-cy="channel-${channelId}"]`).contains(channelName);
    });
  });

  describe("clicking on a channel", () => {
    it("shows the messages for the channel", () => {
      cy.get(`[data-cy="channel-${task1ChannelId}"]`).click();
      task1ChannelMessages.forEach(({ text }) => {
        cy.get(`[data-cy="message"]`).contains(text);
      });
    });
  });
});
