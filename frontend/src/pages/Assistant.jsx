import { Bot, Send, Sparkles, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { assistantApi } from '../services/api.js';

const prompts = ['I feel unsafe', 'Someone is following me', 'Cab safety checklist', 'Find a safe public place'];

export const Assistant = () => {
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    assistantApi
      .session()
      .then((response) => setSession(response.data.session))
      .catch((error) => toast.error(error.message || 'Assistant failed to load'));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.messages?.length, loading]);

  const send = async (text = message) => {
    if (!text.trim()) return;
    setLoading(true);
    setMessage('');
    const optimistic = {
      ...session,
      messages: [...(session?.messages || []), { _id: crypto.randomUUID(), role: 'user', content: text }]
    };
    setSession(optimistic);
    try {
      const response = await assistantApi.send(text);
      setSession(response.data.session);
    } catch (error) {
      toast.error(error.message || 'Assistant response failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-130px)] gap-6 xl:grid-cols-[1fr_320px]">
      <section className="card flex min-h-[640px] flex-col overflow-hidden">
        <div className="border-b border-slate-200 p-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-200">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold">AI Safety Assistant</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Emergency guidance, emotional reassurance, and practical next steps.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5 dark:bg-slate-950">
          {(session?.messages || []).map((item, index) => (
            <div key={item._id || index} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[82%] rounded-lg p-4 shadow-sm ${item.role === 'user' ? 'bg-rose-600 text-white' : 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white'}`}>
                <p className="text-sm leading-6">{item.content}</p>
                {item.quickActions?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.quickActions.map((action) => (
                      <button key={action} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold dark:border-slate-700" onClick={() => send(action)}>
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-slate-900">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:.12s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:.24s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
          className="border-t border-slate-200 p-4 dark:border-slate-800"
        >
          <div className="flex gap-3">
            <input className="input" placeholder="Tell Smart Shakthi what is happening..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className="btn-primary px-4" disabled={loading} title="Send message">
              <Send size={18} />
            </button>
          </div>
        </form>
      </section>

      <aside className="space-y-4">
        <div className="card p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="text-violet-600" />
            <h2 className="font-extrabold">Suggested Prompts</h2>
          </div>
          <div className="mt-4 grid gap-2">
            {prompts.map((prompt) => (
              <button key={prompt} className="btn-secondary justify-start py-2" onClick={() => send(prompt)}>
                <Zap size={15} /> {prompt}
              </button>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="font-extrabold">Assistant Scope</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            The assistant gives safety guidance and can support emergency workflows, but immediate danger should still use local emergency services and SOS.
          </p>
        </div>
      </aside>
    </div>
  );
};
