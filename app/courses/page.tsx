export const dynamic = "force-dynamic"
import { supabase } from '@/lib/supabase'
import CourseCard from '@/components/CourseCard'
import Link from 'next/link'

const countries = ['United Kingdom', 'USA', 'Canada', 'Australia', 'Ireland', 'Germany', 'New Zealand', 'UAE', 'Singapore', 'Malaysia']
const fields    = ['Business & Management', 'Computer Science', 'Engineering', 'Data Analytics', 'Health Sciences', 'Law', 'Arts & Design', 'Finance', 'Education', 'Medicine']
const levels    = [
  { value: 'foundation', label: 'Foundation'   },
  { value: 'bachelor',   label: "Bachelor's"    },
  { value: 'master',     label: "Master's"      },
  { value: 'mba',        label: 'MBA'           },
  { value: 'phd',        label: 'PhD'           },
  { value: 'diploma',    label: 'Diploma'       },
]

interface SearchParams {
  country?: string
  field?: string
  level?: string
  status?: string
  scholarship?: string
}

export default async function CoursesPage({ searchParams }: { searchParams: SearchParams }) {
  // Build the query
  let query = supabase
    .from('programmes')
    .select('*, university:universities(*)')
    .order('created_at', { ascending: false })
    .limit(50)

  if (searchParams.country) {
    query = query.eq('university.country', searchParams.country)
  }
  if (searchParams.field) {
    query = query.ilike('field_of_study', `%${searchParams.field}%`)
  }
  if (searchParams.level) {
    query = query.eq('level', searchParams.level)
  }
  if (searchParams.status) {
    query = query.eq('university.status', searchParams.status)
  }
  if (searchParams.scholarship === 'true') {
    query = query.eq('scholarship', true)
  }

  const { data: programmes, error } = await query

  const results = (programmes || []).filter(p => p.university) as any[]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Find Your Course</h1>
          <p className="text-gray-500 text-sm">
            Partner universities offer full application support. Verified Listings give you complete information with free counselling.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* FILTER SIDEBAR */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <form method="GET" className="bg-white rounded-2xl border border-gray-200 p-5 space-y-5">
              <h2 className="font-bold text-gray-900">Filter Courses</h2>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Destination</label>
                <select name="country" defaultValue={searchParams.country || ''}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Countries</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject / Field</label>
                <select name="field" defaultValue={searchParams.field || ''}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Subjects</option>
                  {fields.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Study Level</label>
                <select name="level" defaultValue={searchParams.level || ''}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Levels</option>
                  {levels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">University Type</label>
                <select name="status" defaultValue={searchParams.status || ''}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Universities</option>
                  <option value="partner">Partner Universities</option>
                  <option value="verified">Verified Listings</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="scholarship" value="true"
                    defaultChecked={searchParams.scholarship === 'true'}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Scholarships available</span>
                </label>
              </div>

              <button type="submit" className="w-full btn-primary text-sm py-2.5">
                Apply Filters
              </button>

              {Object.values(searchParams).some(Boolean) && (
                <Link href="/courses" className="block text-center text-xs text-gray-400 hover:text-gray-600">
                  Clear all filters
                </Link>
              )}
            </form>
          </aside>

          {/* RESULTS */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{results.length}</span> courses found
                {searchParams.country && ` in ${searchParams.country}`}
                {searchParams.field && ` · ${searchParams.field}`}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 rounded-xl p-4 text-sm mb-4">
                Could not load courses. Please try again.
              </div>
            )}

            {results.length === 0 && !error && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or clearing them to see all courses.</p>
                <Link href="/courses" className="btn-primary text-sm inline-block">Clear Filters</Link>
              </div>
            )}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.map((p: any) => (
                <CourseCard key={p.id} programme={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

