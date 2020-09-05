import Head from 'next/head'
import scores from '@/data/scores'
import cx from 'classnames'

const Home = () => (
  <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="container mx-auto">
      <div className="py-8 w-full">
        <div className="overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Score</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {scores.map(([name, score], index) => (
                <tr key={name} className={cx({ 'bg-gray-100': index % 2 })}>
                  <td className="py-3 px-4">{name}</td>
                  <td className="py-3 px-4">{score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <footer>
      <a href="/" target="_blank" rel="noopener noreferrer">
        Powered by <img src="/vercel.svg" alt="Vercel Logo" />
      </a>
    </footer>
  </>
)

export default Home
