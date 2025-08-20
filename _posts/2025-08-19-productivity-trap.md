---
layout: post
title: "More People ≠ Faster Delivery"
description: "Adding more developers rarely speeds up a project. Sequential work, dependencies, and coordination overhead set hard limits on how fast software can really be delivered."
date: 2025-08-20
---

You’ve been there. A critical project is falling behind, and the most intuitive solution comes to mind: *“Let’s add more developers to speed things up!”* It seems like simple math: double the people, halve the time, right?  

But this rarely works. More often than not, the team grows, costs rise, yet the delivery date barely shifts. That’s not a sign of a bad team. It’s a collision with a fundamental principle: **Amdahl’s Law.**  

---

## The Core Principle: Amdahl’s Law

Amdahl’s Law states that the maximum speedup of any task is limited by its **sequential part**, the portion of work that can’t be parallelized.  

Software development fits this analogy perfectly. Every project involves sequential work, like planning the architecture, integrating all the pieces, and running the deployment pipeline, which must happen in a specific order. Some tasks can be done in parallel, but not everything can be split up. It’s normal for certain steps to depend on the completion of others.

Take a 100-hour project, where 20 hours of work are sequential and 80 hours can be parallelized:  
- **1 Developer:** 20 hours (seq) + 80 hours (par) = 100 hours  
- **8 Developers:** 20 hours (seq) + 80/8 hours (par) = 30 hours  
- **100 Developers:** 20 hours (seq) + ~0 hours (par) = ~20 hours  

![amdahl-time](/assets/images/amdahl-time.png)
![amdahl-speed](/assets/images/amdahl-speed.png)

The insight from Amdahl’s Law is clear. No matter how many developers you add, you *can’t* complete the project faster than its sequential parts. The initial gains are huge, but they quickly flatten into a plateau. That plateau is the **hard limit** set by sequential work.  

---

## Sequential Work Isn’t the Enemy  

It’s easy to overlook, but some work simply has to happen in order.

One developer often needs to lay down **core data models**, **API contracts**, or **service modules** before others can build on them. High-risk refactoring in shared files is usually faster and safer when done **sequentially**. Even features that seem simple can contain **logical flows** where one task depends on the completion of another.

These sequential dependencies, whether across the project or within a feature, are what protect the **integrity of the work.** Ignoring them is how teams stumble into *merge hell*, constant rework, and painful integration bugs.  

---

## Beyond Amdahl’s Law: Why Reality is Even Harsher  

Amdahl gives us the optimistic, theoretical limit. In practice, two other principles show why we don’t even reach that limit.  

**Brooks’s Law** is the first. Famously phrased as *“adding manpower to a late project makes it later,”* it points out that bringing in more people creates more communication paths, more onboarding, and more coordination overhead. This **coordination tax** actively slows teams down.  

The **Universal Scalability Law (USL)** goes further. It extends Amdahl’s Law with real-world penalties for this coordination overhead. According to USL, after a certain point, adding people not only fails to help but can make things worse. Productivity begins to drop under the weight of the team itself.  

Together, these three laws tell the whole story. Amdahl sets the theoretical speed limit, while Brooks and USL explain the real-world friction that makes it so hard to reach.  

---

## Working With the Law  

If adding people isn’t the answer, what is?  

**Identify the critical path:** Map out dependencies before building a new feature. The longest sequential chain defines the true minimum time to deliver, allowing the team to plan the entire parallel work around it.  

**Set realistic expectations:** Use the 100-hour breakdown to explain why doubling team size won’t halve delivery time, and shift the conversation from *team speed* to *project structure.*  

**Manage the human factors:** Keep teams small and autonomous to reduce coordination tax. If the output drops after adding more people, you may have passed **peak efficiency**, and it’s time to rethink structure, not size.  

---

## The Real Speed Boost  

The next time a project is late, resist the urge to throw more people at it. Instead, look for the **sequential bottlenecks**, the one-at-a-time work that’s holding everyone back. If you can fix that, you’ll unlock a speedup *no amount of hiring could ever buy.*  
