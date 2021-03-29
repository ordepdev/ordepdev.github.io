---
layout: post
title: "Being on-call"
date: 2021-03-29
---

Being on-call, why, what and how.

## **Why should you be on-call?**

I’m assuming you’re in a software development team and you write software that gets deployed into production. I’m also assuming you have paying customers, otherwise, your on-call program wouldn’t exist in the first place. If all this is true, you should be on-call, at least for the stuff you write.

### **Responsibility**

Being on-call gives a sense of responsibility and accountability for the code you deploy into production. You build it, you run it, you own it. You know that you need to be super careful with your code, otherwise, you’ll get paged at night. You don’t want it, I don’t want it as well.

### **Learning**

Incidents are the best learning platform; you have to debug your system looking for clues. You get to truly know your system while running it in production. Setting up meaningful logs and tracing provides you a way to track what your system is doing. Setting up metrics and alerts provides you a way to track how your system is performing. If you have an incident in production, you will re-evaluate these things. You’ll come up with more fine-grain logs and metrics, that will tell you even more about your system.

### **Money**

You shouldn’t be on-call *just* for money, but if you’re in a company that provides you a stipend for being on-call, it’s a win-win. At the end of the day, they pay you for writing great systems and for being responsible for them out of working hours.

## **What should you expect from being on-call?**

I’ll tell you what your organization expects from you: “can you fix it?”.

### **You shouldn’t** **just** **land there**

Even if you’re a seasoned member, you shouldn’t *just* land into an on-call rotation without experience it from others. Each system is unique and has its own traits. It takes time to pinpoint the possible root causes of an unknown system, so, at first, you should observe.

Someone has to coach you for one or more rotations. You should try to shadow on-call engineers. You’ll get familiar with a given system if you receive their own alerts, watch them looking for the root cause, and being the first to read the post-mortem.

After you get a sense of how things behave, you should be ready to start your first on-call rotation.

I call this **observe, collect, act later**.

## **How to perform during an on-call rotation?**

You need to act fast, be accurate, and communicate a lot. A lot of text, during an incident, is not a lot of text. Make yourself a favor by communicating a lot during an incident, even if it’s a *small thing*.

You shouldn’t deal with incidents alone during working hours. Everyone should be able to contribute and you must keep them posted.

You shouldn’t hide what you’re doing to solve a production incident. Everyone interested should be able to jump on a call with you. Having extra eyes looking into the problem will help you solve the issue. Additionally, you’ll get at least a free pair of eyes to review the *post-mortem. E*veryone involved in the incident should contribute to it.

Make sure you behave the same way during out of working hours incidents. It may sound creepy writing for yourself at 3AM. Once your team is up, they will thank you for keeping them posted.

## **How can you improve your performance during an on-call rotation?**

### **Weekly drills**

If you belong to an on-call rotation, you must be able to solve incidents. If you have few incidents per rotation, how do you stay up-to-date with the system? Will you be able to solve a given incident two months from now without practicing? Google calls this “Operational Underload”.

> Being on-call for a quiet system is blissful, but what happens if the system is too quiet or when SREs are not on-call often enough? An operational underload is undesirable for an SRE team. Being out of touch with production for long periods can lead to confidence issues, both in terms of overconfidence and underconfidence, while knowledge gaps are discovered only when an incident occurs.

You build confidence in your system and on your on-call rotation if you practice a lot beforehand. A great solution to build confidence in your rotation is to take part in *fire-drills*. It shouldn’t be difficult to set them in place every week to match each rotation. This way, everyone on-call can solve at least one incident per rotation.

Having weekly *fire-drills* will help you keep your *runbooks* updated. If your organization lack *runbooks, fire-drills* will get you started. Make sure you don’t skip the creation of meaningful logs and metrics after an incident or a fire drill. All this combined will boost your confidence to solve incidents after hours on your own.

### **Debugging skills**

Sometimes, your metrics and logs won’t tell everything about your system during an incident. You’ll have to debug a given service in production. Make sure you practice how to do it during the *fire-drills*, otherwise you’ll struggle a bit. Know your stack, from top to bottom, and learn how to debug things in production, you won’t regret it.

### **Writing skills**

Good communicators benefit the whole organization, during and after an incident. Make sure you communicate during the incident, frequent and clear. Use others to review your *post-mortems*. Learn from the best contributors you know. Copy their writing style and keep improving. Everyone in the organization will thank you for being an excellent writer.

Keep practicing, keep writing 🖖
