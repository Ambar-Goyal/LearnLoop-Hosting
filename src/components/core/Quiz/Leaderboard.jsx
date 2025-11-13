import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa'

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [filter, setFilter] = useState('all') // all, today, week

  useEffect(() => {
    const savedLeaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]')
    setLeaderboard(savedLeaderboard)
  }, [])

  const filterLeaderboard = () => {
    if (filter === 'all') return leaderboard
    
    const now = new Date()
    const today = now.toLocaleDateString()
    
    if (filter === 'today') {
      return leaderboard.filter(entry => entry.date === today)
    }
    
    if (filter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      return leaderboard.filter(entry => {
        const entryDate = new Date(entry.date)
        return entryDate >= weekAgo
      })
    }
    
    return leaderboard
  }

  const filteredLeaderboard = filterLeaderboard()

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <FaTrophy className="text-yellow-400 text-xl" />
      case 2:
        return <FaMedal className="text-gray-400 text-xl" />
      case 3:
        return <FaAward className="text-yellow-600 text-xl" />
      default:
        return <span className="text-richblack-300 font-bold text-lg">#{rank}</span>
    }
  }

  const getRankBg = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600'
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-500'
      case 3:
        return 'bg-gradient-to-r from-yellow-600 to-yellow-700'
      default:
        return 'bg-richblack-700'
    }
  }

  const clearLeaderboard = () => {
    if (window.confirm('Are you sure you want to clear the leaderboard?')) {
      localStorage.removeItem('quizLeaderboard')
      setLeaderboard([])
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-richblack-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-richblack-5 mb-4">
            🏆 Quiz Leaderboard
          </h1>
          <p className="text-richblack-200 text-lg">
            See how you rank against other students
          </p>
        </div>

        {/* Controls */}
        <div className="bg-richblack-800 rounded-lg p-6 mb-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-yellow-50 text-richblack-900'
                    : 'bg-richblack-700 text-richblack-200 hover:bg-richblack-600'
                }`}
              >
                All Time
              </button>
              <button
                onClick={() => setFilter('today')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'today'
                    ? 'bg-yellow-50 text-richblack-900'
                    : 'bg-richblack-700 text-richblack-200 hover:bg-richblack-600'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setFilter('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'week'
                    ? 'bg-yellow-50 text-richblack-900'
                    : 'bg-richblack-700 text-richblack-200 hover:bg-richblack-600'
                }`}
              >
                This Week
              </button>
            </div>
            
            <div className="flex gap-2">
              <Link
                to="/quiz"
                className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-100 transition-colors"
              >
                Take Quiz
              </Link>
              {leaderboard.length > 0 && (
                <button
                  onClick={clearLeaderboard}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        {filteredLeaderboard.length === 0 ? (
          <div className="bg-richblack-800 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-richblack-5 mb-2">
              No scores yet!
            </h3>
            <p className="text-richblack-200 mb-6">
              Be the first to take the quiz and claim the top spot.
            </p>
            <Link
              to="/quiz"
              className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-colors inline-block"
            >
              Take Quiz Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeaderboard.map((entry, index) => {
              const rank = index + 1
              return (
                <div
                  key={index}
                  className={`${getRankBg(rank)} rounded-lg p-6 ${
                    rank <= 3 ? 'shadow-lg' : 'bg-richblack-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(rank)}
                      </div>
                      
                      <div>
                        <h3 className={`text-xl font-bold ${
                          rank <= 3 ? 'text-white' : 'text-richblack-5'
                        }`}>
                          {entry.name}
                        </h3>
                        <p className={`text-sm ${
                          rank <= 3 ? 'text-gray-200' : 'text-richblack-300'
                        }`}>
                          {entry.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        rank <= 3 ? 'text-white' : 'text-yellow-50'
                      }`}>
                        {entry.score} pts
                      </div>
                      <div className={`text-sm ${
                        rank <= 3 ? 'text-gray-200' : 'text-richblack-300'
                      }`}>
                        {entry.correctAnswers}/{entry.totalQuestions} correct ({entry.percentage}%)
                      </div>
                      <div className={`text-xs ${
                        rank <= 3 ? 'text-gray-300' : 'text-richblack-400'
                      }`}>
                        {entry.date} at {entry.time}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Stats */}
        {filteredLeaderboard.length > 0 && (
          <div className="mt-8 bg-richblack-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-richblack-5 mb-4">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-50 mb-2">
                  {filteredLeaderboard.length}
                </div>
                <div className="text-richblack-200">Total Attempts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-50 mb-2">
                  {Math.round(
                    filteredLeaderboard.reduce((acc, entry) => acc + entry.percentage, 0) /
                    filteredLeaderboard.length
                  )}%
                </div>
                <div className="text-richblack-200">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-50 mb-2">
                  {Math.max(...filteredLeaderboard.map(entry => entry.score))}
                </div>
                <div className="text-richblack-200">Highest Score</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard