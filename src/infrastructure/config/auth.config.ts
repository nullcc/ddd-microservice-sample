export const AUTH_CONFIG = {
  jwtSecret: process.env.JWT_SECRET || 'YOLO',
  userHeader: 'X-User',
};
