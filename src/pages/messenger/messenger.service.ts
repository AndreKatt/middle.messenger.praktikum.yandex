import { Fetch } from "../../framework/Fetch";
import { API_URL, getEndPoint, WS_API_URL } from "../../utils/getEndPoint";

const CHATS_ENDPOINT = getEndPoint(API_URL, "chats");

export class MessengerService {
  protected readonly requestService = new Fetch();

  public async GetChats() {
    try {
      const result = await this.requestService.get(
        CHATS_ENDPOINT,
        {
          method: "GET",
          timeout: 0,
          headers: {
            "Accept": "application/json",
          },
        }
      );
  
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  public async PostChat(title: string, userId: number) {
    try {
      const result = await this.requestService.post(
        CHATS_ENDPOINT,
        {
          data: JSON.stringify({title: title}),
          method: "POST",
          timeout: 0,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (result.status === 200) {
        const data: { id: string } = JSON.parse(result.response);
  
        const { status } = await this.requestService.put(
          getEndPoint(CHATS_ENDPOINT, "users"),
          {
            data: JSON.stringify({
              users: [userId],
              chatId: data.id
            }),
            method: "PUT",
            timeout: 0,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (status === 200) {
          return result.response;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async GetUsersByLogin(login: string) {
    try {
      const result = await this.requestService.post(
        getEndPoint(API_URL, "user", "search"),
        {
          data: JSON.stringify({login: login}),
          method: "POST",
          timeout: 0,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  public async ConnectToChat(chatId: number) {
    try {
      const result = await this.requestService.post(
        getEndPoint(CHATS_ENDPOINT, `token/${chatId}`),
        {
          method: "POST",
          timeout: 0,
        }
      );
  
      if (result.status === 200) {
        const token = JSON.parse(result.response).token;
        const userId = localStorage.getItem("id");
        const socket = new WebSocket(
          getEndPoint(WS_API_URL, `chats/${userId}/${chatId}`, token),
        );
        let intervalId: ReturnType<typeof setInterval>;
  
        socket.addEventListener('open', () => {
          intervalId = setInterval(() => {
            socket.send(JSON.stringify(
              {
                type: "ping",
              }
            ))
          }, 10000);
          
          this.GetChatMessages(socket);
        });
  
        socket.addEventListener('close', event => {
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения');
          }
          clearInterval(intervalId);
          console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
  
        return socket;
      }
    } catch (e) {
      console.log(e);
    }
  }

  public GetChatMessages(socket: WebSocket) {
    try {
      socket.send(JSON.stringify({
        content: 0,
        type: "get old"
      }));
    } catch (e) {
      console.log(e);
    }
  }

  public async DeleteChatById(chatId: number) {
    try {
      const result = await this.requestService.delete(
        CHATS_ENDPOINT,
        {
          data: JSON.stringify({
            chatId: chatId
          }),
          method: "DELETE",
          timeout: 0,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result;
    } catch (e) {
      console.log(e);
    }
  }
};
