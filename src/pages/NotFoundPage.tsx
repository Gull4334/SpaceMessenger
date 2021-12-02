import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ChannelMessagesPage.css";

const ChannelMessagesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        Not found
      </IonContent>
    </IonPage>
  );
};

export default ChannelMessagesPage;
