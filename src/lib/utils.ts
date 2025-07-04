import { first_male } from './names';
import parse from 'html-react-parser';
import { TQuestion } from "@/lib/schema/tests.schema";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from 'jsonwebtoken'

import { marked } from 'marked';
import { TBaseUser } from './schema/users.schema';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// get first two letters - uppercase
export function getFirstTwoUpperCase(inputString: string | null | undefined) {
  if (inputString) {
    const firstTwoUpperCase = inputString.slice(0, 2).toUpperCase();
    return firstTwoUpperCase ;
  }
}

// categorize the questions
export const categorizeQuestionsBySubject = (questions: TQuestion[]): TypeResponseQuestions => {
  const categorizedQuestions: TypeResponseQuestions = {};
  for (const question of questions) {
    const subject = question.subject || 'combined';
    if (!categorizedQuestions[subject]) {
      categorizedQuestions[subject] = [];
    }
    categorizedQuestions[subject].push(question);
  }
  return categorizedQuestions;
};


export const createTodayDateId = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const dateid = `${year}-${month}-${day}`;
  return dateid;
};

export const extractBodyContent = (htmlString?: string) => {
  if (!htmlString) return null;
  
  // Remove the doctype, html, head tags and just get the body content
  const bodyContent = htmlString
    .replace(/<!DOCTYPE html>|<\/?html>|<\/?head>|<\/?body>/gi, '')
    .trim();
  
  return bodyContent;
};


export const ParsedElement = (str?: string) => {
  const newstr = str;
  let parsedHtml = null;
  if (newstr) {
    parsedHtml = parse(newstr);
  }
  return parsedHtml;
};


export const isCuid = (str: string): boolean => {
  const cuidRegex = /^c[a-z0-9]{24}$/;
  return cuidRegex.test(str);
}

export const generateRandomName = () => {
  const randomIndex = Math.floor(Math.random() * first_male.length)
  const username = first_male[randomIndex]
  return username
}

// generate session token for user to authenticate test
export const generateJWT = (object: any) => {
  const jwtsecretkey = process.env.JWT_SECRET_KEY as string
  const token = jwt.sign(object, jwtsecretkey, { expiresIn: '1h' });
  return token
}

// Function to generate a random verification key
export const generateVerificationKey = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters[randomIndex];
  }
  return key;
};


const colors = [
  "#FF6384", // Pink
  "#36A2EB", // Blue
  "#FFCE56", // Yellow
  "#4BC0C0", // Teal
  "#9966FF", // Purple
  "#FF9F40", // Orange
  "#FF5733", // Coral
  "#C70039", // Crimson
  "#900C3F", // Dark Red
  "#581845", // Dark Purple
];

// Helper function to get a random color from the colors array
export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export function markdownToHtml(markdown: string) {
  return marked(markdown);
}


export const formatDateTimeString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Helper function for date formatting (can be moved to a shared utility if preferred)
export const formatDateTimeDate = (dateString: Date) => {
  if (!dateString) return 'N/A';
  try {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    console.error("Invalid date string provided to formatDate:", dateString, e);
    return 'Invalid Date';
  }
};


// utils to check various user stats
export const isUserAdmin = (user: TBaseUser | null) => {
  if (!user) {
    return false;
  }
  return user.role === 'ADMIN';
};

export const isUserModerator = (user: TBaseUser | null) => {
  if (!user) {
    return false;
  }
  return user.role === 'MODERATOR';
};

export const isUserSuperAdmin = (user: TBaseUser | null) => {
  if (!user) {
    return false;
  }
  return user.role === 'SUPERADMIN';
};

export const isUserSajid = (user: TBaseUser | null) => {
  if (!user) {
    return false;
  }
  return user.role === 'SAJID';
};

export const isUserSubscribed = (user: TBaseUser | null) => {
  if (!user) {
    return false;
  }
  console.log(user)
  return user.isSubscribed === true;

};
