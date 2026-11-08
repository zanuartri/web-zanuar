import { SOCIAL_LINKS } from '@/lib/site';

export const ZROUTER = {
  hero: {
    tag: 'In the works',
    title: 'ZRouter',
    lead: 'A router for coding agents that switches providers without losing your cache or context. Cloud plans and local gateways, side by side.',
    primary: { label: 'Follow on GitHub', href: SOCIAL_LINKS.github },
    secondary: { label: 'See the roadmap', href: '#roadmap' },
  },
  gateways: {
    eyebrow: 'WHAT MAKES IT DIFFERENT',
    heading: 'Local gateways are first-class.',
    body: 'Local and regional gateways are often cheaper and closer to you. ZRouter gives them the same routes, fallback, cache tracking and cost per request as Claude or ChatGPT. Kenari.id comes as a preset. Any other gateway that speaks the OpenAI or Anthropic format plugs in as a custom provider, and gets its own preset when people ask for it.',
    rows: [
      { name: 'Kenari.id', note: 'preset · paste a key' },
      { name: 'Any OpenAI-format gateway', note: 'custom · URL + key' },
      { name: 'Any Anthropic-format gateway', note: 'custom · URL + key' },
      {
        name: '+ Your gateway next',
        note: 'ask for a preset on GitHub',
        href: 'https://github.com/zanuartri/zrouter/issues',
      },
    ],
  },
  promises: {
    heading: 'What it’s built for.',
    items: [
      {
        title: 'Keep your cache.',
        body: 'Round robin and fallback try to send each request where the cache is still warm, so you spend fewer tokens.',
        bodyMobile:
          'Round robin and fallback try to send each request where the cache is still warm.',
      },
      {
        title: 'Keep your context.',
        body: 'When a request moves to another provider, the conversation moves with it, so the answers don’t get worse.',
        bodyMobile:
          'When a request moves to another provider, the conversation moves with it.',
      },
      {
        title: 'Providers you already use.',
        body: 'Claude, ChatGPT, OpenCode, Command Code, OpenRouter, NVIDIA NIM, Ollama and local gateways, ready to pick.',
        bodyMobile:
          'Claude, ChatGPT, OpenCode, Command Code, OpenRouter, NVIDIA NIM, Ollama and local gateways, ready to pick.',
      },
    ],
  },
  callout: {
    heading: 'Why another router?',
    body: 'I used 9router every day. It connects to everything, but on round robin every switch felt like starting over: a cold cache, and an agent that lost the thread.',
    bodyMobile:
      'I used 9router every day. On round robin, every switch felt like starting over: a cold cache, and an agent that lost the thread.',
    listLabel: 'What ZRouter does differently',
    items: [
      'Picks the provider whose cache is still warm',
      'Carries the context over when it has to switch',
      'Tells you why every switch happened',
      'Only the providers people here actually use',
    ],
  },
  steps: {
    heading: 'How it will work.',
    items: [
      {
        title: 'Point your agent at it.',
        body: 'Change the base URL your agent calls. Nothing else in your setup moves.',
      },
      {
        title: 'Choose your providers.',
        body: 'Pick from the presets, then a strategy: fallback, round robin and more. One small config file.',
      },
      {
        title: 'Watch it in the dashboard.',
        body: 'Requests, strategies and cache hits, live in one small screen.',
      },
    ],
    worksWithLabel: 'Planned to work with',
    worksWith: [
      'Claude Code',
      'Codex CLI',
      'Any OpenAI-compatible API',
      'Local gateways like Kenari.id',
    ],
  },
  dashboard: {
    heading: 'See every switch, live.',
    body: 'A live map shows which agent is sending, where each request goes, and which provider is failing. Under it, every request with its cache, context and cost.',
    caption: 'From the ZRouter app design. Sample data, not a running app yet.',
  },
  roadmap: {
    heading: 'The road from here.',
    items: [
      { label: 'Point Claude Code or Codex at it, and it answers', status: 'Building now' },
      { label: 'Fallback and round robin that keep your cache warm', status: 'Next' },
      { label: 'Context that survives a provider switch', status: 'Next' },
      { label: 'Presets for Claude, ChatGPT, local gateways and Ollama', status: 'Next' },
      { label: 'The dashboard that explains every switch', status: 'Later' },
    ],
    itemsMobile: [
      { label: 'Claude Code or Codex, answered through it', status: 'Building now' },
      { label: 'Fallback and round robin that keep your cache warm', status: 'Next' },
      { label: 'Context that survives a provider switch', status: 'Next' },
      { label: 'Presets for the providers people here use', status: 'Next' },
    ],
  },
} as const;
