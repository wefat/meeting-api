import * as line from "@line/bot-sdk";

export const createLineClient = () => {
  return new line.messagingApi.MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  });
};

export const handleEvent = async (event: any): Promise<any> => {
  if (event.type !== "message" || event.message.type !== "text") {
    return null;
  }

  const client = createLineClient();
  const text = event.message.text.trim();

  if (text.includes("จองห้อง")) {
    const liffId = process.env.LINE_LIFF_ID || "";
    // Line liff url format: https://liff.line.me/{liffId}
    const liffUrl = `https://liff.line.me/${liffId}`;

    const flexMessage: line.messagingApi.FlexMessage = {
      type: "flex",
      altText: "เริ่มการจองห้องประชุม",
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "จองห้องประชุม 📅",
              weight: "bold",
              size: "xl",
              color: "#1DB446",
            },
            {
              type: "text",
              text: "กดปุ่มด้านล่างเพื่อเลือกห้องและเวลาที่คุณต้องการจองได้เลยครับ",
              wrap: true,
              margin: "md",
              color: "#666666",
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "primary",
              height: "sm",
              action: {
                type: "uri",
                label: "เปิดฟอร์มจองห้อง",
                uri: liffUrl,
              },
              color: "#1DB446",
            },
          ],
          flex: 0,
        },
      },
    };

    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [flexMessage],
    });
  }

  // Fallback for other messages
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: "text",
        text: "หากต้องการจองห้องประชุม พิมพ์คำว่า 'จองห้อง' ได้เลยครับ 🏢",
      },
    ],
  });
};
