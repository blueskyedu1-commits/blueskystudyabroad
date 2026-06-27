export const dynamic = "force-dynamic"
import { supabase } from '@/lib/supabase'
import PartnerBadge from '@/components/PartnerBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CoursePage({ params }: { params: { id: string } }) {
  const { data: programme } = await supabase
    .from('programmes')
    .select('*, university:universities(*)')
    .eq('id', params.id)
    .single()

  if (!programme || !programme.university) return notFound()

  const p = programme as any
  const isPartner = p.university.status === 'partner'

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/courses" className="text-sm text-blue-600 hover:underline mb-4 inline-block">← Back to Course Finder</Link>

        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="mb-1">
            <PartnerBadge status={p.university.status} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-1">{p.name}</h1>
          <p className="text-gray-500">{p.university.name} · {p.university.city}, {p.university.country}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">
            {[
              { label: 'Level',        value: p.level       },
              { label: 'Duration',     value: p.duration    },
              { label: 'Tuition Fee',  value: p.tuition_fee_amount ? `${p.tuition_fee_currency} ${p.tuition_fee_amount.toLocaleString()} / ${p.tuition_fee_per}` : 'On request' },
              { label: 'Intakes',      value: p.intake_dates?.join(', ') || '—'  },
              { label: 'Application Deadline', value: p.application_deadline || '—' },
              { label: 'Min. IELTS',   value: p.ielts_score || '—' },
            ].map(item => (
              <div key={item.label} className="border border-gray-100 rounded-xl p-4">
                <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                <div className="font-semibold text-gray-800 text-sm">{item.value || '—'}</div>
              </div>
            ))}
          </div>

          {p.entry_requirements && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Entry Requirements</h3>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4">{p.entry_requirements}</p>
            </div>
          )}

          {p.scholarship && (
            <div className="mt-4 bg-green-50 text-green-800 rounded-xl p-4 text-sm">
              <span className="font-semibold">Scholarship Available</span>
              {p.scholarship_type && <span> — {p.scholarship_type}</span>}
            </div>
          )}

          {p.last_verified && (
            <p className="text-xs text-gray-400 mt-4">
              ✓ Data verified {new Date(p.last_verified).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              {p.verified_source && <> · <a href={p.verified_source} target="_blank" rel="noopener noreferrer" className="underline">Source</a></>}
            </p>
          )}

          <div className="mt-8 border-t border-gray-100 pt-6">
            {isPartner ? (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Apply with Full Support</h3>
                <p className="text-sm text-gray-500 mb-4">As a partner university, we handle your application end-to-end — from documents to offer letter.</p>
                <Link href={`/apply?programme=${p.id}`} className="btn-primary inline-block">Get Fast-Track Help →</Link>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Get Free Counselling on This Course</h3>
                <p className="text-sm text-gray-500 mb-4">We can advise on your eligibility, realistic alternatives, and partner universities in the same field.</p>
                <Link href={`/?course=${p.id}#contact`} className="btn-secondary inline-block">Talk to a Counsellor →</Link>
                {p.programme_link && (
                  <a href={p.programme_link} target="_blank" rel="noopener noreferrer"
                    className="ml-4 text-sm text-blue-600 hover:underline">
                    View Official Course Page →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
