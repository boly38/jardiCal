/**
 * credit: https://medium.com/@malith.dev/track-users-in-your-react-app-with-google-analytics-6364ebfcbae8
 */
import ReactGA from "react-ga";
import {JConstants} from '../core/JConstants'

  export const isGAActivated = function() {
    return (JConstants.GGA_VARIABLE in process.env);
  }

  export const initGA = function() {
    if (!isGAActivated()) {
      return;
    }
    // DEBUG // console.info("isGAActivated", process.env[JConstants.GGA_VARIABLE]);
    ReactGA.initialize(process.env[JConstants.GGA_VARIABLE]);
  }

  export const PageView = function() {
    if (!isGAActivated()) { return; }
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  /**
   * Event - Add custom tracking event.
   * @param {string} category
   * @param {string} action
   * @param {string} label
   */
  export const Event = function(category, action, label) {
    if (!isGAActivated()) { return; }
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }