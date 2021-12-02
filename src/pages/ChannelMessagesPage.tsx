import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import "./ChannelMessagesPage.css";

const ChannelMessagesPage: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{channelId} messages</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{channelId} messages</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default ChannelMessagesPage;
