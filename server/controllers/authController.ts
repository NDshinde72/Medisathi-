/**
 * RuralCare AI — Authentication Controller
 * Handles user registration, login, and current profile session retrieval.
 */

import type { Request, Response } from 'express';
import { db } from '../data/store.ts';
import type { AuthenticatedRequest } from '../middleware/auth.ts';
import type { UserRole } from '../../src/types/index.ts';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role = 'PATIENT', fullName, age, gender, district, phone } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
        error_code: 'VALIDATION_ERROR',
      });
    }

    const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email is already registered.',
        error_code: 'USER_EXISTS',
      });
    }

    const newUserId = 'usr-' + Date.now();
    const newUser = {
      id: newUserId,
      email,
      role: role as UserRole,
      phoneNumber: phone || '+91 98000 00000',
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);

    if (role === 'PATIENT') {
      db.patients.push({
        id: 'pat-' + Date.now(),
        userId: newUserId,
        fullName: fullName || 'Patient User',
        age: age || 35,
        gender: gender || 'Other',
        bloodGroup: 'B+',
        villageTown: 'Rural Area',
        district: district || 'Ahmednagar',
        state: 'Maharashtra',
        emergencyContactName: 'Family Kin',
        emergencyContactPhone: '+91 99999 00000',
      });
    } else if (role === 'DOCTOR') {
      db.doctors.push({
        id: 'doc-' + Date.now(),
        userId: newUserId,
        fullName: fullName || 'Dr. Medical Officer',
        registrationNumber: 'MCI-' + Math.floor(10000 + Math.random() * 90000),
        qualification: 'MBBS',
        specialization: 'General Medicine',
        hospitalAffiliation: 'Rural PHC',
        district: district || 'Ahmednagar',
        state: 'Maharashtra',
        yearsOfExperience: 5,
        isVerified: true,
      });
    }

    db.logAudit('USER_REGISTERED', newUserId, { email, role });

    const token = `rc-jwt-${newUserId}-${role}`;
    res.status(201).json({
      success: true,
      data: {
        user: newUser,
        token,
      },
      message: 'Account successfully created.',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, error_code: 'REGISTRATION_FAILED' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, role = 'PATIENT' } = req.body;

    let targetUser = db.users.find(
      (u) => (email && u.email.toLowerCase() === email.toLowerCase()) || u.role === role
    );

    if (!targetUser) {
      targetUser = db.users.find((u) => u.role === role) || db.users[0];
    }

    const token = `rc-jwt-${targetUser.id}-${targetUser.role}`;
    let profile = null;

    if (targetUser.role === 'PATIENT') {
      profile = db.patients.find((p) => p.userId === targetUser!.id) || db.patients[0];
    } else if (targetUser.role === 'DOCTOR') {
      profile = db.doctors.find((d) => d.userId === targetUser!.id) || db.doctors[0];
    }

    db.logAudit('USER_LOGIN', targetUser.id, { role: targetUser.role });

    res.json({
      success: true,
      data: {
        user: targetUser,
        profile,
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, error_code: 'LOGIN_FAILED' });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthenticated', error_code: 'AUTH_REQUIRED' });
  }

  let profile = null;
  if (req.user.role === 'PATIENT') {
    profile = db.patients.find((p) => p.userId === req.user!.id) || db.patients[0];
  } else if (req.user.role === 'DOCTOR') {
    profile = db.doctors.find((d) => d.userId === req.user!.id) || db.doctors[0];
  }

  res.json({
    success: true,
    data: {
      user: req.user,
      profile,
    },
  });
};
