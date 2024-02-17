import { useEffect, useState } from "react";
import axios from "axios";

export const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get(
        "https://free-chat-two.vercel.app/get-message",
      );
      await setMessages((prev) => [data, ...prev]);
      await setValue("");
      await subscribe();
    } catch (e) {
      setTimeout(() => {
        subscribe();
      }, 500);
      console.log("Какая-то ошибка!");
    }
  };

  const sendMessage = async (value) => {
    await axios.post("https://free-chat-two.vercel.app/post-message", {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <>
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />
        <button
          onClick={() => {
            sendMessage(value);
          }}
        >
          Отправить
        </button>
      </div>
      <div>
        {messages.map((item) => (
          <div key={item.id}>{item.message}</div>
        ))}
      </div>
    </>
  );
};
