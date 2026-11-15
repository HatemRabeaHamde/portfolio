/**
 * Project data — sourced from Hatem's CV (public/Hatem-Rabea-CV.pdf) and the public
 * case studies / READMEs on github.com/HatemRabeaHamde. Keep claims to what those say.
 */

export type Category = "saas" | "social" | "commerce" | "marketplace" | "payments" | "creative";

export type Step = { title: string; text: string };

export type Flow = { label: string; title: string; titleEm: string; lede: string; steps: Step[]; hot?: number; notes?: string[] };

export type CaseStudy = {
  /** Hero kicker line. */
  tagline: string;
  /** Hero paragraph. */
  summary: string;
  meta: [string, string][];
  /** Small pill in the hero corner. */
  badge: string;
  stats: { value: string; text: string }[];
  overview: { challenge: string; role: string; outcome: string };
  useCases: { actor: string; items: string[] }[];
  flow: Flow;
  /** Optional second flow shown under the first one. */
  flow2?: Flow;
  /** HR-facing results scorecard. */
  impact?: { title: string; titleEm: string; lede: string; items: { area: string; metric: string; label: string; detail: string }[] };
  /** A security incident and how it was handled. */
  incident?: {
    label: string;
    title: string;
    titleEm: string;
    lede: string;
    steps: { date: string; title: string; text: string }[];
    outcomes: { metric: string; text: string }[];
  };
  /** Working practices shown with the stack. */
  practices?: { title: string; text: string }[];
  architecture?: {
    caption: string;
    clients: { name: string; sub: string }[];
    edge: string;
    api: { name: string; sub: string; modules: string[] };
    infra: { name: string; sub: string }[];
    footLeft: string;
    footRight: string;
  };
  /** CSS object-position for the hero image, when it differs from the cover crop. */
  heroPosition?: string;
  /** Muted, looping hero video (falls back to the poster). */
  video?: { src: string; poster: string };
  /** Click-to-play demo video with a poster and an honesty note. */
  demo?: { src: string; poster: string; width: number; height: number; title: string; titleEm: string; lede: string; note: string };
  /** Section order on the case-study page (missing sections are skipped). */
  order?: SectionId[];
  /** Chapter-index label overrides. */
  chapterLabels?: Partial<Record<SectionId, string>>;
  /** Social-preview image (1200 × 630 recommended). */
  ogImage?: { src: string; width: number; height: number };
  /** Hero image when it differs from the card cover. */
  heroImage?: string;
  /** Desktop + mobile mockup shown under "At a glance". */
  mockup?: Img & { caption: string };
  /** Lede for the screenshots section. */
  screensLede?: string;
  /** Plain-language summary shown above the "At a glance" numbers. */
  plain?: string;
  /** Deep engineering stories: problem → decision → build → impact → evidence. */
  stories?: {
    label?: string;
    title: string;
    titleEm: string;
    lede: string;
    cover?: Img;
    items: {
      kicker: string;
      title: string;
      titleEm: string;
      /** Who did what, so team work is never claimed as solo work. */
      ownership: string;
      problem: string;
      decision: string;
      built: string;
      impact: string;
      evidence: string;
      image?: Img;
      more?: string[];
    }[];
  };
  /** Results split by kind of evidence. */
  evidence?: {
    label?: string;
    /** Headings for the three groups (default: Measured / Confirmed outcomes / Architecture decisions). */
    groups?: [string, string, string];
    title: string;
    titleEm: string;
    lede: string;
    measured: { value: string; label: string; context: string }[];
    outcomes: { title: string; text: string }[];
    decisions: { title: string; text: string }[];
    tests: { label?: string; lede: string; items: string[]; caveat: string };
  };
  /** Skills and how quickly I got productive in a new environment. */
  adapt?: {
    label?: string;
    title: string;
    titleEm: string;
    lede: string;
    items: { title: string; text: string }[];
    skills: { group: string; items: string[] }[];
  };
  /** Full-width mockup images shown after the screenshots. */
  showcase?: { src: string; caption: string; width: number; height: number }[];
  screenshots?: { src: string; caption: string; position?: string }[];
  engineering: { problem: string; built: string }[];
  /** Optional heading above the problem / build table. */
  engineeringHead?: { label: string; title: string; titleEm: string; lede: string; col: string };
  stack: string[];
  quote: string;
  quoteSource: string;
  links: { icon: "web" | "gh" | "app"; kicker: string; label: string; href: string }[];
};

export type SectionId =
  | "glance"
  | "stories"
  | "demo"
  | "results"
  | "overview"
  | "adapt"
  | "use-cases"
  | "how"
  | "security"
  | "screens"
  | "stack";

export type Img = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  /** Eyebrow on the home cards. */
  kicker: string;
  /** "Type" column on the work list. */
  type: string;
  summary: string;
  tags: string[];
  domain: string;
  image: string;
  /** CSS object-position for the cover (screenshots are anchored to the top). */
  imagePosition?: string;
  categories: Category[];
  caseStudy: CaseStudy;
};

const GH = "https://github.com/HatemRabeaHamde";

export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "haya",
    title: "Haya",
    kicker: "BACKEND · PRODUCTION INFRASTRUCTURE",
    type: "Backend & production · KSA",
    summary:
      "Arabic social app with reels, chat, payments and store loyalty. I extend its Laravel backend and help run it in production on Oracle Cloud with Jenkins deploys — including a production server move with zero user-visible downtime and a Cloudflare → Bunny video rollout.",
    tags: ["Laravel 10", "Jenkins CI/CD", "Oracle Cloud (OCI)", "Nginx · PHP-FPM", "Grafana · Loki", "Bunny Stream", "WebSockets", "PHPUnit"],
    domain: "hayaapp.sa",
    image: "/images/projects/haya/cover.png",
    imagePosition: "left center",
    categories: ["social", "commerce", "payments"],
    caseStudy: {
      tagline: "BACKEND ENGINEERING & PRODUCTION INFRASTRUCTURE · SAUDI ARABIA",
      summary:
        "Haya is an Arabic social app — reels, posts, stories, chat, live streams, gifts, payments and store loyalty. I build and improve the Laravel backend behind it, and help deploy, move and diagnose it in production.",
      meta: [
        ["ROLE", "Senior Backend Engineer"],
        ["TIMELINE", "May 2026 — Present"],
        ["SCOPE", "Backend · Jenkins deploys · Oracle Cloud production"],
        ["PRODUCT UI", "Haya design team"],
      ],
      badge: "LIVE · iOS · ANDROID",
      heroPosition: "right center",
      plain:
        "In short: Haya is a live app people use every day, so every change has to land without breaking it. I build the parts where money, points and video must be exactly right, helped move the backend to new servers without users noticing, and work on deploys that can switch back when something goes wrong.",
      stats: [
        { value: "9", text: "SQL queries per reels page with 2 or 10 authors — local test" },
        { value: "1,169", text: "tests and 4,334 assertions passing — last documented run" },
        { value: "5", text: "recent releases kept on the server, so a bad deploy can switch back" },
        { value: "2", text: "video providers served side by side during the reels rollout" },
      ],
      stories: {
        title: "Hard problems, ",
        titleEm: "real decisions",
        lede: "Six stories from the backend and production work. Each says who did what, and how we know it worked.",
        cover: {
          src: "/images/projects/haya/mockup-seamless-landscape.png",
          alt: "Haya mockup: server migration with no user-visible disruption, and a compatible video provider migration",
          width: 1920,
          height: 1080,
        },
        items: [
          {
            kicker: "PRODUCTION INFRASTRUCTURE",
            title: "Moving servers, ",
            titleEm: "unnoticed",
            ownership: "Team effort — I took part in the move and handled the app-side changes.",
            problem:
              "The live backend had to move to new production servers. Apps already on people's phones call the API directly, so any change in addresses, HTTPS or behaviour would show up as errors in the app.",
            decision:
              "Keep the API contract exactly the same and treat the move as infrastructure only. Set up the new path — Cloudflare, the Oracle Cloud (OCI) load balancer, Nginx, PHP-FPM — so Laravel still sees real HTTPS and the real visitor.",
            built:
              "HTTPS and trusted proxies behind the load balancer. Nginx restores the visitor's real address through the proxy chain. Share previews and app links built from the configured app URL instead of the old host. Reels, live and gift real-time moved off the retired socket server.",
            impact:
              "Users kept the same app through the move. Logs and checks that depend on the visitor's address see the real visitor, not a proxy.",
            evidence:
              "Delivery outcome confirmed on the project — no uptime figure is claimed. Nginx real-IP config in the repo; app-side commits from 24 Sep and 24 Oct 2026.",
            image: {
              src: "/images/projects/haya/mockup-server-migration-portrait.png",
              alt: "Haya mockup: we moved servers, users kept going — stable APIs, HTTPS, trusted proxies",
              width: 1080,
              height: 1440,
            },
            more: [
              "Web requests are only one part: media, the database and long-running processes (queues, WebSockets, private chat) all had to work on the new servers.",
              "Uploaded files live in shared storage outside each release, so neither the move nor later deploys lose them.",
              "Throttling and other checks keyed on the visitor's address use the restored address.",
              "No server addresses, access details or internal inventory are published here.",
            ],
          },
          {
            kicker: "CI/CD & PROCESS LIFECYCLE",
            title: "Deploys you can ",
            titleEm: "walk back",
            ownership: "Team pipeline, written mainly by a teammate. I work within it and added fixes for shared uploads and the private-chat process.",
            problem:
              "Hand-run deploys are easy to get wrong, and a bad release on a live app needs a fast way back. Long-running processes — queue workers, WebSockets, private chat, PHP-FPM — can keep running old code after a new release goes live.",
            decision:
              "Every release gets its own folder, going live is one symlink switch, and the previous release stays ready. Restart only what has to restart.",
            built:
              "Jenkins installs dependencies, checks Laravel and runs the tests, then packages a release that shares storage and uploads. After the switch, queue workers restart, PHP-FPM reloads and WebSocket/chat restart only when needed. A health check must get a real “ok” from Laravel; if it fails, the app switches back to the previous release. GitHub shows each deployment's status, and the newest 5 releases are kept.",
            impact: "Repeatable deploys, fewer manual steps, and a clear way back from a broken release.",
            evidence: "Jenkinsfile in the repo. This is an app rollback — database migrations are not reversed automatically.",
            more: [
              "Health check: up to 6 tries, 5 seconds apart, on an endpoint that has to pass through Laravel — a static “ok” from Nginx doesn't count.",
              "Without the PHP-FPM reload, workers kept old code and deleted files in OPcache, which showed up as 502 errors at the CDN edge.",
              "WebSocket and private chat restart when their code changed, when the process is down, or when it still runs from a release that cleanup is about to delete.",
              "The pipeline reads which release a process runs from, so it restarts before that folder is removed.",
              "Otherwise WebSockets keep running so connections aren't dropped for nothing. A needed restart can still drop them.",
              "My fixes: pending-registration uploads shared across releases, and private chat handled on deploy like the other long-running processes (8 Sep 2026).",
            ],
          },
          {
            kicker: "OBSERVABILITY & DIAGNOSIS",
            title: "Finding what's ",
            titleEm: "actually slow",
            ownership: "Log stack set up by the team. I used the request timings and media data to find the cause.",
            problem:
              "Feeds load lots of images. When loading looks slow, the easy answer is a bigger server — but that's a guess.",
            decision:
              "Measure first: separate time spent in the app from time spent sending data, then look at what is being sent.",
            built:
              "Nginx logs total request time and upstream (app) time. Grafana, Loki and Alloy collect Nginx, Laravel, queue and WebSocket logs, labelled by component and environment, with views for errors and HTTP 5xx.",
            impact:
              "A production check on 30 Sep 2026 found Nginx served images in about 20.4 ms on average across 200 samples — yet 1,213 images were over 1 MB. The size of the data, not server power, was a big part of the slowness.",
            evidence:
              "Historical production inspection, 30 Sep 2026 — static images only, not an API average or an improvement percentage. Related code change: post images compressed on upload, with a feed thumbnail (29 Sep 2026).",
            more: [
              "The slowest image in that sample took 3.45 s — an outlier, reported as one.",
              "Comparing request time with upstream time tells a slow app apart from a slow client or network.",
              "Laravel log entries are parsed as multi-line, so stack traces stay together.",
              "Chat and worker logs get their own component labels, so each process can be read on its own.",
            ],
          },
          {
            kicker: "API & DATABASE PERFORMANCE",
            title: "A feed that doesn't ",
            titleEm: "grow its queries",
            ownership: "My work on the reels endpoints.",
            problem:
              "A feed can quietly run one extra query per author, like or mention. It looks fine in testing and slows down as content grows.",
            decision: "Fix the cost where data is loaded, and lock it in with tests that fail if the query count grows.",
            built:
              "Batched relationship loading, counters where the code uses them instead of repeated counting, cursor pagination, a shared cache of feed order with likes and saves worked out per viewer, and points and notifications moved to background jobs.",
            impact: "The reels page ran 9 queries with 2 authors and with 10 — and no pagination COUNT query.",
            evidence:
              "Local SQLite test, 30 sequential requests per scenario. It shows the query count stays flat — not production speed or capacity.",
            more: [
              "p95 of 2.65 ms with 10 authors, measured inside Laravel on test data. It isn't how long a user waits.",
              "Feed order is cached for 30 s and trending for 120 s (configuration defaults).",
              "Cache tests check that one viewer's likes and saves never leak to another.",
              "Comment threads use the same paginated approach.",
            ],
          },
          {
            kicker: "VIDEO ARCHITECTURE",
            title: "Video, from upload ",
            titleEm: "to ready",
            ownership: "My work — the reels video pipeline and the provider rollout.",
            problem:
              "Video is the heaviest thing the app handles. Uploading through the API ties up servers, encoding takes time, and changing provider can break app versions already installed.",
            decision:
              "Keep video bytes away from the API, treat “ready” as something that arrives later, and let each app version use the provider it supports.",
            built:
              "Signed, resumable TUS uploads straight to the CDN, with callbacks marking a video ready. Bunny Stream runs beside Cloudflare Stream: apps that send supports_bunny use Bunny, older apps keep Cloudflare, and every media record stores its provider.",
            impact: "Video transfer and encoding stay off the API's request path, and older app versions kept working while new ones moved to Bunny.",
            evidence: "Reels service and Bunny Stream tests in the repo. A compatible rollout — not a copy of every old video between providers.",
            image: {
              src: "/images/projects/haya/mockup-reels-migration-square.png",
              alt: "Haya mockup: Cloudflare Stream to Bunny Stream, a compatible rollout",
              width: 1440,
              height: 1440,
            },
            more: [
              "Cloudflare Stream pipeline shipped 13 Oct 2026; Bunny Stream added beside it on 11 Nov 2026.",
              "Owners can turn off downloads per reel.",
              "Saved downloads carry the logo and the owner's name; in-app playback stays clean.",
              "Video size and thumbnails are returned so apps lay out each reel correctly.",
              "Reel interactions were hardened for concurrent use, and the reels endpoints protected at peak times.",
            ],
          },
          {
            kicker: "PAYMENTS & DATA INTEGRITY",
            title: "Money and points, ",
            titleEm: "exactly once",
            ownership: "My work on payments. Merchant loyalty built together with a teammate.",
            problem:
              "The app's confirmation and the gateway's webhook can arrive in any order, and either can be retried. A cashier can submit the same invoice twice. Done naively, that means paying out twice or giving points twice.",
            decision: "Write the rules down, then enforce them in the database — not only in code.",
            built:
              "Authorize → capture → void. Confirmation and webhook share one fulfilment path that checks the payment state under a row lock. Unique invoice numbers per merchant. Row-locked balances with a balance-change log. Verified webhook signatures and records that can be traced.",
            impact:
              "Rules we protect: confirming a payment again doesn't create a second payout. One invoice never gives points twice. Stock and balances change once, in order.",
            evidence:
              "Payment race and webhook-signature tests; merchant loyalty feature tests. SQLite tests don't prove MySQL locking under real concurrent load.",
            more: [
              "Cashiers sign in with their own tokens, and customers are found by a normalized phone number.",
              "A low-balance alert fires when the balance crosses the threshold — not again on every invoice after.",
              "Points follow interaction rules, exclude team and official accounts, and the monthly Top 30 runs on Riyadh time.",
              "Webhook checks use the same details the app actually sent, so valid payments aren't rejected.",
            ],
          },
        ],
      },
      demo: {
        src: "/video/haya-demo.mp4",
        poster: "/images/projects/haya/cover.png",
        width: 1920,
        height: 1080,
        title: "The design, ",
        titleEm: "in motion",
        lede: "A 30-second walkthrough of the backend work, silent, with captions.",
        note: "An animated design showcase built from the Haya design team's original Figma screens. It isn't a recording of the live app.",
      },
      evidence: {
        title: "Measured, confirmed, ",
        titleEm: "decided",
        lede: "Three kinds of result, kept apart so none is read as more than it is.",
        measured: [
          { value: "9", label: "queries per reels page, 2 or 10 authors", context: "Local SQLite test, 30 sequential requests per scenario." },
          { value: "0", label: "pagination COUNT queries", context: "Same local test; cursor pagination." },
          { value: "2.65 ms", label: "p95 inside Laravel, 10 authors", context: "Test data, in-process — not what a user waits." },
          { value: "20.4 ms", label: "mean Nginx image-serving time", context: "Production check, 30 Sep 2026, 200 samples — images only." },
          { value: "1,213", label: "images over 1 MB", context: "Same 30 Sep 2026 investigation." },
          { value: "1,169", label: "tests passing, 4,334 assertions", context: "Last documented run; one pre-existing deprecation warning." },
        ],
        outcomes: [
          { title: "Zero user-visible downtime", text: "The production backend moved to new servers and the app stayed the same for users. Confirmed delivery outcome — no uptime percentage is claimed." },
          { title: "Reels provider rollout", text: "Bunny Stream added beside Cloudflare Stream while older app versions kept working." },
          { title: "Deploys that can switch back", text: "Releases go live by symlink, are health-checked, and the app switches back automatically if the check fails." },
        ],
        decisions: [
          { title: "Contract first", text: "The API stays stable; servers and providers change behind it." },
          { title: "The database enforces the rules", text: "Unique keys and row locks, not only checks in code." },
          { title: "Video off the request path", text: "Direct CDN uploads; readiness arrives by callback." },
          { title: "Cache order, not people", text: "Shared IDs and order; likes and saves per viewer." },
          { title: "Restart only what's stale", text: "WebSockets restart on relevant change, failure or release cleanup." },
        ],
        tests: {
          lede: "The suite targets the places where a bug costs the most.",
          items: [
            "Auth and guard boundaries",
            "Repeated payments",
            "Confirmation vs webhook races",
            "Webhook signatures",
            "Points and invoice rules",
            "Flat query counts",
            "No user state leaking through the cache",
            "Chat behaviour compatibility",
          ],
          caveat: "A large test count doesn't prove every part of the system is right. It shows these rules are pinned down.",
        },
      },
      overview: {
        challenge:
          "A live app used on many app versions at once, mixing video, chat, payments and loyalty — and the infrastructure under it had to change while people were using it.",
        role: "Backend engineer on an existing Laravel codebase: features, integrations and performance, plus deploy fixes and the app side of the server move. The original build, the pipeline's design and the product UI belong to the wider Haya team.",
        outcome:
          "Servers and the video provider changed without users noticing, deploys can switch back on failure, and the rules for money and points are enforced by the database.",
      },
      adapt: {
        title: "New environment, ",
        titleEm: "productive fast",
        lede: "I joined a live codebase with its own history, team and pipeline. This is how I got up to speed — and the skills it took.",
        items: [
          {
            title: "Read before changing",
            text: "Several engineers built Haya before me. Newer modules follow controller → request → service → resource; older ones have their own patterns. I work in both and improve them step by step instead of rewriting what works.",
          },
          {
            title: "Learn the pipeline, then fix it",
            text: "The Jenkins deploys were set up by a teammate. I learned how releases, shared storage and long-running processes fit together, then fixed the gaps I hit — like uploads that weren't shared across releases.",
          },
          {
            title: "Switch providers quickly",
            text: "Moved reels to Cloudflare Stream (13 Oct 2026), then added Bunny Stream beside it (11 Nov 2026) — under a month, with older apps still working.",
          },
          {
            title: "Work across domains",
            text: "Video, payments, chat, loyalty, auth and search each have their own rules. I move between them without needing a hand-over for each.",
          },
          {
            title: "Fit the market",
            text: "Riyadh time for stories and leaderboards, Arabic search that ignores hamza and tashkeel, and an API that stays compatible with apps people update slowly.",
          },
          {
            title: "Diagnose, don't guess",
            text: "When something is slow, I measure first — request timings, query counts, payload size — before reaching for more hardware.",
          },
        ],
        skills: [
          { group: "BACKEND", items: ["PHP", "Laravel 10", "REST APIs", "MySQL", "Transactions & row locks", "JWT · Sanctum"] },
          { group: "PRODUCTION", items: ["Oracle Cloud (OCI)", "Jenkins CI/CD", "Nginx", "PHP-FPM", "Linux", "systemd · Supervisor", "HTTPS & proxies", "Cloudflare"] },
          { group: "OBSERVABILITY", items: ["Grafana", "Loki", "Alloy", "Request timings", "Log labels"] },
          { group: "MEDIA & REAL-TIME", items: ["TUS uploads", "Cloudflare Stream", "Bunny Stream", "FFmpeg", "WebSockets", "Queues"] },
          { group: "QUALITY", items: ["PHPUnit", "Query-count tests", "Race & webhook tests", "Backward compatibility"] },
        ],
      },
      useCases: [
        {
          actor: "App users",
          items: [
            "Post, follow and react across feeds, stories and reels",
            "Chat one-to-one or in groups in real time",
            "Join live rooms and send virtual gifts",
            "Buy deals through the payment gateway",
          ],
        },
        {
          actor: "Creators",
          items: ["Upload reels straight to the video CDN", "Control downloads per reel", "Use sounds and see creator analytics"],
        },
        {
          actor: "Merchants & cashiers",
          items: [
            "Buy point packages for their store",
            "Cashiers sign in with tokens and find customers by phone",
            "Submit invoices that award points once",
            "Get one alert when the balance drops below a threshold",
          ],
        },
        {
          actor: "Admin",
          items: ["Review deals and verification requests", "Manage loyalty packages and merchants", "See loyalty reports"],
        },
      ],
      flow: {
        label: "REELS UPLOAD PIPELINE",
        title: "Video off ",
        titleEm: "the request path",
        lede: "Uploads and encoding are split from API requests, and each app version gets the provider it supports.",
        steps: [
          { title: "App", text: "Asks the API for an upload, saying whether it supports Bunny." },
          { title: "API", text: "Signs a resumable TUS upload. Never receives the video bytes." },
          { title: "Video CDN", text: "Bunny Stream for new apps, Cloudflare Stream for older ones." },
          { title: "Callback", text: "A verified callback marks the video ready." },
          { title: "Feed", text: "The reel appears, with its provider stored on the record." },
        ],
        hot: 2,
        notes: ["supports_bunny opt-in", "Older apps keep Cloudflare", "Readiness arrives later"],
      },
      flow2: {
        label: "DEPLOY PIPELINE · JENKINS",
        title: "Release, check, ",
        titleEm: "or roll back",
        lede: "The team's pipeline: each step has to pass before the next one runs.",
        steps: [
          { title: "Test", text: "Install, check Laravel, run the test suite." },
          { title: "Package", text: "Build a release; storage and uploads stay shared." },
          { title: "Switch", text: "Point the current symlink at the new release." },
          { title: "Restart", text: "Queues restart, PHP-FPM reloads, WebSockets only if needed." },
          { title: "Health check", text: "Laravel must answer “ok” — or the app switches back." },
        ],
        hot: 4,
        notes: ["GitHub deployment status", "Newest 5 releases kept", "App rollback, not database rollback"],
      },
      architecture: {
        caption: "roles, not servers · simplified",
        clients: [
          { name: "iOS app", sub: "MOBILE CLIENT" },
          { name: "Android app", sub: "MOBILE CLIENT" },
          { name: "Admin", sub: "MODERATION · REPORTS" },
          { name: "Cashier", sub: "TOKEN AUTH" },
        ],
        edge: "CLOUDFLARE → OCI LOAD BALANCER → NGINX → PHP-FPM",
        api: {
          name: "Laravel 10 API",
          sub: "AUTH GUARDS · SERVICES · RESOURCES",
          modules: ["Feed", "Reels", "Stories", "Chat", "Live & gifts", "Points", "Deals", "Merchant loyalty", "Admin"],
        },
        infra: [
          { name: "MySQL", sub: "TRANSACTIONS · LOCKS" },
          { name: "Queue workers", sub: "JOBS · NOTIFICATIONS" },
          { name: "WebSocket & chat", sub: "LONG-RUNNING" },
          { name: "Video CDN", sub: "CLOUDFLARE · BUNNY" },
          { name: "Payment gateway", sub: "VERIFIED WEBHOOKS" },
          { name: "Logs", sub: "ALLOY → LOKI → GRAFANA" },
        ],
        footLeft: "Jenkins: test → package → switch → health check → roll back",
        footRight: "storage shared across releases",
      },
      engineeringHead: {
        label: "BUSINESS LOGIC BEYOND CRUD",
        title: "Rules the ",
        titleEm: "product depends on",
        lede: "Smaller examples — each one a rule users would notice if it broke.",
        col: "WHAT I BUILT",
      },
      engineering: [
        { problem: "Signing every device out after a security change", built: "A token cutoff: tokens issued before it stop working, so every device signs in again." },
        { problem: "A token used on the wrong kind of account", built: "Each guard accepts only tokens issued for its own account type." },
        { problem: "Apps not knowing what to do after a 401", built: "Auth errors tell the app its next step, not just that something failed." },
        { problem: "WebSocket sign-in failing silently", built: "Failed socket authentication is logged with the reason; unknown actions are named." },
        { problem: "One block hiding every conversation", built: "Blocks now hide only the conversation they apply to." },
        { problem: "Editing a poll that already has votes", built: "Options are matched by id, so removing one option drops only its own votes." },
        { problem: "Arabic names typed with or without hamza and tashkeel", built: "Search ignores hamza and tashkeel and matches multi-word names." },
        { problem: "Stories and leaderboards on the wrong clock", built: "24-hour stories and the monthly Top 30 run on Riyadh time." },
        { problem: "Duplicate and slow notifications", built: "Duplicates stopped, broadcasts batched, chat pushes moved to queues." },
        { problem: "Creators needing real numbers", built: "Per-reel and post analytics, including reposts and quotes." },
      ],
      practices: [
        { title: "Compatibility first", text: "Versioned routes and compatibility tests let the backend and the apps move at different speeds." },
        { title: "Constraints and locks", text: "Unique keys stop duplicates; row locks put competing balance and stock updates in line." },
        { title: "Measure with context", text: "Every number is reported with how, when and where it was measured." },
        { title: "Off the request path", text: "Notifications, broadcasts and some points work run on queues; video goes straight to the CDN." },
        { title: "Safe to deploy", text: "Health-checked releases with an automatic switch back for the app." },
        { title: "Credit where it's due", text: "Product screens are by the Haya design team; the pipeline is the team's. This page marks my part." },
      ],
      stack: [
        "PHP", "Laravel 10", "MySQL", "Oracle Cloud (OCI)", "Jenkins CI/CD", "Nginx", "PHP-FPM", "Cloudflare", "WebSockets", "JWT", "Sanctum", "Firebase",
        "Cloudflare Stream", "Bunny Stream", "FFmpeg", "Grafana", "Loki", "Alloy", "PHPUnit",
      ],
      quote: "Measure first. A bigger server is a guess.",
      quoteSource: "ON FINDING WHY IMAGES WERE SLOW",
      links: [
        { icon: "web", kicker: "WEBSITE", label: "hayaapp.sa ↗", href: "https://hayaapp.sa/" },
        { icon: "app", kicker: "iOS · APP STORE", label: "Haya on the App Store ↗", href: "https://apps.apple.com/sa/app/haya/id6796128618" },
        { icon: "app", kicker: "ANDROID · GOOGLE PLAY", label: "Haya on Google Play ↗", href: "https://play.google.com/store/apps/details?id=com.haya.haya" },
        { icon: "gh", kicker: "CASE NOTES · GITHUB", label: "hayaApp ↗", href: `${GH}/hayaApp.public` },
      ],
    },
  },
  /* ------------------------------------------------------------------ */
  {
    slug: "benjaltech",
    title: "BenJalTech Product Studio",
    kicker: "FULL-STACK · SHOPIFY SAAS",
    type: "Full-stack SaaS · Shopify",
    summary:
      "Full-stack Shopify platform: a React merchant workspace on NestJS, PostgreSQL/Prisma, Redis/Bull workers and Socket.IO — queued generation with quality gates, Shopify publishing and retry-safe usage billing.",
    tags: ["React 19", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis · Bull", "Socket.IO", "Shopify"],
    domain: "benjaltech.com",
    image: "/images/projects/benjaltech/card.jpg",
    imagePosition: "center",
    categories: ["saas", "commerce", "payments"],
    caseStudy: {
      tagline: "FULL-STACK · REACT + NESTJS · SHOPIFY SAAS",
      summary:
        "Full-stack Shopify workflows — from generation to review, publishing and billing. A React merchant workspace on NestJS APIs, PostgreSQL, Redis/Bull workers and authenticated realtime updates.",
      meta: [
        ["ROLE", "Full-Stack Developer"],
        ["TIMELINE", "Jan 2026 — Present"],
        ["SCOPE", "React workspace · NestJS APIs & workers"],
        ["STACK", "React 19 · NestJS · PostgreSQL · Redis"],
      ],
      badge: "LIVE · MULTI-TENANT · SHOPIFY",
      heroImage: "/images/projects/benjaltech/products.png",
      heroPosition: "left top",
      ogImage: { src: "/images/projects/benjaltech/og.jpg", width: 1200, height: 630 },
      order: ["glance", "demo", "overview", "use-cases", "how", "stories", "results", "security", "screens", "adapt", "stack"],
      chapterLabels: {
        overview: "Problem & role",
        "use-cases": "Users",
        how: "Workflows",
        stories: "Deep dives",
        results: "Evidence",
        adapt: "Skills",
      },
      plain:
        "In short: BenJalTech Product Studio helps Shopify merchants turn product data into publish-ready copy and images. I work on both sides — the React merchant workspace and the NestJS backend behind it: queued generation with quality checks, live progress, tenant-safe APIs and usage billing that survives retries.",
      stats: [
        { value: "171", text: "HTTP handler declarations across 42 NestJS controller files" },
        { value: "6", text: "queue processors — sync, text, audit, images, publishing, usage charges" },
        { value: "15", text: "deterministic quality checks on generated content" },
        { value: "129", text: "RTK Query definitions wiring the React workspace to the API" },
      ],
      mockup: {
        src: "/images/projects/benjaltech/mockup.png",
        alt: "BenJalTech Product Studio: the products screen on desktop next to a responsive feature page on mobile",
        width: 1920,
        height: 1080,
        caption: "Actual frontend screens with fictional store data — desktop catalog and a responsive public page.",
      },
      demo: {
        src: "/video/benjaltech-demo.mp4",
        poster: "/images/projects/benjaltech/poster.jpg",
        width: 1920,
        height: 1080,
        title: "Thirty seconds, ",
        titleEm: "both sides",
        lede: "Frontend screens first, then the backend generation pipeline and the billing flow.",
        note: "A silent motion walkthrough: real frontend screens with fictional data, plus diagrams of source-inspected backend code. No live backend, model or billing request was run.",
      },
      incident: {
        label: "SECURITY INCIDENT · OCTOBER 2026",
        title: "An attack in the ",
        titleEm: "build",
        lede: "Malicious code was slipped into the frontend's build tooling — hidden so it would run on every developer machine and every build. I found it, removed it twice, and helped move the code to a clean, scanned pipeline.",
        steps: [
          { date: "1 OCT", title: "Spotted", text: "A payload hidden in vite.config.js, pushed off-screen with whitespace so the line looked empty. Stripped the same day." },
          { date: "23 OCT", title: "It came back", text: "A second injection: npm dev and build scripts now ran a hidden api.js first, with more code disguised as a font file." },
          { date: "23 OCT", title: "Removed everywhere", text: "Deleted the hook, the script and the fake font on all 5 release branches — prod, staging, develop, dev and main." },
          { date: "26 OCT", title: "Clean start", text: "The code moved to a fresh GitHub organization: every branch imported into new repos, the old one kept as a frozen backup." },
          { date: "4 NOV", title: "Hardened", text: "The team rebuilt CI with Trivy image scans and OIDC deploys. I cleared every HIGH/CRITICAL finding and the lint errors blocking CI." },
        ],
        outcomes: [
          { metric: "3 days", text: "from the second detection to a clean organization" },
          { metric: "5 / 5", text: "release branches cleaned" },
          { metric: "0", text: "HIGH / CRITICAL findings at go-live" },
          { metric: "OIDC", text: "deploys — no long-lived cloud secrets in CI" },
        ],
      },
      overview: {
        challenge:
          "Merchants with large Shopify catalogs need product copy, images and SEO metadata generated, checked and published — without copy-pasting model output or waiting on a frozen screen.",
        role: "Full-stack developer across the React frontend and the NestJS backend, and I lead the team's Scrum planning, MVP scoping and code review. Cloud infrastructure and deployment belong to a separate team; models are used through provider APIs, not trained here.",
        outcome:
          "One workspace: generation runs in background workers, output is validated and scored before review, edits are versioned, approved content goes back to Shopify, and usage is billed once even when jobs retry.",
      },
      useCases: [
        {
          actor: "Merchant",
          items: [
            "Connect a Shopify store through OAuth — with a clear retry path if the flow is cancelled",
            "Sync the catalog and search it with filters that live in the URL",
            "Generate titles, descriptions, bullets, SEO metadata and images per product",
            "Edit inline, then approve, reject or roll back versions",
            "Publish approved content back to Shopify in one click",
          ],
        },
        {
          actor: "Team & organization",
          items: [
            "Switch between organizations and stores without losing context",
            "Manage members and store users with roles",
            "Set brand voice and image profiles for consistent output",
            "Pick a plan and follow usage on the billing page",
          ],
        },
        {
          actor: "Long-running work",
          items: [
            "Start bulk generate or publish jobs and keep working",
            "Follow every job in a task panel across the app",
            "Get notified when generations finish",
          ],
        },
      ],
      flow: {
        label: "THE MERCHANT WORKFLOW",
        title: "From store to ",
        titleEm: "published",
        lede: "One flow across the React client and the NestJS services, built so merchants never wait on a spinner.",
        steps: [
          { title: "Connect", text: "Shopify OAuth links the store to an organization." },
          { title: "Sync", text: "A queue worker syncs products; status streams to the UI." },
          { title: "Generate", text: "Jobs are queued; the UI tracks each product live." },
          { title: "Review", text: "Scored, versioned content waits for approval." },
          { title: "Publish", text: "Approved content goes back to Shopify." },
        ],
        hot: 2,
        notes: ["Socket.IO events with polling fallback", "Optimistic UI with rollback", "Tag-based cache invalidation"],
      },
      flow2: {
        label: "GENERATION PIPELINE · BACKEND",
        title: "Generate, validate, ",
        titleEm: "improve",
        lede: "Model output is treated as untrusted input until it passes the checks.",
        steps: [
          { title: "Enqueue", text: "The API queues the job on Redis/Bull and returns." },
          { title: "Generate", text: "Shared LLM service: OpenAI, Anthropic or Gemini." },
          { title: "Validate", text: "Zod checks the response shape." },
          { title: "Score", text: "15 deterministic checks; up to 3 attempts with hints." },
          { title: "Audit", text: "Six required quality dimensions before review." },
        ],
        hot: 3,
        notes: ["Bounded retries, not loops", "No silent score regressions", "Configured limits, not measured timings"],
      },
      architecture: {
        caption: "full stack · one tenant model from UI to worker",
        clients: [
          { name: "Merchant workspace", sub: "REACT 19 · RTK QUERY" },
          { name: "Public pages", sub: "7 PRERENDERED" },
          { name: "Shopify", sub: "OAUTH · WEBHOOKS" },
        ],
        edge: "REST · JWT · SOCKET.IO STORE ROOMS",
        api: {
          name: "NestJS on Fastify",
          sub: "42 CONTROLLER FILES · GUARDS · ZOD",
          modules: ["Organizations & stores", "Products & sync", "Generation", "Audit", "Images", "Publishing", "Usage billing", "Realtime", "Shopify"],
        },
        infra: [
          { name: "PostgreSQL", sub: "PRISMA · 41 MODELS" },
          { name: "Redis", sub: "BULL QUEUES · QUOTAS" },
          { name: "Workers", sub: "6 PROCESSORS" },
          { name: "Socket.IO", sub: "AUTHENTICATED ROOMS" },
          { name: "Model APIs", sub: "OPENAI · ANTHROPIC · GEMINI" },
          { name: "Shopify API", sub: "PUBLISH · BILLING" },
        ],
        footLeft: "Cloud infrastructure & deploys: a separate team",
        footRight: "models used via APIs, not trained in-house",
      },
      stories: {
        label: "DEEP DIVES",
        title: "The hard parts, ",
        titleEm: "up close",
        lede: "Four engineering problems across the stack. Open “More detail” for the specifics.",
        items: [
          {
            kicker: "QUEUES & QUALITY GATES",
            title: "Generation that checks ",
            titleEm: "its own work",
            ownership: "Full-stack: queued NestJS workers behind the React review flow.",
            problem:
              "Model calls are slow and sometimes return malformed or weak content. Run inside an HTTP request, they time out and leave the merchant staring at a spinner.",
            decision: "Move generation to queue workers and treat model output as untrusted input: validate it, score it, and retry within a fixed budget.",
            built:
              "Endpoints enqueue jobs on Redis/Bull. A shared LLM service has OpenAI, Anthropic and Gemini branches. Zod validates each response, a deterministic scorer runs 15 checks, and the worker allows up to three attempts while carrying improvement hints forward. A separate audit schema requires six quality dimensions.",
            impact: "Requests return quickly, broken output is caught before a merchant reviews it, retries are bounded, and a regeneration can't quietly replace content with a lower-scoring version.",
            evidence: "ai-generation.processor.ts and regex-scorer.service.ts at revision abf4348. Configured limits — not measured generation time or model accuracy.",
            more: [
              "Audit dimensions: SEO, conversion, readability, Shopify, completeness and keyword.",
              "Up to eight improvement hints are kept between attempts, with a five-point regression tolerance against prior content.",
              "Provider and model are configurable; models are consumed through APIs, not trained in-house.",
              "Six processor classes cover sync, text, audit, images, publishing and usage charges.",
            ],
          },
          {
            kicker: "REALTIME & RECONCILIATION",
            title: "Progress that survives ",
            titleEm: "a dropped connection",
            ownership: "Full-stack: Socket.IO events from the backend, task state in React.",
            problem: "Bulk jobs run for a while. Merchants navigate away, lose connection or come back later — and the UI still has to show the truth.",
            decision: "Use realtime events as the fast path and polling as the safety net, and reconcile state after every reconnect.",
            built:
              "A global task state tracks each product while the user moves around the app. Authenticated Socket.IO events update generation, audit, image and publishing status; operation and store IDs keep related runs apart. A 10-second polling fallback and reconnect reconciliation restore state after a gap. Publish-batch status is fetched once per task, then matched to each product.",
            impact: "Progress follows the merchant across pages and survives a dropped socket. For an illustrative 20-item batch, one status request replaces 20 per cycle — derived from code, not measured savings.",
            evidence: "Four realtime event families. The 10 s poll interval and skip window are configuration, not measured response times.",
            more: [
              "One shared in-flight token refresh serves every concurrent 401, so expiry doesn't cause a burst of failed calls.",
              "Errors distinguish rate limiting, billing restrictions and maintenance; rate-limited calls retry up to twice.",
              "RTK Query tags and focused cache updates keep list and detail views in step after each mutation.",
              "Catalog search: 350 ms debounce, server pagination and filters stored in the URL.",
            ],
          },
          {
            kicker: "MULTI-TENANT SECURITY",
            title: "One tenant rule for ",
            titleEm: "HTTP and sockets",
            ownership: "Full-stack: NestJS guards and gateway, store scope in the React app.",
            problem: "A user can belong to several organizations and stores. A leak — over HTTP or through a websocket room — would show one merchant another's catalog.",
            decision: "Derive access on the server for every request and every socket room. Never trust a store ID just because the client sent it.",
            built:
              "Store and organization guards check membership, direct store access, active state and role. The Socket.IO gateway authenticates the token and joins only the store rooms found in server-side membership records. Shopify callbacks and webhooks are HMAC-checked; passwords use Argon2 and stored Shopify credentials AES-256-GCM.",
            impact: "HTTP and realtime follow the same tenant rules, so a live update can't reach a store the user isn't allowed to open.",
            evidence: "store.guard.ts, organization.guard.ts and realtime.gateway.ts. Tenant-isolation and publish-isolation e2e spec files exist; they weren't run in this review.",
            more: [
              "Organization and store scope persists across reloads and switches from the sidebar.",
              "A cancelled Shopify OAuth returns the store ID, so the UI can offer Try again or Remove.",
              "GDPR basics: cookie consent and account deletion (DELETE /v1/users/me).",
            ],
          },
          {
            kicker: "BILLING & DATA INTEGRITY",
            title: "Retries happen. ",
            titleEm: "Count once.",
            ownership: "Backend usage ledger and charge worker, plus the plans and billing screens.",
            problem: "Usage billing has to count each product once per period — even when jobs retry, workers run in parallel or the billing provider times out.",
            decision: "Record the usage and the intent to charge in one database transaction, and make every external call safe to repeat.",
            built:
              "A Prisma/PostgreSQL transaction writes the product-period usage unit and a billing outbox row together. An organization-scoped advisory lock coordinates free-allowance allocation, and a unique organization/product/period key blocks double counting. The charge worker retries with stable idempotency keys; Redis reservation and release enforce quotas.",
            impact: "A retried job doesn't create a second usage record, and a failed charge can be retried without charging twice on the provider side.",
            evidence: "usage-unit.service.ts, usage-charge.processor.ts and cost-tracker.service.ts. This is retry safety — not a promise of exactly-once delivery over external networks.",
            more: [
              "Charge jobs: up to five attempts with a 30-second backoff base (configuration).",
              "Frontend: Shopify App Pricing checkout, plans, billing limits and upgrades.",
              "Free allowances and pricing are configurable; marketing examples aren't runtime billing settings.",
              "A usage-billing e2e spec file exists (not run in this review).",
            ],
          },
        ],
      },
      evidence: {
        label: "EVIDENCE",
        groups: ["Codebase inventory", "Local measurements", "Configured safeguards"],
        title: "The evidence, ",
        titleEm: "with its limits",
        lede: "Counts describe the whole codebase, not my individual authorship. Demo dashboard values are fictional.",
        measured: [
          { value: "171", label: "HTTP handler declarations", context: "Across 42 controller files — not necessarily distinct URLs." },
          { value: "41", label: "Prisma models", context: "Plus 28 migration directories and 24 domain modules." },
          { value: "6", label: "queue processor classes", context: "Sync, text, audit, images, publishing and usage charges." },
          { value: "129", label: "RTK Query definitions", context: "53 queries + 76 mutations in the React client." },
          { value: "56", label: "test spec files", context: "52 unit + 4 e2e — a file count, not passing tests or coverage." },
          { value: "7", label: "prerendered public pages", context: "Headings and answers asserted in the generated HTML." },
        ],
        outcomes: [
          { title: "4.10 s full frontend build", text: "One local Apple M4 sample, prerender included." },
          { title: "Median FCP 80 ms · LCP 96 ms", text: "Seven local Chrome runs of one feature page on localhost — not production Web Vitals." },
          { title: "~176 KiB gzip largest JS file", text: "~585 KiB raw. 23 lazy routes split the app; more bundle work is an open topic." },
        ],
        decisions: [
          { title: "Up to 3 generation attempts", text: "With improvement hints carried between attempts." },
          { title: "15 deterministic checks", text: "Run on generated content before review." },
          { title: "6 required audit dimensions", text: "SEO, conversion, readability, Shopify, completeness, keyword." },
          { title: "10 s polling fallback", text: "A configured interval, not a measured response time." },
          { title: "5 charge attempts", text: "30 s backoff base and stable idempotency keys." },
        ],
        tests: {
          label: "WHERE THE SPECS POINT",
          lede: "Spec files exist where mistakes are expensive.",
          items: ["Tenant isolation (e2e)", "Publish tenant isolation (e2e)", "Usage billing (e2e)", "Product sync (e2e)", "Pricing & graduated billing (unit)", "Auth service (unit)"],
          caveat: "These weren't run in this review. The inventory shows what is tested, not that it passes.",
        },
      },
      screensLede: "Actual frontend screens with fictional store data — scores and totals aren't customer results.",
      screenshots: [
        { src: "/images/projects/benjaltech/dashboard.png", caption: "Dashboard — store context and activity (demo data)" },
        { src: "/images/projects/benjaltech/products.png", caption: "Catalog — quality status for each product (demo data)" },
        { src: "/images/projects/benjaltech/search.png", caption: "Search — debounced, paginated, filters kept in the URL" },
        { src: "/images/projects/benjaltech/bulk-selection.png", caption: "Bulk selection — one action across the shown products" },
      ],
      adapt: {
        label: "WHAT IT SHOWS",
        title: "One product, ",
        titleEm: "both sides",
        lede: "What this project demonstrates for a full-stack role.",
        items: [
          { title: "Merchant UX", text: "React 19 workflows for catalog, review, bulk actions and billing, plus responsive prerendered public pages." },
          { title: "API design", text: "NestJS on Fastify with Zod validation and guards on every store-scoped route." },
          { title: "Data integrity", text: "PostgreSQL transactions, advisory locks, unique keys and a billing outbox." },
          { title: "Background work", text: "Redis/Bull workers with bounded retries and progress the UI can follow." },
          { title: "Realtime", text: "Authenticated Socket.IO rooms, a polling fallback and reconnect reconciliation." },
          { title: "Integrations", text: "Shopify OAuth, webhooks, publishing and usage billing; OpenAI, Anthropic and Gemini through their APIs." },
        ],
        skills: [
          { group: "FRONTEND", items: ["React 19", "TypeScript", "Redux Toolkit", "RTK Query", "Tailwind CSS v4", "Vite"] },
          { group: "BACKEND", items: ["NestJS", "Fastify", "Zod", "REST APIs", "JWT", "Argon2"] },
          { group: "DATA", items: ["PostgreSQL", "Prisma", "Redis", "Bull queues", "Transactional outbox"] },
          { group: "REALTIME & APIS", items: ["Socket.IO", "Shopify API", "OAuth & webhooks", "LLM APIs"] },
          { group: "QUALITY", items: ["Vitest", "e2e specs", "Idempotency", "SEO prerendering"] },
        ],
      },
      engineeringHead: {
        label: "MORE FROM THE BUILD",
        title: "Smaller problems, ",
        titleEm: "solved",
        lede: "Front and back, the details that make the product feel solid.",
        col: "WHAT I BUILT",
      },
      engineering: [
        { problem: "Merchants needed content they can trust", built: "NestJS content pipeline: LLM generation, quality scoring, content versions and prompt templates." },
        { problem: "No way to charge for the app", built: "Shopify App Pricing checkout, plans and billing page, billing limits, plan upgrades and feature flags." },
        { problem: "Users stared at spinners during generation", built: "Realtime generation status, real publish progress and a bulk-optimize flow on the dashboard." },
        { problem: "Stale data after edits and publishes", built: "One RTK Query API slice with tag types, so each mutation refreshes exactly the queries it affects." },
        { problem: "Session expiry mid-task", built: "A shared in-flight refresh promise for concurrent 401s, with clear handling for rate limits, billing and maintenance." },
        { problem: "Multi-tenant scope everywhere", built: "Organization and store scope on every screen and request, persisted across reloads." },
        { problem: "Public pages nobody could find", built: "One registry drives routes, prerendered HTML, the sitemap and FAQ content, checked at build time." },
        { problem: "One team, many moving parts", built: "I run planning, task breakdown and code review so frontend and backend ship against one contract." },
      ],
      practices: [
        { title: "Validate model output", text: "Zod and deterministic checks run before a person sees the result." },
        { title: "Queue, don't block", text: "Slow work runs in workers; the UI follows it through events and polling." },
        { title: "One tenant rule", text: "HTTP guards and socket rooms are both derived on the server." },
        { title: "Count once", text: "Transactions, advisory locks, unique keys and idempotency keys around money." },
        { title: "Cache with intent", text: "RTK Query tags and focused updates instead of refetching everything." },
        { title: "Honest numbers", text: "Inventory, configuration and local measurements are labelled as what they are." },
      ],
      stack: [
        "React 19", "Vite 7", "TypeScript", "React Router v7", "Redux Toolkit", "RTK Query", "Tailwind CSS v4", "Framer Motion", "TipTap 3",
        "NestJS 12", "Fastify 5", "Prisma 7", "PostgreSQL", "Redis", "Bull", "Socket.IO", "Zod", "Vitest", "Shopify API", "OpenAI · Anthropic · Gemini APIs",
      ],
      quote: "Retries happen. Count once.",
      quoteSource: "ON THE USAGE LEDGER AND BILLING OUTBOX",
      links: [
        { icon: "web", kicker: "WEBSITE · LIVE", label: "benjaltech.com ↗", href: "https://benjaltech.com" },
        { icon: "gh", kicker: "SOURCE · GITHUB", label: "BenJalTech web client ↗", href: `${GH}/aiSmartyFront.public` },
      ],
    },
  },
  /* ------------------------------------------------------------------ */
  {
    slug: "tourstica",
    title: "Tourstica",
    kicker: "TRAVEL · BOOKING MARKETPLACE",
    type: "Booking marketplace · Morocco",
    summary:
      "Booking marketplace for Morocco: agencies list trips, travellers book instantly, the platform moderates and pays out. Solo build — 216 tests, 204 routes, 3 languages.",
    tags: ["Laravel 13", "Alpine.js", "Meilisearch", "MySQL 8"],
    domain: "tourstica.com",
    image: "/images/projects/tourstica/cover.jpg",
    categories: ["marketplace", "commerce", "payments"],
    caseStudy: {
      tagline: "TRAVEL MARKETPLACE · MOROCCO · EN / FR / NL",
      summary:
        "A booking marketplace for Morocco with three sides: local agencies list trips, travellers book them instantly, and the platform team moderates listings and pays agencies out. Designed and built solo, from Figma to deployment. Demo build — hosts, reviews and prices are sample content.",
      meta: [
        ["ROLE", "Solo — design, backend, frontend, tests, deploy"],
        ["BUILD", "Demo build · tourstica.com"],
        ["LANGUAGES", "English · French · Dutch"],
        ["STACK", "Laravel 13 · Blade · Alpine.js · MySQL 8"],
      ],
      badge: "DEMO BUILD · EN / FR / NL",
      video: { src: "/video/tourstica.mp4", poster: "/images/projects/tourstica/d-home.jpg" },
      stats: [
        { value: "216", text: "PHPUnit tests and 1,156 assertions, all passing in ~8.4 s" },
        { value: "204", text: "routes across the public site, agency dashboard and admin" },
        { value: "43", text: "single-purpose Action classes across 12 business domains" },
        { value: "3", text: "languages with ~1,980 UI strings each and localized URLs" },
      ],
      impact: {
        title: "Built to ",
        titleEm: "be trusted",
        lede: "Every number here is counted from the code or measured by running the test suite.",
        items: [
          {
            area: "OWNERSHIP",
            metric: "1",
            label: "person, end to end",
            detail: "Product design in Figma, backend, frontend, testing and deployment — all solo.",
          },
          {
            area: "QUALITY",
            metric: "216",
            label: "tests in ~8.4 seconds",
            detail: "1,156 assertions plus 7 JS tests for the booking widget. Larastan and Pint keep the code honest.",
          },
          {
            area: "CONCURRENCY",
            metric: "13",
            label: "row-locked code paths",
            detail: "Seats, payouts and refunds are changed inside locked transactions, so races resolve one at a time.",
          },
          {
            area: "SCOPE",
            metric: "204",
            label: "routes, three products",
            detail: "A public site, an agency dashboard and an admin panel on one Laravel codebase.",
          },
          {
            area: "ARCHITECTURE",
            metric: "43",
            label: "use-case Actions",
            detail: "Plus 33 Form Requests and 8 domain events. Controllers stay under 10 lines per method.",
          },
          {
            area: "DATA",
            metric: "41",
            label: "models, 39 migrations",
            detail: "Bookings snapshot package, host, time, policy, commission and payout at checkout.",
          },
          {
            area: "REACH",
            metric: "3",
            label: "languages, ~1,980 strings each",
            detail: "English, French and Dutch with localized URLs (/en, /fr, /nl). Built for phones first.",
          },
          {
            area: "FRONTEND",
            metric: "0",
            label: "SPA frameworks",
            detail: "371 server-rendered Blade views and components with Alpine.js — fast pages, no client bundle bloat.",
          },
          {
            area: "MONEY",
            metric: "0",
            label: "floating-point money math",
            detail: "Every price, commission and refund uses brick/money. Default commission 15%, allowed 0–50%.",
          },
        ],
      },
      overview: {
        challenge:
          "Travellers new to Morocco don't know which guide to trust or what a fair price is. Local agencies have good trips but no trusted place to sell them to international visitors.",
        role: "Solo: product design in Figma, then the backend, frontend, tests and deployment — about 14,900 lines of application PHP and 5,300 lines of tests.",
        outcome:
          "A three-sided marketplace with instant booking, overselling-proof checkout, automatic payouts and moderated listings, in three languages.",
      },
      useCases: [
        {
          actor: "Travellers",
          items: [
            "Browse destinations, interests and local hosts",
            "Get a live quote, then book an available slot instantly",
            "Manage upcoming trips and cancel under each trip's policy",
            "Leave reviews and keep a wishlist",
          ],
        },
        {
          actor: "Travel agencies",
          items: [
            "Register and get approved by the platform",
            "Manage experiences, options, time slots and hosts",
            "Handle bookings and follow payouts",
            "Reply to reviews",
          ],
        },
        {
          actor: "Platform team",
          items: [
            "Approve agencies and changes to live listings",
            "Edit the home page visually, with drafts, preview and revisions",
            "Oversee bookings, payouts and commission",
          ],
        },
      ],
      flow: {
        label: "BOOKING & CHECKOUT",
        title: "No overselling, ",
        titleEm: "ever",
        lede: "From quote to payout, every step that touches seats or money is transactional.",
        steps: [
          { title: "Quote", text: "Live price for the chosen option, date and group size." },
          { title: "Hold", text: "Checkout holds seats for 30 minutes; a job frees abandoned holds every 5." },
          { title: "Lock", text: "The time-slot row is locked, so the last seat goes to one buyer." },
          { title: "Confirm", text: "Instant confirmation — prices and policy frozen on the booking." },
          { title: "Payout", text: "The agency payout is created after the database commit." },
        ],
        hot: 2,
        notes: ["Availability is never cached", "Hourly job completes past trips", "Refunds computed in Morocco time"],
      },
      screenshots: [
        { src: "/images/projects/tourstica/d-home.jpg", caption: "Home — destinations first, booking second" },
        { src: "/images/projects/tourstica/d-exp.jpg", caption: "Experience search with filters" },
        { src: "/images/projects/tourstica/d-detail.jpg", caption: "Trip page with options and live quote" },
        { src: "/images/projects/tourstica/d-host.jpg", caption: "Local host profile" },
      ],
      showcase: [
        { src: "/images/projects/tourstica/pages.jpg", caption: "Home, search, trip page and host profile", width: 2400, height: 1650 },
        { src: "/images/projects/tourstica/mobile.jpg", caption: "Built for phones first", width: 2400, height: 1500 },
      ],
      engineering: [
        {
          problem: "Two travellers racing for the last seat",
          built: "Seats are reserved inside a transaction that locks the time-slot row, so they're served one after the other. Availability is never cached.",
        },
        {
          problem: "Abandoned checkouts blocking seats",
          built: "Starting checkout holds seats for 30 minutes; a scheduled job every 5 minutes releases abandoned holds.",
        },
        {
          problem: "Prices changing after someone books",
          built: "Each booking stores package, host, time, cancellation policy, commission and payout as they were at checkout.",
        },
        {
          problem: "Paying agencies by hand",
          built: "Confirming a booking creates the agency payout after the database commit — 15% default commission, 0–50% allowed.",
        },
        {
          problem: "Fair refunds",
          built: "Admin cancellations refund in full; traveller cancellations follow each trip's hours-before and refund-percentage policy, in Morocco time.",
        },
        {
          problem: "Bad listings going live",
          built: "New listings and edits to live ones wait for approval while the approved version stays public. Drafts preview but can't be booked.",
        },
      ],
      practices: [
        { title: "Clean layering", text: "Controller → Form Request → Action → Service → Model, with DTOs and ViewModels. Blade never queries the database." },
        { title: "Money as money", text: "brick/money for every amount — no floats anywhere in pricing, commission or refunds." },
        { title: "Lock what's contended", text: "13 code paths use row locks; availability is always read fresh." },
        { title: "Events after commit", text: "8 domain events — payouts and notifications fire only once data is safely written." },
        { title: "Static analysis", text: "Larastan and Pint on top of 216 tests." },
        { title: "Design tokens", text: "Figma screens built as Blade components on tokens — forest green, terracotta, Fraunces and DM Sans." },
      ],
      stack: ["PHP 8.3", "Laravel 13", "Blade", "Alpine.js", "Tailwind CSS", "GSAP", "Leaflet", "MySQL 8", "Redis", "Horizon", "Laravel Scout", "Meilisearch", "Spatie packages", "brick/money", "PHPUnit", "Larastan", "Pint", "Figma"],
      quote: "Two people racing for the last seat are served one after the other.",
      quoteSource: "ON LOCKING THE TIME-SLOT ROW AT CHECKOUT",
      links: [
        { icon: "web", kicker: "WEBSITE · DEMO", label: "tourstica.com ↗", href: "https://tourstica.com" },
        { icon: "gh", kicker: "SOURCE · GITHUB", label: "toursitca ↗", href: `${GH}/toursitca` },
      ],
    },
  },
  /* ------------------------------------------------------------------ */
  {
    slug: "saedni",
    title: "Saedni",
    kicker: "AUTOMOTIVE · SUBSCRIPTIONS",
    type: "Automotive services · KSA",
    summary:
      "Bilingual platform for vehicle subscriptions, inspections, towing and replacement car rentals — with a security-first MyFatoorah payment lifecycle.",
    tags: ["Laravel 12", "MyFatoorah", "Firebase", "Pest"],
    domain: "saedni",
    image: "/images/projects/saedni/06-landing-page.png",
    imagePosition: "top",
    categories: ["saas", "payments"],
    caseStudy: {
      tagline: "AUTOMOTIVE SERVICES · SUBSCRIPTIONS · RIYADH",
      summary:
        "A bilingual automotive service platform powering a mobile app and an admin dashboard: per-vehicle subscriptions, inspections, towing, replacement car rentals, repair reports, payments, notifications and OTP login.",
      meta: [
        ["ROLE", "Full-Stack Developer"],
        ["ENGAGEMENT", "Freelance · client in Saudi Arabia"],
        ["SURFACES", "Mobile API · Admin dashboard · Landing"],
        ["STACK", "Laravel 12 · PHP 8.3 · MyFatoorah · Pest"],
      ],
      badge: "MOBILE · ADMIN · AR / EN",
      stats: [
        { value: "6", text: "payment purposes on one verified lifecycle" },
        { value: "60", text: "day delayed-activation window, run by scheduled jobs" },
        { value: "1:1", text: "subscription per vehicle, priced by manufacturer origin" },
        { value: "AR/EN", text: "full RTL / LTR support across app and dashboard" },
      ],
      overview: {
        challenge:
          "Subscriptions and money had to stay correct even when webhooks are late, mobile requests retry, and webhook and manual verification arrive at the same moment.",
        role: "Built the backend workflows — subscriptions, payments, service fulfilment, notifications — and the admin dashboard on top of them.",
        outcome:
          "Payments as a first-class domain with row locks, amount checks and idempotent fulfilment, plus feature tests for the money-sensitive flows.",
      },
      useCases: [
        {
          actor: "Vehicle owner",
          items: [
            "Register several vehicles — brand, model, year, VIN, plate, origin",
            "Subscribe each vehicle: activate now with an inspection fee, or within 60 days",
            "Request towing, a replacement car, or both",
            "Pay inspection fees, subscriptions, renewals, towing, rentals and repair costs",
            "Sign in with OTP and get push notifications for key events",
          ],
        },
        {
          actor: "Admin",
          items: [
            "Manage plans priced per manufacturer origin, towing and rental rates",
            "Complete or reject inspections",
            "Deliver and receive replacement cars; the system calculates days and cost",
            "Attach inspection or repair reports with PDFs and amounts",
            "Review payments by purpose and state",
          ],
        },
      ],
      flow: {
        label: "PAYMENT LIFECYCLE",
        title: "Money that ",
        titleEm: "can't drift",
        lede: "Every purpose — from inspection fees to repair costs — runs through the same verified lifecycle.",
        steps: [
          { title: "Pending", text: "A payment is created and linked to what it pays for." },
          { title: "Checkout", text: "The user pays through MyFatoorah." },
          { title: "Verify", text: "Callback, webhook or manual fallback — row-locked." },
          { title: "Check", text: "Amount, invoice and customer reference must match." },
          { title: "Fulfil", text: "Idempotent, even if two confirmations race." },
        ],
        hot: 2,
        notes: ["Polymorphic payments table", "Idempotency middleware on mobile requests", "Unpaid requests stay hidden"],
      },
      screenshots: [
        { src: "/images/projects/saedni/02-dashboard.png", caption: "Operational dashboard — users, subscriptions, bookings, reports" },
        { src: "/images/projects/saedni/03-subscription-plans.png", caption: "Plans with origin-based pricing, towing and rental rates" },
        { src: "/images/projects/saedni/05-payments.png", caption: "Payments by purpose with paid / pending / failed states" },
        { src: "/images/projects/saedni/06-landing-page.png", caption: "Public Arabic landing page for the mobile service" },
      ],
      engineering: [
        { problem: "Webhooks can arrive late", built: "A manual POST /payment/{id}/verify fallback for mobile, safe to call alongside the webhook." },
        { problem: "Webhook and manual verify racing", built: "Row-level locking while verifying, and idempotent fulfilment." },
        { problem: "Tampered or mismatched payments", built: "Amount-mismatch detection plus invoice and customer reference validation." },
        { problem: "Mobile retries on flaky networks", built: "Idempotency middleware for retry-safe requests." },
        { problem: "Half-paid bookings cluttering the app", built: "Unpaid service requests stay hidden until payment completes." },
        { problem: "Status chaos across bookings, rentals and reports", built: "Enums for explicit transitions, Action classes for each workflow, scheduled jobs for expiry." },
      ],
      stack: ["Laravel 12", "PHP 8.3", "Sanctum", "MyFatoorah", "Firebase FCM", "Spatie Permission", "Spatie Translatable", "OTP / SMS", "Blade", "Pest"],
      quote: "Reliable billing is verification, duplicate protection and safe fulfilment.",
      quoteSource: "ON THE PAYMENT LIFECYCLE",
      links: [{ icon: "gh", kicker: "SOURCE · GITHUB", label: "saedniapp ↗", href: `${GH}/saedniapp.public` }],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "machine-rental",
    title: "Machine Rental",
    kicker: "MARKETPLACE · BOOKING",
    type: "Equipment rental · Europe",
    summary:
      "Full-stack heavy-equipment rental marketplace: public listings, company machine management, booking lifecycle, OTP login and role-based access.",
    tags: ["Laravel 12", "React 19", "Redux Toolkit", "Tailwind"],
    domain: "machine-rental",
    image: "/images/projects/machine-rental/home.png",
    imagePosition: "top",
    categories: ["marketplace", "saas"],
    caseStudy: {
      tagline: "EQUIPMENT RENTAL MARKETPLACE · EUROPE",
      summary:
        "A heavy-machine rental marketplace built end to end as the sole web developer: a Laravel API and a React client with listings, machine management, bookings, OTP login, email verification and admin reporting.",
      meta: [
        ["ROLE", "Sole Full-Stack Developer"],
        ["TIMELINE", "Aug 2025 — Jan 2026"],
        ["CLIENT", "European tech company · remote"],
        ["STACK", "Laravel 12 · Sanctum · React 19 · Redux"],
      ],
      badge: "WEB · 3 ROLES · i18n READY",
      stats: [
        { value: "6", text: "month engagement as the only web developer" },
        { value: "3", text: "roles with their own dashboards — admin, company, renter" },
        { value: "2", text: "apps shipped — a Laravel API and a React client" },
        { value: "100%", text: "on time and within scope" },
      ],
      overview: {
        challenge:
          "Renters and companies needed a structured booking experience, while admins needed visibility into users, machines, bookings and activity.",
        role: "Sole web developer: designed the API, built the React frontend, and delivered the booking engine, auth and reporting.",
        outcome:
          "A layered Laravel backend (Form Request → Service → Resource) and a React client with centralized state, explicit booking statuses and i18n-ready setup.",
      },
      useCases: [
        {
          actor: "Renter",
          items: [
            "Browse and filter the public machine marketplace",
            "Open machine details and book dates from a modal",
            "See distance-based costs before booking",
            "Track booking status from a renter dashboard",
            "Sign up, verify email and log in with OTP",
          ],
        },
        {
          actor: "Company",
          items: [
            "Create, edit and delete machines with image uploads",
            "Manage incoming bookings and update their status",
          ],
        },
        {
          actor: "Admin",
          items: ["Manage categories and sub-categories", "Manage users across roles", "Read platform statistics and charts"],
        },
      ],
      flow: {
        label: "BOOKING LIFECYCLE",
        title: "Booking as a ",
        titleEm: "state machine",
        lede: "Statuses are modeled explicitly, so every transition is easy to follow and permission-checked.",
        steps: [
          { title: "Browse", text: "Public listing with filters and machine details." },
          { title: "Request", text: "Renter books dates, with a distance-based cost." },
          { title: "Manage", text: "The company updates the booking status." },
          { title: "Track", text: "Renter follows progress in their dashboard." },
          { title: "Report", text: "Admin sees bookings and activity in statistics." },
        ],
        hot: 1,
        notes: ["Role middleware on every protected route", "Mail on queues", "Paginated listings"],
      },
      screenshots: [
        { src: "/images/projects/machine-rental/home.png", caption: "Home — featured machines and how it works", position: "top" },
        { src: "/images/projects/machine-rental/machines.png", caption: "Marketplace listing with filters", position: "top" },
        { src: "/images/projects/machine-rental/view-details.png", caption: "Machine details", position: "top" },
        { src: "/images/projects/machine-rental/view-details-booking.png", caption: "Booking modal", position: "top" },
      ],
      engineering: [
        { problem: "Fat controllers are hard to change", built: "Thin controllers: validation in Form Requests, rules in Services, response shape in API Resources." },
        { problem: "Actions hidden in the UI aren't protected", built: "Authorization stays on the backend — Sanctum plus role middleware for admin and company routes." },
        { problem: "Slow listing endpoints", built: "Eager loading on relation-heavy lists, pagination, cached lookup data like categories." },
        { problem: "Email and notifications slowing requests", built: "Mail and background work run on Laravel queues." },
        { problem: "Scattered API URLs in the client", built: "A centralized endpoint map and Redux state per feature, i18next locales from day one." },
      ],
      stack: ["Laravel 12", "PHP 8.2", "Sanctum", "Laravel Queue", "PHPUnit", "React 19", "Vite", "Redux Toolkit", "React Router", "Tailwind CSS", "React Hook Form", "i18next", "Recharts"],
      quote: "Booking products stay maintainable when the state machine is explicit.",
      quoteSource: "ON MODELING BOOKING STATUSES",
      links: [{ icon: "gh", kicker: "SOURCE · GITHUB", label: "machineRental ↗", href: `${GH}/machineRental.public` }],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "rct",
    title: "RCT",
    kicker: "REAL ESTATE · MARKETPLACE",
    type: "Real estate platform · KSA",
    summary:
      "Rescued a failing real-estate platform in one month, then added a multi-vendor marketplace, contracts, invoices and an admin dashboard — 55% faster APIs.",
    tags: ["Laravel 10", "Livewire", "DomPDF", "Spatie"],
    domain: "rct",
    image: "/images/projects/rct/dashboard.png",
    imagePosition: "top left",
    categories: ["marketplace", "commerce"],
    caseStudy: {
      tagline: "REAL ESTATE · MULTI-VENDOR · LEGACY RESCUE",
      summary:
        "A real estate and services platform with property modules, renter contracts, a seller marketplace, invoices and an admin dashboard — serving the web and a Flutter mobile app. I joined a failing project, stabilized it and led it to delivery.",
      meta: [
        ["ROLE", "Full-Stack Developer & Tech Lead"],
        ["ENGAGEMENT", "Freelance · client in Saudi Arabia"],
        ["TEAMS LED", "UI/UX · Flutter · System analysis"],
        ["STACK", "Laravel 10 · Livewire · Blade · MySQL"],
      ],
      badge: "WEB · FLUTTER APP · AR / EN",
      stats: [
        { value: "1 mo", text: "to stabilize the failing legacy codebase" },
        { value: "55%", text: "faster API responses" },
        { value: "50%", text: "shorter page loads" },
        { value: "3", text: "teams led — UI/UX, Flutter and analysis" },
      ],
      overview: {
        challenge:
          "A failing project: unstable legacy code, slow paths, and several business domains — property, services, sellers — that all had to live in one platform.",
        role: "Stabilized the codebase, built the missing modules and led the UI/UX, Flutter and analysis teams through delivery.",
        outcome:
          "A stable platform with a multi-vendor marketplace, contracts and invoices, server-side PDFs, full Arabic/English support — and much faster APIs and pages.",
      },
      useCases: [
        {
          actor: "Clients",
          items: [
            "Request services — builds, floors, sketches, designs and more",
            "Browse property opportunities",
            "Verify accounts and reset passwords with OTP",
            "Pay orders through the gateway",
          ],
        },
        {
          actor: "Sellers",
          items: ["Manage products, categories and coupons", "Handle carts and product orders from a seller dashboard"],
        },
        {
          actor: "Admin",
          items: [
            "Manage raw lands, old and residential buildings, opportunities",
            "Track renters, renter contracts and installments",
            "Manage users, roles, permissions, clients and content",
            "Generate PDF invoices, renter and opportunity details",
          ],
        },
      ],
      flow: {
        label: "THE RESCUE",
        title: "From failing to ",
        titleEm: "shipped",
        lede: "Stability first, then speed, then the features the business was waiting for.",
        steps: [
          { title: "Stabilize", text: "Fix the legacy codebase in the first month." },
          { title: "Speed up", text: "Query optimization, eager loading and caching." },
          { title: "Marketplace", text: "Multi-vendor sellers, carts, orders and coupons." },
          { title: "Documents", text: "Contracts, invoices and server-side PDFs." },
          { title: "Localize", text: "Arabic / English with RTL and LTR." },
        ],
        hot: 0,
        notes: ["−55% API time", "−50% page load", "Rate limits on login, OTP and contact"],
      },
      screenshots: [
        { src: "/images/projects/rct/dashboard.png", caption: "Admin dashboard", position: "top left" },
        { src: "/images/projects/rct/renter-management.png", caption: "Renter management", position: "top left" },
        { src: "/images/projects/rct/landing-page.png", caption: "Landing page", position: "top" },
        { src: "/images/projects/rct/join-rct.png", caption: "Join RCT", position: "top" },
      ],
      engineering: [
        { problem: "A failing legacy codebase", built: "Stabilized the whole codebase within one month before adding anything new." },
        { problem: "Slow APIs and dashboards", built: "Query optimization, eager loading and caching — 55% faster APIs, 50% faster pages." },
        { problem: "Business documents under load", built: "Server-side PDF generation with DomPDF for invoices, renters and opportunities." },
        { problem: "Many actors, one platform", built: "Spatie roles and permissions, admin middleware and Sanctum for the mobile API." },
        { problem: "Abuse on public endpoints", built: "Rate limits on login, registration, contact and OTP routes." },
      ],
      stack: ["PHP 8.1", "Laravel 10", "Sanctum", "Spatie Permission", "Spatie Translatable", "DomPDF", "Blade", "Livewire", "Bootstrap", "MySQL", "PHPUnit"],
      quote: "Server-side PDFs and query optimization become critical under load.",
      quoteSource: "ON RESCUING A LEGACY PLATFORM",
      links: [{ icon: "gh", kicker: "SOURCE · GITHUB", label: "rctApp ↗", href: `${GH}/rctApp.public` }],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "westclean",
    title: "WestClean",
    kicker: "LAUNDRY MARKETPLACE",
    type: "Service marketplace · KSA",
    summary:
      "Marketplace connecting customers, laundries and admins — role-scoped APIs, coin-based purchasing and server-side Moyasar verification.",
    tags: ["Laravel 10", "Moyasar", "Sanctum", "OTP"],
    domain: "westclean",
    image: "/images/projects/westclean/landing.png",
    imagePosition: "top",
    categories: ["marketplace", "payments"],
    caseStudy: {
      tagline: "LAUNDRY MARKETPLACE · CUSTOMER + LAUNDRY APPS",
      summary:
        "The backend and dashboards for a laundry marketplace with customer and laundry mobile apps: role-scoped APIs, OTP auth, coin-based purchasing, Moyasar payments and full Arabic/English content.",
      meta: [
        ["ROLE", "Full-Stack Developer"],
        ["ENGAGEMENT", "Freelance · client in Saudi Arabia"],
        ["APPS", "Customer · Laundry · Admin dashboard"],
        ["STACK", "Laravel 10 · Sanctum · Moyasar"],
      ],
      badge: "2 APPS · ADMIN · AR / EN",
      stats: [
        { value: "3", text: "roles, each with its own scoped API" },
        { value: "0", text: "trust in callback status — every payment re-verified server-side" },
        { value: "2", text: "ways to use coins — buy services or gift packages" },
        { value: "AR/EN", text: "translatable content plus language files" },
      ],
      overview: {
        challenge:
          "Customers, laundries and admins each needed their own experience while auth, permissions, payments and localization stayed consistent.",
        role: "Built the role-scoped API, OTP auth, the coin and package flows, Moyasar verification and the admin dashboard.",
        outcome:
          "Clear domain boundaries — admin categories vs laundry sub-services — with payments that update balances only after server-side verification.",
      },
      useCases: [
        {
          actor: "Customer",
          items: [
            "Browse service categories and find laundries in their city",
            "Buy a laundry's sub-services with coins",
            "Buy coin packages online — or gift them",
            "Track orders and wallet balance",
          ],
        },
        {
          actor: "Laundry",
          items: [
            "Create priced sub-services under admin categories",
            "Receive and manage customer orders",
            "Place supply orders",
          ],
        },
        {
          actor: "Admin",
          items: ["Manage service categories, packages, cities and supply products", "Approve laundries and send notifications"],
        },
      ],
      flow: {
        label: "MARKETPLACE FLOW",
        title: "Three roles, ",
        titleEm: "one flow",
        lede: "Admin defines what exists, laundries define what's for sale, customers buy.",
        steps: [
          { title: "Categories", text: "Admin creates the service categories." },
          { title: "Sub-services", text: "Laundries add priced items under them." },
          { title: "Discover", text: "Customers find laundries with active items." },
          { title: "Pay", text: "Coins, or Moyasar verified on the server." },
          { title: "Fulfil", text: "The laundry receives and completes the order." },
        ],
        hot: 3,
        notes: ["Role-scoped endpoints", "Previous pending package orders auto-cancelled", "Fail-fast image validation"],
      },
      screenshots: [
        { src: "/images/projects/westclean/admin-dashboard.png", caption: "Admin dashboard", position: "top" },
        { src: "/images/projects/westclean/laundry-management.png", caption: "Laundry management", position: "top" },
        { src: "/images/projects/westclean/orders-management.png", caption: "Orders management", position: "top" },
        { src: "/images/projects/westclean/landing.png", caption: "Landing page", position: "top" },
      ],
      engineering: [
        { problem: "Callbacks can lie", built: "Moyasar callbacks are verified server-side before any balance or order changes." },
        { problem: "Duplicate in-progress package purchases", built: "Previous pending or processing package orders are auto-cancelled before a new one starts." },
        { problem: "Accidental data exposure between roles", built: "API permissions separated by user type; laundry endpoints scoped to the signed-in laundry." },
        { problem: "Bad uploads", built: "Image upload validation with fail-fast behavior for sub-services." },
        { problem: "Bilingual content", built: "Spatie Translatable fields for data plus language files for the UI." },
      ],
      stack: ["Laravel 10", "PHP 8.1", "Sanctum", "Moyasar", "OTP", "Spatie Translatable", "Bootstrap 5", "jQuery", "Vite", "MySQL"],
      quote: "Never trust a payment callback's status on its own.",
      quoteSource: "ON MOYASAR VERIFICATION",
      links: [{ icon: "gh", kicker: "SOURCE · GITHUB", label: "westclean ↗", href: `${GH}/westclean.public` }],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "immersive-3d-portfolio",
    title: "Immersive 3D Portfolio",
    kicker: "CREATIVE WEB · 3D",
    type: "Creative web",
    summary: "An interactive 3D portfolio for product designer Hager Tarek — one WebGL scene that moves with the page.",
    tags: ["Next.js 16", "three.js", "R3F", "Tailwind v4"],
    domain: "hager-tarek-delta.vercel.app",
    image: "/images/immersive-3d.jpg",
    categories: ["creative"],
    caseStudy: {
      tagline: "CREATIVE WEB · WEBGL · ARABIC-READY",
      summary:
        "An immersive portfolio for a product designer. A single persistent WebGL scene sits behind the page; scrolling moves the camera between stations, and every 3D object is anchored to an HTML box so CSS layout decides where it appears.",
      meta: [
        ["ROLE", "Developer"],
        ["CLIENT", "Hager Tarek · product designer"],
        ["SURFACES", "Website · case studies"],
        ["STACK", "Next.js 16 · three.js · React Three Fiber"],
      ],
      badge: "LIVE · WEBGL · RTL READY",
      stats: [
        { value: "1", text: "persistent WebGL scene behind every page" },
        { value: "100%", text: "of pages statically prerendered" },
        { value: "0", text: "layout shift when WebGL is unavailable" },
        { value: "RTL", text: "Arabic-ready — 3D visuals mirror with the layout" },
      ],
      overview: {
        challenge: "Make a 3D portfolio that feels immersive but stays fast, accessible and easy to translate.",
        role: "Built the site — scene architecture, scroll-driven camera, content model and localization.",
        outcome: "A statically prerendered Next.js site where 3D follows the CSS layout and falls back to images gracefully.",
      },
      useCases: [
        {
          actor: "Visitor",
          items: [
            "Scroll through case studies while the camera travels between stations",
            "See 3D objects that stay aligned with the content on any screen",
            "Get static images instead of WebGL with reduced motion or no WebGL",
          ],
        },
        {
          actor: "Owner",
          items: [
            "Edit structure and images in feature data files",
            "Edit copy per language in message files",
            "Add Arabic by copying one dictionary — RTL switches on automatically",
          ],
        },
      ],
      flow: {
        label: "SCROLL → SCENE",
        title: "Layout drives ",
        titleEm: "the 3D",
        lede: "No React re-renders on scroll — the scene reads progress inside the render loop.",
        steps: [
          { title: "Scroll", text: "The page maps scroll to station progress." },
          { title: "Store", text: "Progress lives in zustand." },
          { title: "Frame", text: "useFrame reads it — no re-renders." },
          { title: "Anchor", text: "3D objects follow their HTML boxes." },
        ],
        hot: 2,
      },
      engineering: [
        { problem: "WebGL on weak devices", built: "A performance monitor lowers the pixel ratio; fewer particles on small screens." },
        { problem: "Users who avoid motion", built: "three.js loads only with WebGL and no reduced-motion preference; otherwise static images." },
        { problem: "3D drifting from the layout", built: "Each object is glued to an HTML anchor box, so CSS controls placement." },
        { problem: "Performance and security", built: "Static prerendering, WebP via next/image, security headers and a CSP." },
      ],
      stack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "three.js", "React Three Fiber", "zustand", "next/image"],
      quote: "Let the layout decide where the 3D goes.",
      quoteSource: "ON ANCHORING WEBGL TO HTML",
      links: [
        { icon: "web", kicker: "WEBSITE", label: "Visit live site ↗", href: "https://hager-tarek-delta.vercel.app" },
        { icon: "gh", kicker: "SOURCE · GITHUB", label: "hagerTarek ↗", href: `${GH}/hagerTarek` },
      ],
    },
  },
];

export const projectNo = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, "0");
export const projectHref = (p: Project) => `/work/${p.slug}`;
export const projectCount = String(projects.length).padStart(2, "0");
