"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Trash2, CheckCircle, Mail, Clock } from "lucide-react";

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    console.log("Fetching messages...");
    setLoading(true);
    const res = await fetch(`/api/messages?t=${Date.now()}`);
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchMessages();
  }, []);

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    // TEMPORARY: Removing confirm to see if it's the blocker
    try {
      setDeletingId(id);
      console.log(`Attempting to delete message with ID: ${id}`);
      
      const res = await fetch(`/api/messages?id=${id}&t=${Date.now()}`, { 
        method: 'DELETE',
        cache: 'no-store'
      });
      
      if (res.ok) {
        // Optimistic update: remove from local state immediately
        setMessages(prev => prev.filter(m => m.id !== id));
        console.log("Delete successful");
      } else {
        const errorData = await res.json();
        alert(`Failed to delete: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred. Check console.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleMarkAsRead = async (id) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'read' })
    });
    fetchMessages();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
            <MessageSquare className="text-[#C800DF]" /> Messages
          </h1>
          <p className="text-[#9ca3af]">Inbox for contact form submissions.</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-[#9ca3af] py-12">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-[#9ca3af]">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
            <p>Your inbox is empty.</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`p-6 rounded-2xl border transition-all ${msg.status === 'unread' ? 'bg-white/[0.04] border-[#C800DF]/30' : 'bg-white/[0.01] border-white/5'}`}>
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                     <h3 className={`text-lg font-bold ${msg.status === 'unread' ? 'text-white' : 'text-[#9ca3af]'}`}>{msg.name}</h3>
                     {msg.status === 'unread' && <span className="px-2 py-0.5 rounded-full bg-[#C800DF]/20 text-[#C800DF] text-[10px] font-bold uppercase tracking-wider">New</span>}
                   </div>
                   <div className="flex flex-wrap items-center gap-4 text-xs text-[#6b7280] mb-4 font-medium">
                     <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-[#C800DF] transition-colors"><Mail size={14} /> {msg.email}</a>
                     <span className="flex items-center gap-1"><Clock size={14} /> {new Date(msg.date).toLocaleString()}</span>
                   </div>
                   <p className="text-[#d1d5db] text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
                
                <div className="flex md:flex-col gap-2 shrink-0">
                  {msg.status === 'unread' && (
                    <button onClick={() => handleMarkAsRead(msg.id)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-[#C800DF]/20 text-white hover:text-[#C800DF] text-sm font-medium transition-colors">
                      <CheckCircle size={16} /> Mark Read
                    </button>
                  )}
                  <button 
                    disabled={deletingId === msg.id}
                    onClick={() => handleDelete(msg.id)} 
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-red-500/20 text-[#9ca3af] hover:text-red-500 text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {deletingId === msg.id ? (
                      <span className="flex items-center gap-2">
                        <Clock size={16} className="animate-spin" /> Deleting...
                      </span>
                    ) : (
                      <>
                        <Trash2 size={16} /> Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
