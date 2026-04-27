import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const WORDS_PER_MINUTE = 200

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  return date.toISOString().substring(0, 10)
}

export function calculateReadingTime(text) {
  return Math.ceil(text.split(' ').length / WORDS_PER_MINUTE)
}