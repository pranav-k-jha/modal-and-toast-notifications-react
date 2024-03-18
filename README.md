# Notification System

## Overview

This is a notification system designed to display toast and modal notifications in a React application. The system allows any part of the app to dispatch notifications with various dismissal actions, such as automatic dismissal after a set time, manual dismissal via a button, and optional dismissal by clicking on a button that triggers a function returning a promise.

## Components

### NotificationCenter

This component serves as the main container for displaying notifications. It accepts `Toast` and `Modal` components as children.

### Toast Component

The `Toast` component displays a simple notification message with options for dismissal. It supports the following features:

- Automatic dismissal after a specified timeout.
- Pausing the dismissal timer when the mouse hovers over the notification.
- Manual dismissal by clicking the "X" button at the top right corner.
- Optional dismissal by clicking the "Dismiss" button, triggering a function returning a promise.

### Modal Component

The `Modal` component displays a modal notification message with dismissal options similar to the `Toast` component. It supports the following features:

- Automatic dismissal after a specified timeout.
- Pausing the dismissal timer when the mouse hovers over the notification.
- Manual dismissal by clicking the "X" button at the top right corner.
- Optional dismissal by clicking the "Dismiss" button, triggering a function returning a promise.
