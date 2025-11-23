import mixpanel from 'mixpanel-browser';

let isTrackingAllowed = false;

export function startTracking() {
    try {
        mixpanel.init('af6159e7511c8ee7401aa33f6271f41d');
        isTrackingAllowed = true;
    } catch (error) { }
}

export function stopTracking() {
    try { mixpanel.reset(); }
    catch (error) { }

    isTrackingAllowed = false;
}

export function trackEvent(eventName: string, data?: Record<string, any>) {
    if (!isTrackingAllowed) return console.warn(`Tracking is disabled. Event: ${eventName}`);
    mixpanel.track(eventName, data);
}