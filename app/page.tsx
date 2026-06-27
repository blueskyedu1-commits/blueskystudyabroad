import Link from 'next/link'

const countries = ['United Kingdom', 'USA', 'Canada', 'Australia', 'Ireland', 'Germany', 'New Zealand', 'UAE']
const subjects  = ['Business & Management', 'Computer Science', 'Engineering', 'Data Analytics', 'Health Sciences', 'Law', 'Arts & Design', 'Finance']

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600 bg-opacity-50 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            1,000+ courses from universities worldwide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Find Your Perfect Course.<br />Study Anywhere in the World.
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Search courses from partner universities — where we offer full application support — and top global universities like Oxford, Cambridge, and the Ivy League. Everything shown. Nothing hidden.
          </p>

          {/* QUICK SEARCH */}
          <form action="/courses" method="GET" className="bg-white rounded-2xl p-4 shadow-xl max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <select name="country" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Destination Country</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select name="field" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Subject / Field</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select name="level" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Study Level</option>
                <option value="foundation">Foundation</option>
                <option value="bachelor">Bachelor&apos;s</option>
                <option value="master">Master&apos;s</option>
                <option value="mba">MBA</option>
                <option value="phd">PhD</option>
                <option value="diploma">Diploma</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-base">
              Search Courses →
            </button>
          </form>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section id="how-it-works" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">How This Platform Works</h2>
          <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
            We show every university — not just the ones we work with. Here&apos;s the difference:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-blue-600 rounded-2xl p-6">
              <div className="badge-partner mb-4">Partner University</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Full Application Support</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span> Fast-track application processing</li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span> Scholarship and fee waiver guidance</li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span> Dedicated counsellor assigned</li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span> Offer letter in 2–4 weeks</li>
              </ul>
              <Link href="/courses?status=partner" className="mt-4 btn-primary text-sm inline-block">
                Browse Partner Universities
              </Link>
            </div>
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
              <div className="badge-verified mb-4">Verified Listing</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Full Information, Free Guidance</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex gap-2"><span className="text-gray-500 font-bold">✓</span> Complete course, fee &amp; entry data</li>
                <li className="flex gap-2"><span className="text-gray-500 font-bold">✓</span> Verified directly from university website</li>
                <li className="flex gap-2"><span className="text-gray-500 font-bold">✓</span> Free counselling on your options</li>
                <li className="flex gap-2"><span className="text-gray-500 font-bold">✓</span> Partner alternatives suggested</li>
              </ul>
              <Link href="/courses" className="mt-4 btn-secondary text-sm inline-block">
                Browse All Universities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Popular Study Destinations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { country: 'United Kingdom', flag: '🇬🇧', courses: '3,200+' },
              { country: 'Canada',         flag: '🇨🇦', courses: '2,100+' },
              { country: 'Australia',      flag: '🇦🇺', courses: '1,800+' },
              { country: 'Ireland',        flag: '🇮🇪', courses: '950+'   },
              { country: 'USA',            flag: '🇺🇸', courses: '4,500+' },
              { country: 'Germany',        flag: '🇩🇪', courses: '1,200+' },
              { country: 'New Zealand',    flag: '🇳🇿', courses: '680+'   },
              { country: 'UAE',            flag: '🇦🇪', courses: '420+'   },
            ].map(d => (
              <Link
                key={d.country}
                href={`/courses?country=${encodeURIComponent(d.country)}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-3xl mb-2">{d.flag}</div>
                <div className="font-semibold text-gray-900 text-sm">{d.country}</div>
                <div className="text-xs text-gray-500 mt-0.5">{d.courses} courses</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="py-20 px-4 bg-blue-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Where to Start?</h2>
          <p className="text-blue-100 mb-8">
            Talk to one of our counsellors — free of charge. We&apos;ll look at your profile, your goals, and your budget, and give you an honest shortlist.
          </p>
          <form action="/api/lead" method="POST" className="bg-white rounded-2xl p-6 text-left">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                <input name="student_name" type="text" required placeholder="Priya Sharma"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                <input name="email" type="email" required placeholder="priya@email.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp / Phone</label>
                <input name="phone" type="tel" placeholder="+91 98765 43210"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Destination</label>
                <select name="destination_preference"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
              Get Free Counselling →
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">We respond within 24 hours. No spam, ever.</p>
          </form>
        </div>
      </section>
    </div>
  )
}
