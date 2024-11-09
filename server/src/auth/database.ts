// src/auth/database.ts

interface User {
    telegramId: string;
    code: string;
    nickname: string;
  }
  
  const usersDatabase: { [code: string]: User } = {};
  
  export const addUserToDatabase = (telegramId: string, code: string, nickname: string) => {
    usersDatabase[code] = { telegramId, code, nickname };
  };
  
  export const getUserByCode = (code: string): User | null => {
    return usersDatabase[code] || null;
  };
  