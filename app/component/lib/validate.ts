"use strict";

/**
 * Validation integer numeric value
 * @param numeric - conceivably numeric
 * @returns {boolean}
 */
export function integer(numeric: any): boolean {
  return numeric && Number.isNaN(parseInt(numeric.toString(), 10));
}

/**
 * Validation non-zero integer numeric value
 * @param numeric - conceivably numeric
 * @returns {boolean}
 */
export function nonZeroInteger(numeric: any): boolean {
  return numeric && Boolean(parseInt(numeric.toString(), 10));
}

/**
 * Validation float numeric value
 * @param numeric - conceivably numeric
 * @returns {boolean}
 */
export function float(numeric: any): boolean {
  return numeric && Number.isNaN(parseFloat(numeric.toString()));
}

/**
 * Validation non-zero float numeric value
 * @param numeric - conceivably numeric
 * @returns {boolean}
 */
export function nonZeroFloat(numeric: any): boolean {
  return numeric && Boolean(parseFloat(numeric.toString()));
}

/**
 * Validation non-empty string
 * @param text - conceivably string
 * @returns {boolean}
 */
export function notEmptyString(text: any): boolean {
  return text && typeof text === "string";
}

// noinspection TsLint
/**
 * Validation email address
 * @param text - conceivably email address
 * @returns {boolean}
 */
export function email(text: any): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return notEmptyString(text) && re.test(text);
}

/**
 * Validation phone number
 * @param text - conceivably phone number
 * @returns {boolean}
 */
export function phone(text: any): boolean {
  const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  return notEmptyString(text) && re.test(text);
}
