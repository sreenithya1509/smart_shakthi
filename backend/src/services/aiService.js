const fallbackReply = (message) => {
  const lower = message.toLowerCase();

  if (lower.includes('follow') || lower.includes('stalk')) {
    return {
      content:
        'Move toward a well-lit public area, avoid going home directly, call a trusted contact, and keep your live location sharing active. If danger feels immediate, trigger SOS now.',
      quickActions: ['Trigger SOS', 'Share live location', 'Call guardian']
    };
  }

  if (lower.includes('cab') || lower.includes('ride')) {
    return {
      content:
        'Verify the vehicle number, sit in the rear seat, share trip details, keep the route visible, and use Smart Shakthi live tracking until you arrive.',
      quickActions: ['Start tracking', 'Notify contacts', 'Open map']
    };
  }

  return {
    content:
      'I am here with you. Stay aware of exits, move toward people and light, keep your phone ready, and tell a trusted person where you are. If there is immediate danger, press SOS.',
    quickActions: ['Emergency steps', 'Find safe place', 'Share location']
  };
};

export const askSafetyAssistant = async ({ message, user }) => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return fallbackReply(message);
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are Smart Shakthi, a calm women safety assistant. Give concise, practical emergency guidance. Encourage contacting emergency services for immediate danger. Do not claim to dispatch real authorities.'
        },
        {
          role: 'user',
          content: `User name: ${user.name}. Situation: ${message}`
        }
      ],
      temperature: 0.4,
      max_tokens: 220
    })
  });

  if (!response.ok) {
    return fallbackReply(message);
  }

  const data = await response.json();
  return {
    content: data.choices?.[0]?.message?.content || fallbackReply(message).content,
    quickActions: ['Trigger SOS', 'Share location', 'Contact guardian']
  };
};
