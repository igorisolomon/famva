'use client';

import { useEffect } from 'react';
import * as CookieConsent from "vanilla-cookieconsent";

import 'vanilla-cookieconsent/dist/cookieconsent.css';

// Custom styles for cookie consent
import '@/styles/consent-cookies.css';

export function CookieConsentProvider() {
  useEffect(() => {
    CookieConsent.run({
      // GUI options
      guiOptions: {
        consentModal: {
          layout: 'box inline',
          position: 'bottom left',
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: true,
          flipButtons: false,
        }
      },

      // Cookie settings - control when banner appears again
      cookie: {
        name: 'pinavel_cookie_consent',
        expiresAfterDays: 182, // 6 months
        sameSite: 'Lax'
      },

      // Categories and services
      categories: {
        necessary: {
          enabled: true,  // this category is enabled by default
          readOnly: true  // this category cannot be disabled
        },
        analytics: {
          enabled: false,
          readOnly: false,
          services: {
            googleAnalytics: {
              label: 'Google Analytics',
              onAccept: () => {
                // Enable GA when user accepts analytics cookies
                window.gtag('consent', 'update', {
                  'analytics_storage': 'granted'
                });
              },
              onReject: () => {
                // Disable GA when user rejects analytics cookies

                // TODO: GA consent is optional for now, so we disable the "denied" state
                // window.gtag('consent', 'update', {
                //   'analytics_storage': 'denied'
                // });
              }
            }
          }
        }
      },

      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'We use cookies',
              description: 'We use cookies to enhance your browsing experience, \
                serve personalized content, and analyze our traffic. By clicking \
                "Accept All", you consent to our use of cookies.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Manage preferences'
            },
            preferencesModal: {
              title: 'Cookie Preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Save preferences',
              closeIconLabel: 'Close modal',
              sections: [
                {
                  title: 'Cookie Usage',
                  description: 'We use cookies to ensure basic functionality and to enhance your experience.'
                },
                {
                  title: 'Strictly Necessary Cookies',
                  description: 'These cookies are essential for the website to function properly.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Analytics Cookies',
                  description: 'These cookies help us understand how visitors interact with our website.',
                  linkedCategory: 'analytics'
                }
              ]
            }
          }
        }
      },
    });
  }, []);

  return null;
}