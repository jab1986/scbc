import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { RefreshCw } from 'lucide-react';
import './App.css';

const BettingDashboard = () => {
  // Sample data for demonstration
  const sampleData = {
    finalStandings: [
      { player: 'Sean', points: 34 },
      { player: 'Gaz', points: 32 },
      { player: 'Joe', points: 31 },
      { player: 'Dean', points: 17 }
    ],
    progressionData: [
      { date: '13/12/2024', Sean: 23, Joe: 19, Gaz: 18, Dean: 7 },
      { date: '21/12/2024', Sean: 24, Joe: 19, Gaz: 18, Dean: 7 },
      { date: '26/12/2024', Sean: 24, Joe: 20, Gaz: 19, Dean: 7 },
      { date: '29/12/2024', Sean: 25, Joe: 20, Gaz: 21, Dean: 7 },
      { date: '04/01/2025', Sean: 26, Joe: 20, Gaz: 22, Dean: 8 },
      { date: '10/01/2025', Sean: 27, Joe: 20, Gaz: 23, Dean: 10 },
      { date: '14/01/2025', Sean: 28, Joe: 21, Gaz: 24, Dean: 10 },
      { date: '18/01/2025', Sean: 29, Joe: 22, Gaz: 25, Dean: 11 },
      { date: '25/01/2025', Sean: 29, Joe: 23, Gaz: 25, Dean: 12 },
      { date: '01/02/2025', Sean: 30, Joe: 25, Gaz: 25, Dean: 14 },
      { date: '08/02/2025', Sean: 32, Joe: 26, Gaz: 26, Dean: 15 },
      { date: '15/02/2025', Sean: 33, Joe: 26, Gaz: 27, Dean: 15 },
      { date: '22/02/2025', Sean: 34, Joe: 27, Gaz: 28, Dean: 15 },
      { date: '25/02/2025', Sean: 34, Joe: 29, Gaz: 30, Dean: 16 },
      { date: '01/03/2025', Sean: 34, Joe: 31, Gaz: 32, Dean: 17 }
    ],
    playerStats: {
      'Sean': {
        totalBets: 21,
        wins: 11,
        losses: 10,
        winPercentage: 52.4,
        betTypeSuccessData: [
          { type: 'Full Time Result', successRate: 55, total: 11, wins: 6 },
          { type: 'Over 2.5 Goals', successRate: 100, total: 4, wins: 4 },
          { type: 'Both Teams to Score', successRate: 0, total: 6, wins: 0 }
        ]
      },
      'Joe': {
        totalBets: 19,
        wins: 12,
        losses: 7,
        winPercentage: 63.2,
        betTypeSuccessData: [
          { type: 'Full Time Result', successRate: 60, total: 15, wins: 9 },
          { type: 'Both Teams to Score', successRate: 100, total: 3, wins: 3 },
          { type: 'Over 2.5 Goals', successRate: 0, total: 1, wins: 0 }
        ]
      },
      'Gaz': {
        totalBets: 19,
        wins: 13,
        losses: 6,
        winPercentage: 68.4,
        betTypeSuccessData: [
          { type: 'Full Time Result', successRate: 66.7, total: 15, wins: 10 },
          { type: 'Both Teams to Score', successRate: 100, total: 4, wins: 4 }
        ]
      },
      'Dean': {
        totalBets: 19,
        wins: 10,
        losses: 9,
        winPercentage: 52.6,
        betTypeSuccessData: [
          { type: 'Full Time Result', successRate: 52.6, total: 18, wins: 9 },
          { type: 'Both Teams to Score', successRate: 0, total: 1, wins: 0 }
        ]
      }
    },
    bets: [
      { player: 'Dean', match: 'Bologna v Cagliari', score: '2-1', betType: 'Full Time Result: Bologna', outcome: 'Win' },
      { player: 'Dean', match: 'Nottm Forest v Ipswich', score: '1-1', betType: 'Full Time Result: Nottm Forest', outcome: 'Loss' },
      { player: 'Joe', match: 'Almere City FC v Ajax', score: '0-1', betType: 'Full Time Result: Ajax', outcome: 'Win' },
      { player: 'Joe', match: 'Huesca v Racing Ferrol', score: '3-1', betType: 'Full Time Result: Huesca', outcome: 'Win' },
      { player: 'Gaz', match: 'Doncaster v Newport County', score: '3-0', betType: 'Full Time Result: Doncaster', outcome: 'Win' },
      { player: 'Gaz', match: 'St Etienne v Nice', score: '1-3', betType: 'Full Time Result: Nice', outcome: 'Win' },
      { player: 'Sean', match: 'Feyenoord v NEC', score: '0-0', betType: 'Full Time Result: Feyenoord', outcome: 'Loss' },
      { player: 'Dean', match: 'Manchester Utd v Ipswich', score: '3-2', betType: 'Full Time Result: Manchester Utd', outcome: 'Win' },
      { player: 'Gaz', match: 'Brentford v Everton', score: '1-1', betType: 'Both Teams To Score: Yes', outcome: 'Win' },
      { player: 'Sean', match: 'Wrexham v Peterborough', score: '2-2', betType: 'Full Time Result: Wrexham', outcome: 'Loss' }
    ]
  };

  const [data, setData] = useState(sampleData);
  const [selectedPlayer, setSelectedPlayer] = useState('Sean');
  const [activeTab, setActiveTab] = useState('standings');
  const [loading, setLoading] = useState(false);

  // Colors for charts
  const PLAYER_COLORS = {
    Sean: '#8884d8',
    Joe: '#82ca9d',
    Gaz: '#ffc658',
    Dean: '#ff8042'
  };

  // Colors for pie chart
  const BET_TYPE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const fetchData = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch data from your file or API
      // For demonstration, we'll simulate a delay and use sample data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // We're using the sample data instead of reading from file
      setData(sampleData);
      
    } catch (error) {
      console.error('Error processing data:', error);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
    fetchData();
  }, []);

  // Calculate overall league statistics
  const calculateLeagueStats = () => {
    if (!data.playerStats) return null;
    
    const players = Object.keys(data.playerStats);
    const totalBets = players.reduce((total, player) => total + data.playerStats[player].totalBets, 0);
    const totalWins = players.reduce((total, player) => total + data.playerStats[player].wins, 0);
    
    return {
      totalBets,
      totalWins,
      averageWinRate: totalBets > 0 ? parseFloat((totalWins / totalBets * 100).toFixed(1)) : 0
    };
  };
  
  const leagueStats = calculateLeagueStats();
  
  // For pie chart of bet type distribution
  const prepareBetTypeData = (player) => {
    if (!data.playerStats || !data.playerStats[player]) return [];
    
    // In the sample data, we don't have the exact betTypes counts
    // In a real implementation, you would extract this from the parsed data
    const betTypes = data.playerStats[player].betTypeSuccessData.map(item => ({
      name: item.type,
      value: item.total
    }));
    
    return betTypes;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Super Cool Betting Club Dashboard</h1>
        <button 
          onClick={fetchData} 
          disabled={loading}
          className="flex items-center bg-white text-blue-600 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
        >
          <RefreshCw className={`h-5 w-5 mr-1 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Reload Data'}
        </button>
      </header>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <button 
          className={`px-4 py-2 mx-2 rounded-md ${activeTab === 'standings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('standings')}
        >
          League Table
        </button>
        <button 
          className={`px-4 py-2 mx-2 rounded-md ${activeTab === 'progression' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('progression')}
        >
          Points Progression
        </button>
        <button 
          className={`px-4 py-2 mx-2 rounded-md ${activeTab === 'playerStats' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('playerStats')}
        >
          Player Statistics
        </button>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <RefreshCw className="h-12 w-12 animate-spin mx-auto text-blue-500 mb-4" />
              <p className="text-lg text-gray-600">Loading betting data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* League Table Tab */}
            {activeTab === 'standings' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Current Standings</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-3 text-left">Position</th>
                        <th className="p-3 text-left">Player</th>
                        <th className="p-3 text-right">Points</th>
                        <th className="p-3 text-right">Bets</th>
                        <th className="p-3 text-right">Win %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.finalStandings.map((standing, index) => (
                        <tr key={standing.player} className="border-b hover:bg-gray-50">
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3 font-medium">{standing.player}</td>
                          <td className="p-3 text-right">{standing.points}</td>
                          <td className="p-3 text-right">
                            {data.playerStats[standing.player]?.totalBets || 0}
                          </td>
                          <td className="p-3 text-right">
                            {data.playerStats[standing.player]?.winPercentage || 0}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Summary Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-blue-700 mb-2">Total Bets</h3>
                    <p className="text-3xl font-bold">{leagueStats?.totalBets || 0}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-green-700 mb-2">Total Wins</h3>
                    <p className="text-3xl font-bold">{leagueStats?.totalWins || 0}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-purple-700 mb-2">Average Win Rate</h3>
                    <p className="text-3xl font-bold">{leagueStats?.averageWinRate || 0}%</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Progression Tab */}
            {activeTab === 'progression' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Points Progression</h2>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.progressionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {data.finalStandings.map(player => (
                        <Line
                          key={player.player}
                          type="monotone"
                          dataKey={player.player}
                          stroke={PLAYER_COLORS[player.player] || '#000'}
                          activeDot={{ r: 8 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Recent Results */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2">Recent Results</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 text-left">Player</th>
                          <th className="p-2 text-left">Match</th>
                          <th className="p-2 text-left">Bet Type</th>
                          <th className="p-2 text-center">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.bets.slice(0, 10).map((bet, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="p-2">{bet.player}</td>
                            <td className="p-2">{bet.match} ({bet.score})</td>
                            <td className="p-2">{bet.betType}</td>
                            <td className={`p-2 text-center font-medium ${bet.outcome === 'Win' ? 'text-green-600' : 'text-red-600'}`}>
                              {bet.outcome}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Player Stats Tab */}
            {activeTab === 'playerStats' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Player Statistics</h2>
                
                {/* Player Selector */}
                <div className="flex justify-center mb-6">
                  {data.finalStandings.map(player => (
                    <button
                      key={player.player}
                      className={`px-4 py-2 mx-2 rounded-md ${selectedPlayer === player.player ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => setSelectedPlayer(player.player)}
                    >
                      {player.player}
                    </button>
                  ))}
                </div>
                
                {selectedPlayer && data.playerStats[selectedPlayer] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Player Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium mb-3">{selectedPlayer}'s Performance</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-3 rounded shadow">
                          <p className="text-sm text-gray-600">Total Bets</p>
                          <p className="text-2xl font-bold">{data.playerStats[selectedPlayer].totalBets}</p>
                        </div>
                        <div className="bg-white p-3 rounded shadow">
                          <p className="text-sm text-gray-600">Win Rate</p>
                          <p className="text-2xl font-bold">{data.playerStats[selectedPlayer].winPercentage}%</p>
                        </div>
                        <div className="bg-white p-3 rounded shadow">
                          <p className="text-sm text-gray-600">Wins</p>
                          <p className="text-2xl font-bold text-green-600">{data.playerStats[selectedPlayer].wins}</p>
                        </div>
                        <div className="bg-white p-3 rounded shadow">
                          <p className="text-sm text-gray-600">Losses</p>
                          <p className="text-2xl font-bold text-red-600">{data.playerStats[selectedPlayer].losses}</p>
                        </div>
                      </div>
                      
                      <h4 className="text-md font-medium mb-2">Bet Type Distribution</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={prepareBetTypeData(selectedPlayer)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {prepareBetTypeData(selectedPlayer).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={BET_TYPE_COLORS[index % BET_TYPE_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`${value} bets`, name]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    {/* Success Rate by Bet Type */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium mb-3">Success Rate by Bet Type</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={data.playerStats[selectedPlayer].betTypeSuccessData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis domain={[0, 100]} label={{ value: 'Success Rate (%)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value) => [`${value}%`, 'Success Rate']} />
                            <Bar dataKey="successRate" fill="#8884d8">
                              {data.playerStats[selectedPlayer].betTypeSuccessData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.successRate > 50 ? '#82ca9d' : '#ff8042'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    {/* Recent Bets History */}
                    <div className="col-span-1 md:col-span-2 bg-gray-50 p-4 rounded-lg shadow mt-4">
                      <h3 className="text-lg font-medium mb-3">Recent Betting History</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="p-2 text-left">Match</th>
                              <th className="p-2 text-left">Bet Type</th>
                              <th className="p-2 text-center">Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.bets
                              .filter(bet => bet.player === selectedPlayer)
                              .slice(0, 8)
                              .map((bet, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                  <td className="p-2">{bet.match} ({bet.score})</td>
                                  <td className="p-2">{bet.betType}</td>
                                  <td className={`p-2 text-center font-medium ${bet.outcome === 'Win' ? 'text-green-600' : 'text-red-600'}`}>
                                    {bet.outcome}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Super Cool Betting Club Dashboard © 2025 • Last updated: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default BettingDashboard;
