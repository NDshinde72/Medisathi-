/**
 * RuralCare AI — Healthcare Facilities Discovery Controller
 * Allows querying PHCs, CHCs, Sub-Centres, and Hospitals with geolocation and emergency filters.
 */

import type { Request, Response } from 'express';
import { db } from '../data/store.ts';

export const getFacilities = async (req: Request, res: Response) => {
  try {
    const { district, type, emergencyOnly, search } = req.query;

    let results = [...db.facilities];

    if (district) {
      results = results.filter((f) => f.district.toLowerCase() === String(district).toLowerCase());
    }

    if (type) {
      results = results.filter((f) => f.type === type);
    }

    if (emergencyOnly === 'true') {
      results = results.filter((f) => f.emergencyAvailable);
    }

    if (search) {
      const q = String(search).toLowerCase();
      results = results.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.address.toLowerCase().includes(q) ||
          f.servicesOffered.some((s) => s.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      total: results.length,
      data: results,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, error_code: 'FACILITY_SEARCH_FAILED' });
  }
};
