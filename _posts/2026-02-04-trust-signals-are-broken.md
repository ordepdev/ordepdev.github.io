---
layout: post
title: "Trust signals are broken"
description: "AI makes code cheap to produce and expensive to trust. When polish no longer implies understanding, verification becomes the only reliable signal."
date: 2026-02-04
---

People ask: “How did you verify code worked before AI?” My answer is boring: the same way I do now.

AI in the editor doesn’t change fundamentals. If anything, it makes them more important. **AI is compression of time, not replacement of expertise.** It helps you move faster where you already understand the problem; it doesn’t remove the need to understand what you’re shipping.

The failure mode I see more often now isn’t wrong code. It’s **correct code built on a wrong assumption**. I recently approved a change that was mostly written by AI. It looked excellent: clean structure, clear documentation (including ADRs), and more tests than anyone would write by hand. It still broke pre-prod. The code passed its tests, but the assumption underneath was wrong. AI didn’t just make the mistake faster; it made it with better documentation, better tests, and a confident tone. It looked trustworthy by our usual standards. It produced what *felt* like proof-of-thought. But it wasn’t.

Before LLMs, it was rare to see a polished patch in a domain the author barely understood. Writing code took enough effort that polish implied work, and work implied understanding. **That implication no longer holds.** Today, it’s easy to produce code that looks correct, well tested, and well documented in areas you don’t fully understand. Code quality, structure, and test coverage no longer tell you whether someone understands the domain, knows the edge cases, or can debug the system when it fails. That burden moves to reviewers, who now have to reconstruct the mental model and validate the assumptions themselves. You can’t rely on the usual signals anymore.

The problem isn’t that AI writes bad code. It’s that it writes **convincing** code without owning the assumptions.

We used to get proof-of-thought for free because producing a patch took real effort. Now that writing code is cheap, **verification becomes the real proof-of-work**. I mean proof of work in the original sense: effort that leaves a trail: careful reviews, assumption checks, simulations, stress tests, design notes, postmortems. That trail is hard to fake. In a world where AI says anything with confidence and the tone never changes, **skepticism becomes the scarce resource**.

Being obsessed with verification mostly means slowing down where it matters: reading code slowly enough to build a real mental model, reasoning in invariants and failure modes, and adding multiple layers of validation when mistakes would be costly.

My stance (for now) is simple: assume AI will effortlessly produce plausible garbage; treat AI-assisted changes as untrusted until proven safe; let verification, not polish, be the main signal of trust; slow down around assumptions and interfaces so you can move faster everywhere else.

We’re not going back to a pre-AI world. But we don’t have to outsource the one thing that still makes us engineers: the willingness to say *“I don’t trust this yet”* and do the work to prove it’s right.
