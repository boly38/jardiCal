/**
 * credit: https://medium.com/@malith.dev/track-users-in-your-react-app-with-google-analytics-6364ebfcbae8
 */
import ReactGA from "react-ga";

export const initGA = (trackingID) => {
   ReactGA.initialize(trackingID);
}

export const PageView = () => {
    ReactGA.pageview(window.location.pathname +
                     window.location.search);
}

/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const Event = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};