import Link from 'next/link'
import { Programme } from '@/lib/supabase'
import PartnerBadge from './PartnerBadge'

interface CourseCardProps {
  programme: Programme & { university: NonNullable<Programme['university']> }
}

const levelLabel: Record<string, string> = {
  foundation: 'Foundation',
  bachelor:   "Bachelor's",
  master:     "Master's",
  mba:        'MBA',
  phd:        'PhD',
  diploma:    'Diploma',
}

export default function CourseCard({ programme: p }: CourseCardProps) {
  const fee = p.tuition_fee_amount
    ? `${p.tuition_fee_currency} ${p.tuition_fee_amount.toLocaleString()} / ${p.tuition_fee_per}`
    : 'Fee on request'

  const intakes = p.intake_dates?.join(', ') || 'Contact for intake dates'

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <PartnerBadge status={p.university.status} />
          <h3 className="font-bold text-gray-900 mt-2 text-base leading-snug">{p.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {p.university.name} · {p.university.city}, {p.university.country}
          </p>
        </div>
        {p.university.world_ranking && (
          <div className="flex-shrink-0 text-center">
            <div className="text-xs text-gray-400">QS Rank</div>
            <div className="font-bold text-gray-700 text-sm">#{p.university.world_ranking}</div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <span className="text-gray-400 text-xs block">Level</span>
          <span className="font-medium text-gray-800">{levelLabel[p.level] || p.level}</span>
        </div>
        <div>
          <span className="text-gray-400 text-xs block">Duration</span>
          <span className="font-medium text-gray-800">{p.duration || '—'}</span>
        </div>
        <div>
          <span className="text-gray-400 text-xs block">Tuition Fee</span>
          <span className="font-medium text-gray-800">{fee}</span>
        </div>
        <div>
          <span className="text-gray-400 text-xs block">Intakes</span>
          <span className="font-medium text-gray-800">{intakes}</span>
        </div>
        {p.ielts_score && (
          <div>
            <span className="text-gray-400 text-xs block">Min. IELTS</span>
            <span className="font-medium text-gray-800">{p.ielts_score}</span>
          </div>
        )}
        {p.scholarship && (
          <div>
            <span className="text-gray-400 text-xs block">Scholarship</span>
            <span className="font-medium text-green-700">Available</span>
          </div>
        )}
      </div>

      {/* Verified badge */}
      {p.last_verified && (
        <div className="text-xs text-gray-400">
          ✓ Verified {new Date(p.last_verified).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto">
        {p.university.status === 'partner' ? (
          <Link href={`/courses/${p.id}`} className="btn-primary text-sm w-full text-center block">
            Get Fast-Track Help →
          </Link>
        ) : (
          <Link href={`/courses/${p.id}`} className="btn-secondary text-sm w-full text-center block">
            Get Free Counselling →
          </Link>
        )}
      </div>
    </div>
  )
}
