---
layout: post
title:  "Handling multi module releases"
date:   2017-06-06
---

I'll start with an example of a `pom.xml` at the root of a multi module project.
Somewhere at our file we'll have to define our modules and it should like this:

```xml
<artifactId>sample</artifactId>
<version>1.0.0-SNAPSHOT</version>

<modules>
  <module>sample-mdw</module>
  <module>sample-broker</module>
  <module>sample-ws</module>
</modules>
```

In a real world scenario modules depend each other right? So we have to declare those dependencies on each module `pom.xml` file.
For the sake of simplicity, let's assume that only `sample-ws` depends on `sample-broker` and `sample-mdw`:

```xml
<artifactId>sample-ws</artifactId>
<version>1.0.0-SNAPSHOT</version>

<sample-broker.version>1.0.0-SNAPSHOT</sample-broker.version>
<sample-mdw.version>1.0.0-SNAPSHOT</sample-mdw.version>
```

At this point we're ready to release our `sample` project.

## Naive approach
(I'm assuming that you release all modules with the same version. If not, you should. Really!)

* Bump `sample` version to `1.0.0`
* Bump `sample-mdw` version `1.0.0`
* Bump `sample-broker` version `1.0.0`
* Bump `sample-ws` version `1.0.0`

And we still need to bump the dependencies versions:

* Bump `<sample-broker.version>` to `1.0.0`
* Bump `<sample-mdw.version>` to `1.0.0`

The example above is just a small sample project and these steps are already very annoying and completely ruins my trust in my own release management.
Can I be able to release this project right away? Yes, I think so. At least with this level of complexity.

If we add more modules like `sample-db`, `sample-catalog`, `sample-sdk` and more projects like `sample-1`, 
`sample-2` and so on our complexity grows and the chance of missing some step is huge.

(let's keep the process)

After set all modules version to `1.0.0` we need to tag our commit:
(I'll skip the branch, commit and merge for now)

```bash
$ git tag sample-v1.0.0
```

Our release is ready, let's bump all modules version back to SNAPSHOT:
* Bump `sample` version to `1.0.1-SNAPSHOT`
* Bump `sample-mdw` version `1.0.1-SNAPSHOT`
* Bump `sample-broker` version `1.0.1-SNAPSHOT`
* Bump `sample-ws` version `1.0.1-SNAPSHOT`
* Bump `<sample-broker.version>` to `1.0.1-SNAPSHOT`
* Bump `<sample-mdw.version>` to `1.0.1-SNAPSHOT`

```bash
$ git push && git push --tags
```

And we're done.

### What's wrong?

I'll go straight to the point here. Don't do this. Why? - you say.

* Time consuming - try to do this with 5 projects with 5 modules each; measure the time and take your own conclusions
* Error prone - it's very easy to miss a few steps and you'll iterate until `mvn clean install` succeeds
* Lack of conformity - 5pm; small fix on sample-mdw; argh, not doing all of these steps; *bumps sample-mdw version to 1.0.1*; our rule of having a unique version for all modules is gone.

Just don't.

## Automated approach

Include the `maven-release-plugin` in your project `pom.xml` and it should be like this:

```xml
<artifactId>sample</artifactId>
<version>1.0.0-SNAPSHOT</version>

<modules>
  <module>sample-mdw</module>
  <module>sample-broker</module>
  <module>sample-ws</module>
</modules>

<scm>
  <url>https://github.com/path/to/sample</url>
</scm>

<properties>
  <maven-release-plugin.version>2.5.3</maven-release-plugin.version>
</properties>

<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-release-plugin</artifactId>
  <version>${maven-release-plugin.version}</version>
  <configuration>
    <autoVersionSubmodules>true</autoVersionSubmodules>
    <pushChanges>false</pushChanges>
    <localCheckout>true</localCheckout>
    <tagNameFormat>${project.artifact}-v@{project.version}</tagNameFormat>
  </configuration>
</plugin>
```

Make sure you have a clean working directory and create a release branch:
```
$ git checkout -b release/v1.0.0
```

Using the `maven-release-plugin` will perform five steps with just one command:

* Bump all versions to 1.0.0, including dependencies
* Commit changes
* Tag last commit with `sample-v1.0.0`
* Bump all versions to 1.0.1-SNAPSHOT, including dependencies
* Commit changes

```bash
$ mvn --batch-mode release:prepare release:perform \
       -DreleaseVersion=1.0.0 -DdevelopmentVersion=1.0.1-SNAPSHOT`
```

Our git history should be something like:

```bash
$ git log --pretty=oneline
ca82a6dff817ec66f44342007202690a93763949 [maven-release-plugin] prepare for next development iteration
085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7 [maven-release-plugin] prepare release sample-v1.0.0
```

Now we just have to merge `release/v1.0.0` both commits into `development`:

```bash
$ git checkout development
$ git merge --no-ff -m "v1.0.1-SNAPSHOT" release/v1.0.0
```

And only the tagged commit into `master`:
```bash
$ git checkout master
$ git merge --no-ff -m "v1.0.0" release/v1.0.0~1
```

We delete the release branch:

```bash
$ git branch -d release/v1.0.0
```

Finally, push all changes:

```bash
$ git push --all && git push --tags
```

Again, try to do this with 5 projects with 5 modules each, measure the time and take your own conclusions.

## TL;DR;

Always aim to automation, always.

http://maven.apache.org/maven-release/maven-release-plugin
