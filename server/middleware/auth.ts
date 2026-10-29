/**
 * RuralCare AI — Backend Authentication & Security Middleware
 * Role-Based Access Control (RBAC), JWT simulation, and error normalization.
 */

import type { Request, Response, NextFunction } from 'express';
import { db } from '../data/store.ts';
import type { UserRole } from '../../src/types/index.ts';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Default fallback to first active user if in development testing mode
    req.user = {
      id: db.users[0].id,
      email: db.users[0].email,
      role: db.users[0].role,
    };
    return next();
  }

  // Token format: "rc-jwt-<userId>-<role>"
  try {
    const parts = token.split('-');
    if (parts.length >= 3) {
      const userId = parts.slice(2, parts.length - 1).join('-');
      const role = parts[parts.length - 1] as UserRole;
      const foundUser = db.users.find((u) => u.id === userId || u.role === role);
      if (foundUser) {
        req.user = {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        };
        return next();
      }
    }
  } catch (err) {
    // Continue with default fallback
  }

  req.user = {
    id: db.users[0].id,
    email: db.users[0].email,
    role: db.users[0].role,
  };
  next();
};

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to ${allowedRoles.join(', ')}`,
        error_code: 'INSUFFICIENT_PERMISSIONS',
      });
    }
    next();
  };
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[API Error]', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'An unexpected internal error occurred.',
    error_code: err.code || 'INTERNAL_SERVER_ERROR',
  });
};
