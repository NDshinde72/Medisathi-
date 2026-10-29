/**
 * RuralCare AI — Healthcare Facility Discovery & Navigation
 * Section 20 implementation: Locating PHCs, CHCs, Sub-Centres, and Hospitals with distance and emergency filters.
 */

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/api';
import { HealthcareFacility, FacilityType } from '../../types';
import {
  Building2,
  MapPin,
  PhoneCall,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Navigation,
} from 'lucide-react';

export const FacilityDiscoveryPage: React.FC = () => {
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [district, setDistrict] = useState('Ahmednagar');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilities();
  }, [district, selectedType, emergencyOnly, searchQuery]);

  async function fetchFacilities() {
    setLoading(true);
    try {
      const res = await apiClient.getFacilities({
        district: district || undefined,
        type: selectedType !== 'ALL' ? selectedType : undefined,
        emergencyOnly: emergencyOnly || undefined,
        search: searchQuery || undefined,
      });
      if (res.success) setFacilities(res.data);
    } catch (err) {
      console.error('Failed to load facilities', err);
    } finally {
      setLoading(false);
    }
  }

  const facilityTypes: { id: string; label: string }[] = [
    { id: 'ALL', label: 'All Centers' },
    { id: 'PHC', label: 'Primary Health Centres (PHC)' },
    { id: 'CHC', label: 'Community Health Centres (CHC)' },
    { id: 'DISTRICT_HOSPITAL', label: 'District Hospitals' },
    { id: 'SUB_CENTRE', label: 'Sub-Centres' },
    { id: 'PHARMACY', label: 'Pharmacies' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
          Rural Healthcare Infrastructure
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Healthcare Facility Discovery
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Locate nearby government Primary Health Centres, 24/7 Community Health Centres, and emergency trauma facilities.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Query */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by center name, village, or service..."
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* District Picker */}
          <div className="md:col-span-3">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="Ahmednagar">District: Ahmednagar</option>
              <option value="Pune">District: Pune</option>
              <option value="Nashik">District: Nashik</option>
              <option value="Aurangabad">District: Chhatrapati Sambhajinagar</option>
            </select>
          </div>

          {/* Emergency 24/7 Toggle */}
          <div className="md:col-span-3 flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 w-full justify-between">
              <span className="flex items-center gap-1.5 text-red-700">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>24/7 Emergency Only</span>
              </span>
              <input
                type="checkbox"
                checked={emergencyOnly}
                onChange={(e) => setEmergencyOnly(e.target.checked)}
                className="rounded border-slate-300 text-red-600 focus:ring-red-500 h-4 w-4"
              />
            </label>
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          {facilityTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedType === t.id
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Facility Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all p-5 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                    {fac.type}
                  </span>
                  {fac.distanceKm && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {fac.distanceKm} km away
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{fac.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                  <span>{fac.address}</span>
                </p>
              </div>

              <div className="space-y-1 text-xs pt-1">
                <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Hours: {fac.operatingHours}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  Inpatient Beds: <strong>{fac.bedCount} beds</strong>
                </div>
                {fac.emergencyAvailable && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                    <ShieldAlert className="w-3 h-3" />
                    <span>24/7 Casualty & Trauma Ready</span>
                  </div>
                )}
              </div>

              {/* Services Offered */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Available Services:
                </span>
                <div className="flex flex-wrap gap-1">
                  {fac.servicesOffered.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600 text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href={`tel:${fac.contactPhone}`}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Center</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${fac.latitude},${fac.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-slate-500" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
