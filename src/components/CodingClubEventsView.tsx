import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Info,
  ChevronDown,
  Award,
  Check
} from 'lucide-react';
import { ClubActivity } from '../types';

interface CodingClubEventsViewProps {
  activities: ClubActivity[];
  onUpdateRsvp: (activityId: string, status: 'attending' | 'interested' | 'none') => void;
}

export const CodingClubEventsView: React.FC<CodingClubEventsViewProps> = ({
  activities,
  onUpdateRsvp,
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(activities[0]?.id || null);

  const filtered = activities.filter((act) => {
    if (filterType === 'All') return true;
    return act.type === filterType;
  });

  const attendingCount = activities.filter((a) => a.rsvpStatus === 'attending').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Notice */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-200 text-xs flex items-start gap-3 shadow-lg">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <div className="flex items-center gap-2">
            <strong className="text-amber-100 font-semibold">CIE-3 Demonstration Notice:</strong>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900/60 text-amber-300">
              Demo Records
            </span>
          </div>
          <p className="mt-1 text-amber-300/80 leading-relaxed">
            The coding club events and workshops below are realistic demo records created for the Computer Engineering CIE-3 AI Agent Design Challenge. You can RSVP, mark interest, and review event guidelines to test state persistence.
          </p>
        </div>
      </div>

      {/* Header and Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Coding Club Activities & Competitions</span>
            <span className="text-xs font-mono font-normal text-slate-500">
              ({activities.length} Events Scheduled)
            </span>
          </h2>
          <p className="text-[11px] text-slate-400">
            Hackathons, peer code reviews, speed-debugging contests, and DSA masterclasses
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center flex-wrap gap-1.5">
          {['All', 'Challenge', 'Competition', 'Workshop', 'Peer Review', 'Showcase', 'Practice'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                filterType === t
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="space-y-4">
        {filtered.map((act) => {
          const isExpanded = expandedId === act.id;
          return (
            <div
              key={act.id}
              className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-lg transition-all"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : act.id)}
                className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-900"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">
                      {act.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      Demo Record
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {act.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {act.date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {act.time}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {act.location}
                    </span>
                  </div>
                </div>

                {/* RSVP Status / Action */}
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onUpdateRsvp(act.id, act.rsvpStatus === 'attending' ? 'none' : 'attending')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      act.rsvpStatus === 'attending'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                        : 'bg-slate-950 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800'
                    }`}
                  >
                    {act.rsvpStatus === 'attending' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Attending</span>
                      </>
                    ) : (
                      <span>RSVP Attending</span>
                    )}
                  </button>

                  <button
                    onClick={() => onUpdateRsvp(act.id, act.rsvpStatus === 'interested' ? 'none' : 'interested')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      act.rsvpStatus === 'interested'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : 'bg-slate-950 hover:bg-blue-950/40 text-slate-400 hover:text-blue-300 border border-slate-800'
                    }`}
                  >
                    {act.rsvpStatus === 'interested' ? 'Interested' : 'Bookmark'}
                  </button>

                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-950/40 text-xs space-y-3">
                  <p className="text-slate-300 leading-relaxed">
                    {act.description}
                  </p>

                  <div>
                    <h5 className="font-semibold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                      Participation Instructions & Rules:
                    </h5>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      {act.instructions.map((inst, idx) => (
                        <li key={idx}>{inst}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-slate-500">
                    <span className="flex items-center gap-1 font-mono">
                      <Users className="w-3.5 h-3.5" />
                      {act.participantsCount + (act.rsvpStatus === 'attending' ? 1 : 0)} Students Registered
                    </span>
                    <span className="font-mono text-purple-300">
                      Difficulty Level: {act.difficulty}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
