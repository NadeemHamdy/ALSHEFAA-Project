// --- Hugging Face API Configuration ---
const HUGGINGFACE_API_KEY212 = 'YOUR_API_KEY_HERE'; 
const HUGGINGFACE_API_URL =
  'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3';
const SYSTEM_PROMPT =
  'You are a helpful assistant for Alshefaa medical lab. Provide short, specific answers (1-2 sentences) about medical analyses, appointments, or health questions.';

import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, useRouter } from 'expo-router';
import { Send } from '@tamagui/lucide-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

// Define the structure for a message object
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// --- Hugging Face API Configuration ---
// const HUGGINGFACE_API_KEY21212 = '';

// const HUGGINGFACE_API_URL =
//   'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3';
// const SYSTEM_PROMPT =
//   'You are a helpful assistant for a medical lab called Alshefaa. Provide accurate and concise answers related to medical analyses, appointments, and general health questions.';

// --- Bot Response Function using Hugging Face API ---
const getBotResponse = async (userMessage: string): Promise<string> => {
  // if (!HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY === 'your-huggingface-api-key') {
  //   console.error('Hugging Face API key is not set.');
  //   return 'My API key is not configured. Please contact the developer.';
  // }

  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      {
        inputs: `<s>[INST] ${SYSTEM_PROMPT}\n${userMessage} [/INST]`,
        parameters: {
          max_length: 100, // Limit response length
          return_full_text: false, // Avoid returning prompt
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY212}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let botReply = response.data[0]?.generated_text;
    if (botReply) {
      // Remove "User:", "Assistant:", or similar patterns
      botReply = botReply
        .replace(/^(User|Assistant|Assisten)\s*:\s*/i, '')
        .trim();
      // Trim to first 1-2 sentences for conciseness
      const sentences = botReply
        .split('.')
        .filter((s: string) => s.trim())
        .slice(0, 2);
      botReply = sentences.join('.').trim();
      return botReply.endsWith('.') ? botReply : `${botReply}.`;
    } else {
      console.warn('Hugging Face API returned an empty response.');
      return 'I received an empty response from the AI. Please try again.';
    }
  } catch (error: any) {
    console.error(
      'Hugging Face Error:',
      JSON.stringify(error.response?.data, null, 2)
    );
    if (error.response) {
      if (error.response.status === 404) {
        return 'The AI model is unavailable. Please try again later or contact support.';
      }
      return `Error from AI: ${error.response.data?.error || error.message}`;
    } else if (error.request) {
      return 'Could not reach the AI service. Please check your internet connection.';
    } else {
      return `An error occurred: ${error.message}`;
    }
  }
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: 'initial-message',
        text: "Welcome to Alshefaa! I'm your virtual assistant. Ask about medical analyses, appointments, or health tips!",
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    }
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) {
      return;
    }

    const userMessageText = inputText.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const botResponseText = await getBotResponse(userMessageText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Unexpected error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'An unexpected error occurred. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render each message
  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === 'bot' && styles.botMessageText,
        ]}
      >
        {item.text}
      </Text>
      <Text
        style={[
          styles.timestampText,
          item.sender === 'bot' && styles.botTimestampText,
        ]}
      >
        {new Date(item.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../Assets/images/images.jpeg')}
          style={styles.image}
        />
        <Text style={styles.title}>Chat with Alshefaa</Text>
        <StatusBar style="auto" />

        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesContainer}
            style={styles.chatList}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask about health, analyses, or appointments..."
              placeholderTextColor="#999999"
              onSubmitEditing={handleSendMessage}
              editable={!isLoading}
            />
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color="rgb(33, 150, 243)"
                style={styles.loadingIndicator}
              />
            ) : (
              <Pressable
                onPress={handleSendMessage}
                style={({ pressed }) => [
                  styles.sendButton,
                  {
                    backgroundColor: inputText.trim()
                      ? 'rgb(33, 150, 243)'
                      : '#CCCCCC',
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
                disabled={!inputText.trim()}
              >
                <FontAwesome
                  name="send"
                  size={20}
                  color={inputText.trim() ? '#FFFFFF' : '#666666'}
                />
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: 'rgb(212, 211, 211)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: '50%',
  },
  container: {
    padding: 25,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ffff',
    borderRadius: 10,
    minWidth: '90%',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#1234567',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  chatContainer: {
    width: '100%',
    flex: 1,
    minHeight: 300,
    marginBottom: 20,
  },
  chatList: {
    flex: 1,
    marginBottom: 10,
  },
  messagesContainer: {
    paddingBottom: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgb(33, 150, 243)',
    borderBottomRightRadius: 2,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  botMessageText: {
    color: '#333333',
  },
  timestampText: {
    fontSize: 10,
    marginTop: 4,
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
    fontFamily: 'Roboto',
  },
  botTimestampText: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 10,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  loadingIndicator: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  sendButton: {
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});
