---
layout: post
title: "One Bad Configuration, One Global Outage"
description: "One bad config in Google Cloud led to a worldwide outage, highlighting the need for strict validation, feature flags, and staged rollouts."
date: 2025-06-17
---

# Lessons from the June 2025 Google Cloud Incident

On [June 12, 2025](https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW), a seemingly minor misconfiguration in Google Cloud's quota system had a catastrophic global impact, resulting in a massive outage that disrupted a significant portion of the internet. The root cause? A quota policy that contained blank fields.

### What Happened

- A quota policy was pushed with blank fields.
- This triggered a null pointer crash loop inside Google's Service Control, the system that enforces API quotas and access checks.
- The invalid policy was replicated globally instead of being caught or contained.
- There was no feature flag and no staged rollout.
- Remediation retries overwhelmed the system without exponential backoff, creating a thundering herd that made recovery more difficult.

A minor oversight, exacerbated by scale and lacking safeguards, led to a global service disruption.

### The Ripple Effect

Because so many Google Cloud services rely on Service Control for basic API authentication and quota checks, the crash loop quickly blocked legitimate traffic. Applications that depended on Google’s APIs started returning sudden 503 errors, affecting both internal workloads and customer-facing services.

This had a domino effect. For example, [Cloudflare’s Workers KV storage backend, which is built on Google Cloud, became unavailable](https://blog.cloudflare.com/cloudflare-service-outage-june-12-2025/). This disrupted not only Cloudflare’s services but also the sites and APIs that depend on Cloudflare, spreading the impact far beyond Google’s platform.

In total, this single misconfiguration degraded critical services worldwide for over two hours, with lingering effects as systems slowly recovered.

### Treat Configuration as Code and Expect Failure

In distributed systems, even small mistakes can have major consequences if they go unnoticed or are hard to contain.

Configuration must be handled with the same rigor as application code. It requires version control, automated validation, safe deployment procedures, robust monitoring, and the ability to roll back immediately.

Teams should assume failures will happen and design systems to limit the damage. Every change, no matter how small, should be easy to test, quick to disable, and impossible to replicate globally if broken.

This checklist reflects core SRE and reliability engineering principles: layered validation, minimizing the blast radius, and rapid rollback are essential for building resilient systems.

### Checklist for Safe Configuration Rollouts

Before rolling out any configuration change, consider the following safeguards:

- Use feature flags to wrap new behaviors, allowing them to be disabled instantly.
- Validate configuration changes in a safe, production-like staging environment before implementing them in the live environment.
- Prevent invalid states by enforcing strong schemas, type checks, and validation when changes are ingested.
- Roll out gradually with canaries or phased deployments to catch problems early.
- Never overwrite a valid state with an invalid state. Adopt a "fail open" approach so that if a new configuration fails validation, the system preserves the last known good state.
- Limit the blast radius and do not replicate the configuration globally until it has been thoroughly tested and proven safe.
- Use exponential backoff, circuit breakers, and safe retries to avoid cascading failures.

### How This Could Have Been Prevented

Many of the checklist items above, if implemented, would have prevented this outage. In particular:

- **Feature flag:** Even if pushed, the bad policy should have been easy to disable immediately.
- **Validation:** The policy with blank fields should have failed schema checks before deployment.
- **Staged rollout:** A gradual rollout would have caught the issue before it was replicated everywhere.
- **Safe retries:** Backoff and circuit breakers would have reduced the load on an already failing system.
- **Fail open:** The system should have refused to apply the invalid policy, preserving the last known good state and preventing a global outage.
- **Monitoring:** Continuous monitoring and anomaly alerts could have detected the crash loop or surges in retries before they cascaded into a global outage.

Incidents like this also highlight the importance of clear ownership, thorough change reviews, and effective cross-team communication, particularly for shared infrastructure.

### Universal Takeaways

- Small configuration mistakes can cause global failures.
- Operational basics, such as validation, feature flags, and gradual rollouts, are essential when operating at scale.
- Systems should be designed to fail safely and locally, not catastrophically and globally.
- Resilience is not magic. It comes from sound engineering practices and careful daily operations.

Use this incident as a prompt to audit your config pipelines. How easily could a bad change slip through today?

### Final Thought

Distributed systems can quickly turn tiny mistakes into massive outages. Stay humble, validate everything, roll out carefully, and always design for safe failure.
