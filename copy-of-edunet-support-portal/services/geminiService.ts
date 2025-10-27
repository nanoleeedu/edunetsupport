import type { ChatMessage } from '../types';

export async function getEdResponse(history: ChatMessage[], newMessage: string): Promise<string> {
  // This function now calls a secure backend endpoint `/api/ed` which proxies requests to the AI model.
  // This prevents the API key from being exposed on the client-side.
  try {
    const response = await fetch('/api/ed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the new message along with the conversation history for context.
      // The backend is expected to handle this payload for a stateful conversation.
      body: JSON.stringify({
        history: history,
        message: newMessage,
      }),
    });

    if (!response.ok) {
      // Try to parse the error message from the backend, otherwise use a generic one.
      const errorData = await response.json().catch(() => ({
        error: `Request failed with status: ${response.status}`,
      }));
      throw new Error(errorData.error || 'An unknown network error occurred.');
    }

    const data = await response.json();
    
    // As per the contract, the response should have a "reply" property.
    if (typeof data.reply !== 'string') {
        console.error("Invalid response format from server:", data);
        throw new Error("Received an invalid response from the server.");
    }
    
    return data.reply;
  } catch (error) {
    console.error("Failed to get response from /api/ed:", error);
    
    // Provide a more user-friendly message for rate limiting, as per the spec.
    if (error instanceof Error && error.message.toLowerCase().includes('rate limit exceeded')) {
        return "You're sending messages a bit too quickly. Please wait a moment before trying again.";
    }
    
    // General error for other cases.
    return "⚠️ Connection error — please try again later.";
  }
}
