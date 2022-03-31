import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import {db} from "../../firebase";


function Chat({chat, messages}) {
  return (
    <Container>
        <Head>
            <title>Chat - WhatsApp</title>
        </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  )
}

export default Chat;

export async function getServerSideProps(context){
  const ref = db.collection("chats").doc(context.query.id);

  const messagesRes = await ref.collection("messages").orderBy("timestamp", "asc").get();
  const messages = messagesRes.docs.map(doc => ({
      id : doc.id,
      ...doc.data(),
  })).map(messages => ({
      ...messages,
      timestamp : messages.timestamp.toDate().getTime()
  }))

  const chatRes = await ref.get();
  const chat = {
      id : chatRes.id,
      ...chatRes.data()
  }

  return {
      props : {
          messages : JSON.stringify(messages),
          chat : chat,
      }
  }
}

const Container = styled.div`
display : flex;
`;

const ChatContainer = styled.div`
flex : 1;
overflow : scroll;
height : 100vh;

 ::-webkit-scrollbar{
    display : none;
    }
 -ms-overflow-style: none; /*IE & Edge */
 scrollbar-width: none; /* Firefox */
`;
