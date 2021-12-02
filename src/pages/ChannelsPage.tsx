import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import "./ChannelMessagesPage.css";
import firebaseDb from "../config/firebaseConfig";
//import firebase from "firebase/compat/app";
import {
  users,
  ship,
  task1ChannelId,
  task1ChannelMessages,
} from "../config/data";
import { collection, getDocs , setDoc, doc, Timestamp} from 'firebase/firestore/lite';
import "firebase/messaging";

const ChannelMessagesPage: React.FC = () => {
  const [channelList, setChannelList] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>();
  const [selectedMemberId, setSelectedMemberId] = useState<string>();
  const [messageText, setMessageText] = useState<string>();
  const [selectedAvatar, setSelectedAvatar] = useState<string>();
  const [selectedChannel, setSelectedChannel] = useState<string>();
  const [selectedChannelId, setSelectedChannelId] = useState<string>();
  const [messages, setMessages] = useState<any[]>([]);


  async function createShipsRoomChannels() {
    const channels = collection(firebaseDb, 'channels');
    const channelsSnapshot = await getDocs(channels);
    const channelsList = channelsSnapshot.docs.map(doc => {
      let data = doc.data();
      data['id'] = doc.id
      return data;
    }
    );
    setChannelList(channelsList);
  }

  useEffect(() => {
    createShipsRoomChannels();
  }, []);

  const showChannelMessageAndMembers = async (channelName:string|undefined, channelId:string|undefined, memebersList:any[]) => {
    const messages = collection(firebaseDb, `channels/${channelId}/messages`);
    const messagesSnapshot = await getDocs(messages);
    const messagesList = messagesSnapshot.docs.map(doc => doc.data());
    setMessages(messagesList);
    setMembers(memebersList);
    setSelectedChannelId(channelId);
    setSelectedChannel(channelName);
    setSelectedMember("");
  }

  const selectMemberForMessage = (memberObject:any) => {
    setSelectedAvatar(memberObject.avatar);
    setSelectedMember(memberObject.name);
    setSelectedMemberId(memberObject.id);
  }

  const handleValueChange = (event:any) => {
    setMessageText(event.currentTarget.value);
  }

  const createMessage = async () => {
    await setDoc(doc(firebaseDb, `channels/${selectedChannelId}/messages`),
      {
        senderId: {selectedMemberId},
        senderAvatar: {selectedAvatar},
        senderName: {selectedMember},
        text: {messageText},
        sentAt: Timestamp
      }
    ).then((response:any) => {

      debugger;

      showChannelMessageAndMembers(selectedChannel, selectedChannelId, members);

    }).catch((reason: any) => {
      debugger;
    });
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Channels</IonTitle>
        </IonToolbar>
      </IonHeader>
      {channelList.length <= 0 ?
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Channels</IonTitle>
            </IonToolbar>
          </IonHeader>
          🚫 <strong>OH NO! Fix me!</strong>
        </IonContent>
        :
        <>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Channels</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div style={{ display: 'flex', padding: '20px' }}>
              {channelList.map((channelObject, channelObjectIndex) => (
                <div style={{ padding: '20px', cursor: 'pointer', border: '1px solid lightgray', borderRadius: '20px', margin: '0px 10px' }} onClick={() => showChannelMessageAndMembers(channelObject.name, channelObject.id, channelObject.members)}>
                  <div style={{ textAlign: 'center' }}>
                    <img src={channelObject.image} height='50' width='50' onClick={() => showChannelMessageAndMembers(channelObject.name, channelObject.id, channelObject.members)} />
                  </div>
                  <div>
                    {channelObject.name}
                  </div>
                </div>
              ))}
            </div>

            {selectedChannelId ?
              <>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginLeft: '20px', width: '20%' }}><h1>{selectedChannel} Members</h1></div>
                  <div><h1>Messages</h1></div>
                </div>

                <div style={{ display: 'flex', margin: '1%' }}>

                  <div style={{ height: '400px', overflow: 'scroll', width: '20%' }}>
                    {members.map((memberObject, memberObjectIndex) => (
                      <div onClick={() => selectMemberForMessage(memberObject)} style={{ paddingLeft: '20px', cursor: 'pointer', border: '1px solid lightgray', padding: '5px 10px' }}>
                        <div><img src={memberObject.avatar} height='50' width='50' /></div>
                        <div>{memberObject.name}</div>
                      </div>
                    ))}
                  </div>

                  {messages ?
                    <div style={{ height: '400px', overflow: 'scroll', width: '60%' }}>
                      {messages.map((messageObject, messageObjectIndex) => (
                        <div style={{ width: "100%", float: "left", marginLeft: '20px' }}>
                          <div style={{ float: "left" }}>
                            <img style={{ marginRight: '20%' }} src={messageObject.senderAvatar} height='50' width='50' />
                          </div>
                          <div style={{ float: "left", paddingLeft: '20px', position: 'relative', top: '-22px' }}>
                            <div><h1>{messageObject.senderName}</h1></div>
                            <div><p>{messageObject.text}</p></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    : <></>}

                </div>

                {selectedMember ?
                  <div style={{margin:'1%'}}>
                    <div><img src={selectedAvatar} height='50' width='50' /></div>
                    <div>{selectedMember}</div>
                    <div>Message: <input name="messageText" value={messageText} onChange={(e) => handleValueChange(e)} /> </div>
                    <div style={{ padding: '20px' }}><button style={{ padding: '10px' }} onClick={() => createMessage()}>Send Message</button></div>
                  </div>
                  : <div style={{margin: '1%'}}><h1>Please select member for new message</h1></div>}
              </>
              :
              <div style={{margin: '1%'}}><h1>Please select any Channel</h1></div>
            }
            

          </IonContent>
        </>
      }
    

      

    </IonPage>
  );
};

export default ChannelMessagesPage;
