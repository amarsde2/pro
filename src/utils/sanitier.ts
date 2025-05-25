import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Create a window object for DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Sanitize HTML content
export const sanitizeHTML = (dirty: string): string => {
  return purify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target'],
  });
};

// Sanitize user input (removes all HTML)
export const sanitizeInput = (input: string): string => {
  return purify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

// Sanitize URL
export const sanitizeURL = (url: string): string => {
  try {
    const sanitized = purify.sanitize(url, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
    const parsed = new URL(sanitized);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }
    return sanitized;
  } catch {
    return '';
  }
};

// Sanitize object recursively
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized as T;
}; 