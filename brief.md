# First Playable Web Game Brief

> This summary and the accompanying system graph are the two primary development references. Build from both. If they conflict, preserve the learning goal and ask the student before changing the core design.

## 1. Project Identity
- Student / Team: Solo designer
- Project Title: One Line, Two Ways: Shanghai Metro Branch Routes
- Domain: Navigating Shanghai Metro branch routes and checking which Line 10 train reaches the destination
- Tool / AI Agent: ChatGPT Codex; prototype target: Unity 6.3

## 2. Design Summary
**Domain and real experience:** Learning to navigate Shanghai Metro routes when one line has multiple branch paths, especially checking which train will reach the station I need.

I was taking the Shanghai Metro to the Burger Festival on the west side of Shanghai. On Line 10, I did not realize the same line had two different route paths. I boarded the wrong path and spent about two hours going back and forth. The trigger was trying to reach the festival; the tension was choosing between routes I did not understand; the peak was realizing the wrong choice had cost me so much time.

**Novice misconception:** The common misunderstanding is that every train with the same line number follows the same route and reaches every station on that line.

**Most important domain challenge:** The main challenge is incomplete or easy-to-miss route information under time pressure: two trains can share a line number but follow different paths, and a wrong choice can cost a lot of time.

Beginners often board the first arriving train based on its line number without checking the destination or branch shown on the train and platform signs.

**Core learning shift:** The learning shift is from trusting the line number alone to checking the train's destination and branch path, then adapting the route when new information appears.

## 3. Core Player Learning Loop
**Observe:** The player observes their destination, the metro map, platform direction, train destination or terminal, next-stop signs, service alerts, transfer points, and remaining time.

**Judge:** The player judges whether the arriving train follows the branch that serves the destination, whether the route is still reliable, and whether waiting or transferring is the better use of time.

**Act:** The player can inspect the map and signs, wait for a different train, board, get off at a station, transfer, return along the route, or choose an alternate path.

**Read feedback:** The map highlights the train's actual branch after boarding; station and train displays show direction and next stops; the estimated arrival time changes when the route adds a detour.

**Adjust:** If the route begins to diverge from the destination, the player can check the next stop and map, get off at a useful station, and transfer or return before losing more time.

**Ability improved through repetition:** After repeating the loop, the player gets better at verifying branch and destination information before boarding and recovering efficiently when a route changes.

## 4. Data Model for the System Graph

### Environment Data
- Destination: Burger Festival on the west side of Shanghai.
- Time limit / target arrival time.
- Shanghai Metro Line 10 branch map and each branch's terminal / station sequence.
- Train arrival times, delays or closures.
- Platform direction signs and available transfer stations.

### Player-Controlled Data
- Inspect the route map, train destination, terminal, platform direction, and next stops.
- Choose a branch and train.
- Wait, board, exit, transfer, turn back, or select an alternate route.

### System-Calculated Results
- Branch match: whether the selected train reaches the destination branch.
- Waiting time and estimated arrival time.
- Detour minutes and route distance / stations remaining.
- Transfer count and remaining deadline time.
- Trip result: arrived on time, arrived late, or did not arrive before the deadline.

### Feedback Translation
- Train terminal sign → identifies the train's branch before boarding.
- Highlighted route map → shows the path the selected train will follow.
- Next-stop display or announcement → confirms direction while riding.
- Route line diverges from the destination and ETA increases → signals a wrong branch or disruption and prompts rerouting.

## 5. Challenge Space
**Challenge factors (affecting player-controlled data):** Train choice and branch pattern affect route match and ETA. Train frequency affects waiting time. A closure or delay affects which routes are available and how long they take. The destination and junction layout determine which branch is correct. The deadline changes how much time the player can spend checking or transferring.

**Factors that force a new judgment:** A split branch on the same numbered line requires checking the terminal instead of trusting the number. A delay or closure requires comparing alternate routes. A tight deadline changes the trade-off between waiting for a direct train and transferring.

**Perceivable vs inferred factors:** Directly visible: line number, terminal, branch map, platform direction, next stop, and service alerts. Learned gradually: which branch serves the destination, whether an alternate transfer is worthwhile, and how much time a route change will add.

**Challenge dimension table:** Branch information: one obvious route is easy; two paths on the same line number are hard and require checking terminal and stops. Service: normal service is easy; a delay or closure is harder and requires rerouting. Time: a generous deadline is easy; a short deadline adds pressure to balance checking and acting.

**2-3 progressive challenge combinations:** 1. Read the Terminal: two Line 10 trains arrive; the player compares terminal signs and chooses the one serving the destination. Trains the habit of checking direction. 2. Same Number, Split Path: the route branches after boarding; the player uses the map and next-stop display to confirm the path and correct a mismatch. Trains route reading and recovery. 3. Festival Rush: one branch is delayed and the deadline is close; the player compares waiting with a transfer. Trains weighing reliability, time, and transfers.

**Simple-to-complex sequence:** Yes. Start with a clear destination sign and one simple branch choice, then introduce two paths sharing the same line number, then add a delay and a deadline so the player must combine route reading with time management.

**What failure teaches next:** Yes. After a wrong-branch choice, the map shows where the train diverged and how many minutes were added. The next-stop display and terminal remain available, so the player can infer what to check and decide where to transfer or turn back.

## 6. Visual & Camera
**Camera perspective:** Use a top-down perspective centered on a simplified metro map, with a small platform view or train panel when the player checks a train.

**Why this perspective fits the learning shift:** A top-down map makes the branching paths, transfers, and distance from the destination visible at once. That directly supports the learning shift: compare the full route before boarding and notice when the chosen path diverges.

**2D / 2.5D / 3D:** 2D. A clear map-and-platform interface is enough to teach route judgment and keeps attention on branch paths, signs, and time rather than 3D movement.

**Visual style:** Use a clean, stylized transit-map look with readable station names, distinct branch colors, simple train and platform icons, and a few festival details at the destination. Keep it inspired by city wayfinding rather than copying official branding.

**Color tone:** Use a bright, high-contrast interface with cool blue and teal route colors. Use warm amber for alerts and the festival destination so important changes stand out without making the whole trip feel alarming.

**Sound:** Use a short station chime, train-arrival tone, gentle rail ambience, and a soft alert when the route changes; keep announcements captioned. Music can be a light, rhythmic city pulse that becomes slightly more urgent near the deadline and relaxes when the player finds a workable route.

## 7. AI Collaboration Boundary
**Student-owned decisions (AI must not change):** I keep the Shanghai Metro branch-route domain, the real Line 10 experience, the learning shift from trusting the number to checking the destination and branch, the core observe-check-choose-adjust loop, the goal and failure conditions, the key variables, and the three challenge sequence.

**AI-autonomous decisions:** The AI may choose the code structure, map layout details, icons, animations, typography, and implementation of visual and sound feedback. It may polish the interface and tune timings as long as it preserves the route-reading mechanic and learning goal.

**How to detect and pull back a generic game:** I would notice drift if the game became only a race against a clock or a generic train-avoiding game, with no need to compare branches or interpret signs. I would pull it back by requiring every challenge to use destination, terminal, branch, or next-stop information and by keeping the map and route-change feedback central.

## 8. Rules, Boundaries, and Outcomes
**Important states:** Useful states include correct-branch / wrong-branch, train approaching / departed, route clear / disrupted, station open / closed, and player has checked / has not checked the destination.

**How player actions change the system:** Checking signs reveals route information. Waiting changes the available train and time. Boarding commits the player to a path. Exiting or transferring changes the route, transfer count, and estimated arrival time.

**Success condition:** The player succeeds by reaching the festival destination before the chosen deadline, either by selecting the right branch initially or by noticing a mismatch and recovering with time left.

**Failure conditions:** The player fails the challenge if the deadline passes before arrival or if repeated unverified choices consume the available time. Let the player retry and explain which route cue could have helped.

**Just-right ranges and thresholds:** There is a just-right balance between a fast route and a reliable route. Waiting briefly for a confirmed train can be better than boarding immediately; making too many unnecessary transfers can also waste time.

## 9. Feedback Priorities
**Immediate feedback:** Show the train's terminal, direction, and branch path immediately on the platform and before boarding, so the player can check the decision in time.

**Feedback discovered over time:** Let the player discover how the same line divides into different branch paths by comparing the full map, terminal names, and upcoming stops across a few trips. Do not hide critical safety or route information; make the learning come from noticing patterns.

**Feedback that must be visual, spatial, audible, or state-based:** Do not communicate route mismatch only as a score. Show the train moving along the wrong branch, highlight the destination getting farther away, update the ETA, and use a distinct announcement or sound cue with captions.

## 10. First Playable Version Scope
- Build a small desktop-browser game that validates one complete observe → judge → act → feedback → adjust loop.
- Use the accompanying system graph to implement 2-3 challenge presets when they are clearly defined. Each challenge should change system variables or relationships, not only visual decoration.
- Keep graphics simple and readable. Prioritize interaction, feedback, and learning over polish.
- Do not add realistic simulation, complex menus, accounts, online multiplayer, large asset pipelines, or unrelated features in the first version.
- Do not convert the project into a generic mini-game that only uses the domain as a theme.

## 11. Web Game Technical Dependencies and GitHub Pages

This project is published as a GitHub Pages site. The published site IS the exhibition. There is no ZIP packaging step and no separate offline build.

### GitHub Pages Publishing Rules
- The site is served from the repository root on the `main` branch, at `https://<username>.github.io/<repository-name>/`.
- Because GitHub Pages serves the site from a subpath, **every internal link and every asset path must be relative**. Root-absolute paths beginning with `/` will break on the published site even when they work locally.
- Store all required models, textures, audio, fonts, and libraries inside the repository. Do not load them from a CDN or another remote service.
- The repository is public. Never commit passwords, tokens, API keys, or personal information the student has not agreed to publish.
- After every push, the site republishes automatically. Verify the live URL, not only the local server.

### Choose the Lowest Necessary Dependency Track
1. **Track A - No build step:** Prefer HTML, CSS, plain JavaScript, and Canvas 2D for simple 2D games. This is the default choice and needs no extra configuration.
2. **Track B - Local vendored library:** For one small browser library, pin its version and store it under `assets/vendor/`.
3. **Track C - npm + build tool:** Use npm and Vite only for Three.js, multiple ES Modules, loaders, or other complex dependency graphs.

### Three.js and Vite Rules
- Three.js is allowed when 3D is important to the designed experience; do not replace meaningful 3D interaction only to avoid npm.
- Pin dependency versions in `package.json` and preserve `package-lock.json`.
- Configure Vite with a relative base such as `base: './'` so built assets work under the Pages subpath.
- Run `npm run build`, then copy the verified static output into the repository root so GitHub Pages serves it.
- Add a `.gitignore` that excludes `node_modules`. Never commit `node_modules`.
- Record dependency names, exact versions, licenses, build command, and output directory in `README.md`.

### Expected Repository Structure
```text
repository/
├── index.html                 # Project home: designer statement, system graph, play link
├── game.html                  # Playable game (or game/index.html)
├── process.html               # Human-AI development timeline
├── assets/                    # JS/CSS, system graph image, models, textures, audio, fonts
├── development-log/
│   └── agent-development-log.md
├── brief.md                   # This design and development specification
├── system-graph.png
├── ratings.csv                # Exported question-clarity ratings (teaching feedback)
├── README.md                  # How to run, controls, dependency track, main variables
└── source/                    # Track C only: src/, package.json, package-lock.json
```

## 12. Integrated Project Website Requirements
The website is the project space, not a final report and not a separate marketing page. It must exist from the first milestone and stay current as development progresses.

### Website From Day One
- Create the first version of `index.html` in the same pass as the first playable demo. Do not defer the website to the end of the project.
- The website is the exhibition surface: classmates and visitors will read it before or instead of playing, so it carries the designer statement, the system graph, and the play link.
- When the design changes, the website changes with it. A website that describes an older version of the game is worse than no website.

### Required Website Content
- **Game Idea:** project title, short concept, player goal, and core learning shift.
- **Domain Knowledge:** explain the real-world domain, novice misconception, expert judgment, and why this knowledge becomes playable.
- **System Design:** show the system graph and summarize environment data, player-controlled data, calculated results, feedback, success, failure, and challenge presets.
- **Development Process:** present a concise chronological timeline based on `agent-development-log.md`, including important changes, failures, tests, student decisions, and AI influence.
- **Play the Game:** the current playable version must be accessible from clear navigation and run directly in the website.

### Website Update Rules
- Create clear navigation among Home, Domain Knowledge / System Design, Development Process, and Play Game.
- Use only information supported by this brief, the system graph, the actual game, and the development log. Do not invent a smoother or more complete process.
- After every meaningful milestone, update the relevant website content and the development timeline.
- Keep the game idea and domain-learning explanation readable by classmates who have not seen the project before.
- Keep styling coherent across the informational pages and playable game, but prioritize clarity and function over decorative effects.
- Make the website usable on a typical student laptop. Mobile support is helpful but is not the first-version priority.
- Use relative links and asset paths. GitHub Pages serves the site from `https://<username>.github.io/<repository-name>/`, so root-absolute paths beginning with `/` will fail.
- Support a clean 1920×1080 exhibition view for display on an iMac. Important controls and text must fit without overlap.

## 13. Automatic Human-AI Development Log Protocol
In addition to building the website and game, maintain one Markdown file named `agent-development-log.md`. This file documents how the project develops through human-AI collaboration.

### Initialize the Log
At the beginning of development, create the file with:

```markdown
# Agent Development Log

- Project Title: One Line, Two Ways: Shanghai Metro Branch Routes
- Student / Team: Solo designer
- Domain: Navigating Shanghai Metro branch routes and checking which Line 10 train reaches the destination
- Core Learning Shift: The learning shift is from trusting the line number alone to checking the train's destination and branch path, then adapting the route when new information appears.
- Current Game Idea: I was taking the Shanghai Metro to the Burger Festival on the west side of Shanghai. On Line 10, I did not realize the same line had two different route paths. I boarded the wrong path and spent about two hours going back and forth. The trigger was trying to reach the festival; the tension was choosing between routes I did not understand; the peak was realizing the wrong choice had cost me so much time.
- AI Agent Used: ChatGPT Codex; prototype target: Unity 6.3
- System Graph: add the image file or Canva link when available
- Development Period: add start and end dates
```

### Two Entry Types in One Timeline
Keep Raw Interaction Logs and Stage Reflections in chronological order in the same file. Do not separate them into two large sections.

#### A. Raw Interaction Log — Create Automatically
After every meaningful development interaction, append a short factual entry. A meaningful interaction includes implementation, debugging, code explanation that changes the project, mechanic or level changes, visual or audio changes, website updates, playtesting, or an AI suggestion that affects direction. Do not log casual clarification that produces no development change.

Use this format:

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## Interaction 01 — Raw Interaction Log

**Time:**
**Development Stage:**
**Current Goal:**

### Student Request
What the student asked the AI Agent to do.

### Agent Response Summary
What the Agent suggested, generated, explained, or changed.

### Development Action
What was actually implemented, modified, tested, or removed.

### Website Update
Which website section changed, or why no website update was needed.

### Files / Systems Changed
List files, mechanics, assets, data, UI, or challenge settings changed.

### Test and Immediate Result
What was tested and whether it worked, failed, partially worked, or remains uncertain.

### Student Decision / Follow-up
What the student accepted, rejected, modified, did not understand, or decided to try next.
```

#### B. Stage Reflection — Prompt the Student at Milestones
Do not fabricate student reflection. At a meaningful milestone—such as finishing the first playable loop, changing design direction, completing a challenge, or finishing a playtest stage—create a Reflection entry with factual fields, then explicitly ask the student to answer the Required Student Reflection.

Use this format:

```markdown
════════════════════════════════════
## Reflection 01 — Stage Reflection

**Time:**
**Covered Interactions:** Interaction 01–04
**Development Stage:**

### Goal of This Stage
### What Changed in the Playable Game and Website
### How AI Helped
### Student Decisions
### AI Influence on Design Direction
### Relationship to the Core Learning Shift
### Problems / Open Questions
### Next Step

### Required Student Reflection
Does the current game still help the player experience the intended domain-learning shift? What became stronger, weaker, or different? Which AI suggestion did you accept, reject, or change, and why?

> The AI Agent must ask the student to answer this section and must not answer it for them.
```

### Logging Rules
- Append new entries to the end of `agent-development-log.md` and continue Interaction and Reflection numbering.
- Be honest and specific. Record failures, partial results, misunderstandings, abandoned directions, and unresolved questions.
- Record when AI introduces a design direction, when the student rejects or modifies it, and when the student accepts code without fully understanding it.
- Separate factual development events from student reflection. Never invent student opinions or decisions.
- After milestone reflections, update the Development Process section of the website with a concise, truthful timeline summary.

## 14. GitHub Pages Exhibition

The exhibition is the published Pages site. No archive is packaged and nothing is uploaded to a shared drive.

### Enable GitHub Pages
1. Open the repository on GitHub.
2. `Settings` -> `Pages`.
3. Under Build and deployment, set Source to `Deploy from a branch`.
4. Branch: `main`, Folder: `/ (root)`. Save.
5. Wait a few minutes, then open `https://<username>.github.io/<repository-name>/`.

Every later push to `main` republishes the site automatically.

### Pre-Publish Audit
- Run the project through a local static HTTP server and test every navigation link, the playable game, controls, challenge selection, success, failure, and restart.
- Confirm every internal link and asset path is relative. Root-absolute paths are the most common cause of a Pages site that loads but shows nothing.
- Test the layout at 1920x1080 for exhibition display; text, controls, canvas, and navigation must not overlap.
- Confirm `node_modules`, caches, temporary files, passwords, tokens, and API keys are not committed.
- Push, then open the live Pages URL and repeat the navigation and gameplay test.

### What the Student Submits
- The GitHub Pages URL: the playable exhibition link.
- The repository URL.
- Nothing else. The repository is already public, so there is no upload step.

### Public Display
- The repository and the published site are public, because GitHub Pages requires a public repository on the free plan.
- Anything the student does not want published simply stays out of the repository.
- The student must confirm before publishing that `brief.md`, `ratings.csv`, and `development-log/agent-development-log.md` may be publicly visible.

## 15. Instructions for the AI Agent

1. **Index the workspace before planning anything.** List every file in the project folder, then read `brief.md` and `system-graph.png`. Report what you found: which files exist, what the brief specifies, and what is missing or contradictory. Do not write code before this step.
2. Restate the core learning shift, core loop, main variables, feedback mappings, and challenge presets in a short implementation plan.
3. Identify missing or contradictory information. Ask only questions that block the first playable version.
4. Propose the repository structure, then create the website skeleton (`index.html`, `game.html`, `process.html`, `assets/`) and initialize `development-log/agent-development-log.md`.
5. Implement the smallest complete game loop first, then add the defined challenge presets.
6. Keep variable names clear, and keep environment data, player-controlled data, and calculated results visibly separated in the code.
7. Add short comments only where a high-school student needs help understanding a rule.
8. **The first milestone must ship the playable demo and the first version of `index.html` together.** Never let the website fall behind the game, and never leave the site to the end of the project.
9. Start a local static server, test navigation and gameplay, and give the student the local URL and simple controls.
10. Automatically append a Raw Interaction Log after meaningful development work, and request student reflection at milestones.
11. After every milestone, update the website so its Development Process page matches the actual log.
12. Before the exhibition, run the pre-publish audit and confirm the live GitHub Pages URL works.

## 16. Acceptance Checklist
- [ ] The player can take a meaningful action within 30 seconds.
- [ ] Player actions visibly change system data or state.
- [ ] Important invisible data is translated into readable feedback.
- [ ] Success and failure conditions work and can be understood.
- [ ] A second attempt can improve because the player learned from feedback.
- [ ] Challenge presets differ through variables, relationships, information, or constraints.
- [ ] The game runs in a browser without a complex installation process.
- [ ] README.md identifies the dependency track and explains how to run, the controls, and the main variables.
- [ ] `index.html` existed from the first milestone and was kept current, not added at the end.
- [ ] The site clearly presents the game idea, domain knowledge, system design, development process, and playable game.
- [ ] `development-log/agent-development-log.md` contains chronological Interaction and Reflection entries.
- [ ] The Development Process page matches the actual log and does not hide failures or unfinished work.
- [ ] All internal links and assets use relative paths, because Pages serves from a subpath.
- [ ] The published GitHub Pages URL has been opened and tested at 1920x1080.
- [ ] No passwords, API keys, tokens, or `node_modules` are committed.
- [ ] The student has confirmed the brief, ratings, and development log may be publicly visible.
