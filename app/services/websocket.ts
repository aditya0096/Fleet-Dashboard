import { WS_URL } from "@/app/utils/constants";

// Simple WebSocket service - just connect and listen
class WebSocketService {
  private ws: WebSocket | null = null;
  private onMessageCallback: ((data: any) => void) | null = null;
  private onStatusCallback: ((connected: boolean) => void) | null = null;

  // Connect and set up callbacks
  connect(onMessage: (data: any) => void, onStatus: (connected: boolean) => void) {
    this.onMessageCallback = onMessage;
    this.onStatusCallback = onStatus;

    try {
      this.ws = new WebSocket(WS_URL);

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.onStatusCallback?.(true);
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.onMessageCallback?.(data);
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      this.ws.onerror = () => {
        console.error("WebSocket error");
        this.onStatusCallback?.(false);
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        this.onStatusCallback?.(false);
      };
    } catch (error) {
      console.error("Failed to connect:", error);
      this.onStatusCallback?.(false);
    }
  }

  // Disconnect
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Export single instance
export const webSocketService = new WebSocketService();