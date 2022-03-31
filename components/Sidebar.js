import styled from "styled-components";
import {auth , db} from "../firebase";
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore'
import { Avatar, Button, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from 'email-validator';
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db.collection('chats').where('users','array-contains',user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt("Please enter an email address for the user you wish to chat with")
        if(!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input != user.email){
          db.collection("chats").add({
            users : [user.email, input],
          })
        }
    }

    const chatAlreadyExists = (recipientEmail) => {
      !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user => user==recipientEmail)?.length>0)
    }
  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {chatsSnapshot?.docs.map(chat => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
flex : 0.45;
border-right : 1px solid whitesmoke;
height : 100vh;
min-width : 250px;
max-width : 300px;
overflow-y: scroll;

::-webkit-scrollbar{
    display : none;
  }
 -ms-overflow-style: none; /*IE & Edge */
 scrollbar-width: none; /* Firefox */
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  font-weight: 600;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top : 1px solid whitesmoke;
    border-bottom : 1px solid whitesmoke;
    color : white;
    background-color: rgba(0,128,0,0.9);
  }
  :hover{
    opacity : 0.9;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 70px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
