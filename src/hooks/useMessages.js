import useLocalStorage from "./useLocalStorage";

function useMessages() {
    const [messages, setMessages] = useLocalStorage(
        "messages",
        []
    );

    const addMessage = (message) => {
        const newMessage = {
            ...message,
            id: Date.now(),
            status: "Belum Dibaca",
            tanggal: new Date().toISOString()
        };

        setMessages((currentMessages) => [
            newMessage,
            ...currentMessages
        ]);
    };

    const markAsRead = (id) => {
        setMessages((currentMessages) =>
            currentMessages.map((message) =>
                message.id === id
                    ? {
                        ...message,
                        status: "Dibaca"
                    }
                    : message
            )
        );
    };

    const markAsUnread = (id) => {
        setMessages((currentMessages) =>
            currentMessages.map((message) =>
                message.id === id
                    ? {
                        ...message,
                        status: "Belum Dibaca"
                    }
                    : message
            )
        );
    };

    const deleteMessage = (id) => {
        setMessages((currentMessages) =>
            currentMessages.filter(
                (message) => message.id !== id
            )
        );
    };

    const clearMessages = () => {
        setMessages([]);
    };

    const getUnreadCount = () => {
        return messages.filter(
            (message) =>
                message.status === "Belum Dibaca"
        ).length;
    };

    return {
        messages,
        setMessages,
        addMessage,
        markAsRead,
        markAsUnread,
        deleteMessage,
        clearMessages,
        getUnreadCount
    };
}

export default useMessages;