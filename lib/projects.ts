export type Metric = {
  label: string;
  value: string;
};

export type ArchitectureBranch = {
  label: string;
  detail: string;
};

export type Architecture = {
  entry: string;
  router: string;
  branches: ArchitectureBranch[];
  sink: string;
};

export type EngineeringDecision = {
  decision: string;
  reason: string;
};

export type Project = {
  slug: string;
  title: string;
  status?: string;
  summary: string;
  stack: string[];
  problem: string;
  approach: string;
  screenshotUrl?: string;
  screenshotAlt?: string;
  decisions?: EngineeringDecision[];
  architecture?: Architecture;
  architectureImage?: string;
  architectureAlt?: string;
  metrics?: Metric[];
  demoUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'qa-agent-platform',
    title: 'QA Agent Platform',
    status: 'Live: public demo',
    summary:
      'A public, scoped-down demo of an AI agent platform for QA I built at my company. Chat with a QA-tuned persona grounded in RAG, and get back more than text: the agent answers questions with citations, generates test analysis as an editable interactive mindmap, and actually runs the tests it talks about.',
    stack: ['LangGraph', 'LangChain', 'RAG', 'Pydantic', 'FastAPI', 'PostgreSQL', 'pgvector', 'Markmap'],
    screenshotUrl: '/projects/qa-agent-platform-screenshot.png',
    screenshotAlt:
      'QA Agent Platform chat interface showing a real pytest run, 10 tests passed and 1 failed, with failure details expanded',
    problem:
      'At my company, QA engineers were losing time to two things a chatbot alone doesn’t fix: answering the same requirements and coverage questions over and over, and turning test analysis into something a team will actually read instead of a wall of text. This case study is a public rebuild of that idea, scoped down and without the proprietary integrations (Notion publishing, Figma reads, internal MCP tools) that only make sense inside the company’s own stack.',
    approach:
      'The agent runs on a QA-tuned system prompt (a "QA soul"), grounded in RAG over a set of internal docs (requirements, test plans) embedded with pgvector and stored in PostgreSQL. A LangGraph state machine routes each incoming message through an intent-classification step, choosing between four branches: answering a question with cited retrieval, generating a fresh test-analysis mindmap, editing a mindmap that already exists in the conversation, or running tests. For test analysis, the LLM\'s output is constrained to a Pydantic schema (structured nodes: title, coverage notes, risk level, children) before it ever reaches the UI, so a malformed response fails validation and gets regenerated instead of breaking the mindmap. Follow-up edits to an existing mindmap (add a scenario, change a risk level, delete a node) are handled by a separate tool-calling agent bound to stable per-node IDs, not a full regeneration. Test-run requests let the LLM pick which specific tests to execute from a fixed whitelist, then a tool call actually runs them and folds the real pass/fail output back into the same conversation. Conversations and validated analyses are persisted in PostgreSQL under an anonymous session, no login required, auto-expired after 48 hours by a scheduled cleanup job, with a global daily prompt cap to keep usage bounded.',
    decisions: [
      {
        decision: 'Test selection uses a closed whitelist, not open tool-calling.',
        reason:
          'The LLM picks which tests to run from a fixed set of real test names enforced at the type level, never constructs a command string itself. No path exists from LLM output to a subprocess argument.',
      },
      {
        decision: 'RAG relevance threshold was measured, not guessed.',
        reason:
          'Ran real queries through the retriever and compared cosine-distance scores for on-topic versus off-topic questions before picking a cutoff, so citations only show up when they are actually relevant.',
      },
      {
        decision: 'Every LLM call is treated as unreliable, even after "structured output".',
        reason:
          'The gateway model silently stalled mid-task, returned malformed JSON, and occasionally echoed its own input back as the answer, three different failure modes caught in development and each handled with an explicit retry or fallback instead of trusting the API contract.',
      },
      {
        decision: 'Mindmap edits mutate a stable tree, they do not regenerate it.',
        reason:
          'Every node gets a persistent ID at creation. A follow-up request like "delete the stacking scenario" resolves to one tool call against that ID, not a full re-generation that could silently rewrite unrelated nodes.',
      },
    ],
    architecture: {
      entry: 'Chat message',
      router: 'Intent router',
      branches: [
        {
          label: 'Q&A',
          detail: 'RAG retrieval over internal docs, grounded answer with citations',
        },
        {
          label: 'Test analysis',
          detail: 'Pydantic-validated outline, rendered as a Markmap mindmap',
        },
        {
          label: 'Edit mindmap',
          detail: 'Tool-calling agent mutates the existing tree via stable node IDs',
        },
        {
          label: 'Test run',
          detail: 'LLM selects tests from a whitelist, tool call executes and reports results',
        },
      ],
      sink: 'PostgreSQL (anonymous session, 48h TTL)',
    },
    metrics: [
      { label: 'Intent branches', value: '4' },
      { label: 'Tests in sample suite', value: '11' },
      { label: 'Session TTL', value: '48h' },
    ],
    demoUrl: 'https://qa-agent.zanuar.dev',
    githubUrl: 'https://github.com/zanuartri/qa-agent-platform',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
