import React, { useState, useEffect, useRef } from 'react';
import { layout, card, section } from './sharedStyles';
import { API_BASE_URL } from './config';

const ChatTab = ({ user }) => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchCases();
  }, []);

  useEffect(() => {
    if (selectedCase) {
      fetchMessages(selectedCase.id);
      // Set up polling for new messages every 3 seconds
      const interval = setInterval(() => {
        fetchMessages(selectedCase.id);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedCase]);

  const fetchCases = async () => {
    try {
      let response;
      if (user.user_type === 'collaborator') {
        // For collaborators, fetch cases they're assigned to
        response = await fetch(`${API_BASE_URL}/collaborators/${user.id}/cases`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
      } else {
        // For clients, fetch their own cases with assigned collaborators
        response = await fetch(`${API_BASE_URL}/users/${user.id}/cases`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
      }
      
      if (response.ok) {
        const data = await response.json();
        if (user.user_type === 'collaborator') {
          // For collaborators, show all their assigned cases
          setCases(data || []);
        } else {
          // For clients, only show cases with assigned collaborators
          const casesWithCollaborators = data.filter(caseItem => caseItem.collaborator_id);
          setCases(casesWithCollaborators);
        }
      }
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (caseId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cases/${caseId}/messages`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedCase) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cases/${selectedCase.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ text: newMessage }),
      });

      if (response.ok) {
        setNewMessage('');
        // Refresh messages
        fetchMessages(selectedCase.id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) {
    return <div style={layout}>Loading...</div>;
  }

  if (cases.length === 0) {
    return (
      <div style={layout}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0070f3', marginBottom: '2rem' }}>Messages</h2>
        <p>
          {user.user_type === 'collaborator' 
            ? 'No cases assigned to you yet. Messages will appear here once you have assigned cases.'
            : 'No cases with assigned collaborators found. Messages will appear here once you have cases with collaborators.'
          }
        </p>
      </div>
    );
  }

  return (
    <div style={layout}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0070f3', marginBottom: '2rem' }}>Messages</h2>
      
      <div style={chatStyles.chatContainer}>
        {/* Cases List */}
        <div style={chatStyles.casesList}>
          <h3 style={chatStyles.casesHeading}>
            {user.user_type === 'collaborator' ? 'Assigned Cases' : 'Your Cases'}
          </h3>
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              style={{
                ...chatStyles.caseItem,
                ...(selectedCase?.id === caseItem.id ? chatStyles.selectedCaseItem : {})
              }}
              onClick={() => setSelectedCase(caseItem)}
            >
              <div style={chatStyles.caseTitle}>Case #{caseItem.id.slice(0, 8)}</div>
              <div style={chatStyles.caseStatus}>Status: {caseItem.status}</div>
              <div style={chatStyles.collaboratorInfo}>
                {caseItem.collaborator_id 
                  ? `With ${caseItem.collaborator_name || 'Collaborator'}` 
                  : 'Unassigned'}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div style={chatStyles.chatArea}>
          {selectedCase ? (
            <>
              <div style={chatStyles.chatHeader}>
                <h3>Case #{selectedCase.id.slice(0, 8)} - Messages</h3>
                {/* Show conversation context based on user type */}
                {messages.length > 0 && (
                  <div style={chatStyles.conversationContext}>
                    {user.user_type === 'collaborator' 
                      ? `💬 Chatting with client: ${messages[0].client_name || 'Unknown Client'}`
                      : `💬 Chatting with collaborator: ${messages[0].collaborator_name || 'Unassigned'}`
                    }
                  </div>
                )}
              </div>
              
              <div style={chatStyles.messagesContainer}>
                {messages.length === 0 ? (
                  <div style={chatStyles.noMessages}>
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      style={{
                        ...chatStyles.message,
                        ...(message.sender_id === user.id ? chatStyles.ownMessage : chatStyles.otherMessage)
                      }}
                    >
                      <div style={{
                        ...chatStyles.messageContent,
                        ...(message.sender_id === user.id ? {
                          backgroundColor: '#2196f3',
                          color: '#fff',
                        } : {})
                      }}>
                        <div style={chatStyles.messageText}>{message.text}</div>
                        <div style={{
                          ...chatStyles.messageInfo,
                          ...(message.sender_id === user.id ? { color: '#e3f2fd' } : {})
                        }}>
                          <span>{message.sender_name || (message.sender_type === 'client' ? 'Client' : 'Collaborator')}</span>
                          <span>{formatTimestamp(message.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={sendMessage} style={chatStyles.messageForm}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  style={chatStyles.messageInput}
                />
                <button type="submit" style={chatStyles.sendButton}>
                  Send
                </button>
              </form>
            </>
          ) : (
            <div style={chatStyles.selectCase}>
              Select a case to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const chatStyles = {
  chatContainer: {
    display: 'flex',
    height: '600px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  casesList: {
    width: '300px',
    borderRight: '1px solid #ddd',
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#f8f9fa',
  },
  casesHeading: {
    marginBottom: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  caseItem: {
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    transition: 'background-color 0.2s',
  },
  selectedCaseItem: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  caseTitle: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  caseStatus: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '3px',
  },
  collaboratorInfo: {
    fontSize: '12px',
    color: '#2196f3',
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    padding: '15px 20px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
  },
  conversationContext: {
    fontSize: '14px',
    color: '#666',
    marginTop: '5px',
    fontStyle: 'italic',
  },
  messagesContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#fff',
  },
  noMessages: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '50px',
  },
  message: {
    marginBottom: '15px',
    display: 'flex',
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageContent: {
    maxWidth: '70%',
    padding: '10px 15px',
    borderRadius: '15px',
    backgroundColor: '#f1f3f4',
  },
  messageText: {
    marginBottom: '5px',
  },
  messageInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#666',
  },
  messageForm: {
    display: 'flex',
    padding: '15px 20px',
    borderTop: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
  },
  messageInput: {
    flex: 1,
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '25px',
    outline: 'none',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#2196f3',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  selectCase: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#666',
    fontSize: '16px',
  },
};

export default ChatTab;