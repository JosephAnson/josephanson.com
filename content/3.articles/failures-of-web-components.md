---
title: Why Web Components Might Be Setting You Up for Failure
description: Learn why web components might be setting you up for failure, and what alternatives you can use instead.
date: 2024-03-29T00:00:00.000Z
categories:
  - Web Development
  - Web Components
tags:
  - Web Components
  - Web Development
  - Failure
  - Vue
  - React
  - Angular
---

Web components are a relatively new technology that allows developers to create custom HTML elements that can be used in web pages. They were introduced as a way to make it easier to build reusable UI components, but in reality, they might be setting you up for failure.

## The Promise of Web Components\*\*

Web components were hailed as a revolutionary technology that would make it easier to build complex web applications. They promised to provide a way to create reusable UI components that could be easily composed together to build complex interfaces.

However, in reality, web components have failed to deliver on this promise. They are often difficult to use, and their limitations can make it hard to build complex applications.

## The Limitations of Web Components

One of the biggest limitations of web components is that they don't work well with all major frameworks. For example, Vue, React, and Angular have their own component models that are not compatible with web components. This means that if you want to use web components with one of these frameworks, you'll most often have problems working with them.

Additionally, web components often have accessibility issues. Because they are custom HTML elements, they can be difficult for screen readers and other accessibility tools to interpret. This means that web components can make it harder to build accessible web applications.

## Working with the Shadow DOM

Another challenge of working with web components is the Shadow DOM. The Shadow DOM is a separate DOM tree that is used to render the content of a web component. While it provides a way to encapsulate the component's content and styles, it can also make it difficult to work with the component's DOM.

For example, if you want to access an element inside a web component, you'll need to use the shadowRoot property to access the Shadow DOM. This can make it harder to work with the component's DOM, especially if you're used to working with the regular DOM.

## The Lack of State Management

Another major limitation of web components is that most web component frameworks don't offer state management. This means that you'll need to use another framework, such as Vue, React, or Angular, to manage the state of your application. This can add complexity to your code and make it harder to maintain.

## Server-Side Rendering

Another limitation of web components is that they don't work well with server-side rendering (SSR). SSR is a technique that allows you to render your web application on the server, rather than on the client. This can improve the performance and SEO of your application.

However, web components are not designed to work with SSR. They are meant to be used on the client-side, and they don't provide a way to render the component on the server. This means that if you want to use SSR with web components, you'll have to use a workaround or a third-party library.

## The Complexity of Web Components

Most companies that are using custom Web Components often don't create them to a high enough standard to avoid creating issues for other teams when they consume the created web components. Often you need a team of highly skilled developers to create well designed web components, which often isn't the case when starting out and working with newer technologies.

## What Others Are Saying

Many developers and industry experts have expressed similar concerns about web components. Here are a few examples:

- **"Why I don't use web components"** by Rich Harris (2019) - [Read more](https://dev.to/richharris/why-i-don-t-use-web-components-2cia)
- **"Maybe Web Components are not the Future?"** by Ryan Carniato (2020) - [Read more](https://dev.to/ryansolid/maybe-web-components-are-not-the-future-hfh)

## The Vue Documentation

The Vue documentation also provides some guidance on using web components with Vue. According to the documentation, "Some developers believe that framework-proprietary component models should be avoided, and that exclusively using Custom Elements makes an application "future-proof". Here we will try to explain why we believe that this is an overly simplistic take on the problem." [Read more](https://vuejs.org/guide/extras/web-components#web-components-vs-vue-components)

## The Better Alternative

So, what's the better alternative to web components? In many cases, the answer is to use existing technologies, such as Vue, React, or Angular, to build complex web applications.

These technologies have been around for longer, and they have a more established ecosystem of tools and libraries. They are also often easier to learn and use than web components.

### Conclusion

In conclusion, web components might be setting you up for failure. They are a complex technology that can add complexity to your code, make it harder to debug, and introduce new security risks. They also don't work well with all major frameworks, have accessibility issues, and lack state management.

Instead of using web components, consider using existing technologies, such as Vue, React, or Angular, to build complex web applications. These technologies have a more established ecosystem of tools and libraries, and they are often easier to learn and use than web components.
