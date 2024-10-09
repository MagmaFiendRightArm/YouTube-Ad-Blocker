// ==UserScript==
// @name         YouTube Ad Blocker
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  block ads on youtube
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

// made by mxkxkks

(function() {
    'use strict';

    // make a style element to hide all dem ads
    const style = document.createElement('style');
    style.textContent = `
        /* hide all dem ad elements */
        .ad-showing .video-ads .ytp-ad-text,
        .ad-showing .video-ads .ytp-ad-preview-text,
        .ytp-ad-overlay-container,
        .ytp-ad-message-container,
        ytd-compact-promoted-item-renderer,
        ytd-promoted-sparkles-web-renderer,
        ytd-display-ad-renderer,
        ytd-ad-slot-renderer,
        ytd-in-feed-ad-layout-renderer {
            display: none !important; /* no ads allowed, simple */
        }
    `;
    // add the style to the page to hide ads
    document.head.appendChild(style);

    // observer to keep an eye on changes on da page
    const observer = new MutationObserver(() => {
        // look for any ad poppin up
        const ad = [...document.querySelectorAll('.ad-showing')][0];
        if (ad) {
            const video = document.querySelector('video');
            // skip to the end if we see an ad
            if (video) {
                video.currentTime = video.duration; // just skip it
            }
        }

        // click that skip button if it shows up
        const skipButton = document.querySelector('.ytp-ad-skip-button');
        if (skipButton) {
            skipButton.click(); // hit that skip button
        }

        // close any overlay ads that pop up
        const adOverlay = document.querySelector('.ytp-ad-overlay-close-button');
        if (adOverlay) {
            adOverlay.click(); // close dem overlays
        }

        // remove banner ads from da page
        const adContainer = document.querySelector('ytd-banner-promo-renderer');
        if (adContainer) {
            adContainer.remove(); // get rid of dem banners
        }

        // clean up any other annoying ads we see
        const otherAds = document.querySelectorAll('ytd-promoted-sparkles-web-renderer, ytd-display-ad-renderer');
        otherAds.forEach(ad => ad.remove()); // toss out extra ads
    });

    // start watching da body for changes
    // this makes sure we catch new ads as they load
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
