import React, { useState, useEffect, useRef, ReactNode } from "react";

// Define types for notification dismissal actions
type DismissAction = {
  timeout?: number;
  onClose?: () => void;
  onButtonClick?: () => Promise<void>;
};

// Define props interface for NotificationCenter
interface NotificationCenterProps {
  children: ReactNode;
}

// Notification center abstraction
const NotificationCenter: React.FC<NotificationCenterProps> = ({
  children,
}) => {
  return <div className="notification-center">{children}</div>;
};

// Toast component with timer pause and resume on mouse hover
const Toast: React.FC<{ message: string; dismissActions?: DismissAction }> = ({
  message,
  dismissActions,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const isHovering = useRef<boolean>(false);

  useEffect(() => {
    if (dismissActions?.timeout) {
      timeoutRef.current = setTimeout(() => {
        if (!isHovering.current) {
          setIsVisible(false);
          if (dismissActions?.onClose) dismissActions.onClose();
        }
      }, dismissActions.timeout);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [dismissActions]);

  const handleMouseEnter = () => {
    isHovering.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    if (dismissActions?.timeout) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        if (dismissActions?.onClose) dismissActions.onClose();
      }, dismissActions.timeout);
    }
  };

  const handleButtonClick = async () => {
    setIsVisible(false);
    if (dismissActions?.onClose) dismissActions.onClose();
    if (dismissActions?.onButtonClick) await dismissActions.onButtonClick();
  };

  const handleCloseClick = () => {
    setIsVisible(false);
    if (dismissActions?.onClose) dismissActions.onClose();
  };

  return (
    <div
      className="toast"
      style={{ display: isVisible ? "block" : "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>{message}</div>
      <button onClick={handleCloseClick} className="close-button">
        X
      </button>
      <button onClick={handleButtonClick}>Dismiss</button>
    </div>
  );
};

// Modal component with timer pause and resume on mouse hover
const Modal: React.FC<{ message: string; dismissActions?: DismissAction }> = ({
  message,
  dismissActions,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const isHovering = useRef<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (dismissActions?.timeout) {
      timeoutRef.current = setTimeout(() => {
        if (!isHovering.current) {
          setIsVisible(false);
          if (dismissActions?.onClose) dismissActions.onClose();
        }
      }, dismissActions.timeout);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [dismissActions]);

  const handleMouseEnter = () => {
    isHovering.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    if (dismissActions?.timeout) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        if (dismissActions?.onClose) dismissActions.onClose();
      }, dismissActions.timeout);
    }
  };

  const handleButtonClick = async () => {
    setIsVisible(false);
    if (dismissActions?.onClose) dismissActions.onClose();
    if (dismissActions?.onButtonClick) await dismissActions.onButtonClick();
  };

  const handleCloseClick = () => {
    setIsVisible(false);
    if (dismissActions?.onClose) dismissActions.onClose();
  };

  return (
    <div
      className="modal"
      style={{ display: isVisible ? "block" : "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>{message}</div>
      <button onClick={handleCloseClick} className="close-button">
        X
      </button>
      <button onClick={handleButtonClick}>Dismiss</button>
    </div>
  );
};

// Usage:
const App: React.FC = () => {
  const handleButtonClick = async () => {
    console.log("Button clicked!");
    // Simulating an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Async operation completed!");
  };

  return (
    <NotificationCenter>
      <Toast
        message="This is a toast notification"
        dismissActions={{
          timeout: 3000,
          onButtonClick: handleButtonClick,
        }}
      />
      <Modal
        message="This is a modal notification"
        dismissActions={{
          timeout: 5000,
          onButtonClick: handleButtonClick,
        }}
      />
    </NotificationCenter>
  );
};

export default App;
