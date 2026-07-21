import { Search, Filter, Edit3 } from 'lucide-react';
import { useState } from 'react';

type QuestionType = 'Profile' | 'Post-Date';

interface Question {
  id: string;
  type: QuestionType;
  title: string;
  question: string;
  selectionLimit: number;
  options: string[];
}

const PROFILE_QUESTIONS: Question[] = [
  {
    id: 'P1', type: 'Profile', title: 'What are you looking for today?', question: 'What best describes what you\'re looking for right now?', selectionLimit: 1,
    options: ['The love of my life', 'A serious relationship', 'Open to seeing where things go', 'Meeting new people', 'Casual dating', 'I\'m not sure yet']
  },
  {
    id: 'P2', type: 'Profile', title: 'Choose Your 3 Core Values', question: 'What are the three values that define you the most?', selectionLimit: 3,
    options: ['Honesty', 'Respect', 'Family', 'Freedom', 'Kindness', 'Loyalty', 'Authenticity', 'Adventure', 'Stability', 'Sense of Humor', 'Spirituality', 'Personal Growth', 'Creativity', 'Ambition', 'Independence']
  },
  {
    id: 'P3', type: 'Profile', title: 'Which qualities attract you the most?', question: 'What qualities make you fall for someone?', selectionLimit: 2,
    options: ['Honesty', 'Kindness', 'Intelligence', 'Sense of Humor', 'Confidence', 'Authenticity', 'Emotional Maturity', 'Ambition', 'Passion', 'Loyalty', 'Calmness', 'Open-mindedness', 'Generosity', 'Adventurous Spirit', 'Good Communication']
  },
  {
    id: 'P4', type: 'Profile', title: 'Your Biggest Deal Breakers', question: 'What would immediately make a relationship impossible for you?', selectionLimit: 2,
    options: ['Lies', 'Infidelity', 'Lack of Respect', 'Manipulation', 'Jealousy', 'Violence or Aggression', 'Lack of Communication', 'Selfishness', 'Addiction', 'Emotional Immaturity', 'Lack of Ambition', 'Dishonesty', 'Excessive Control', 'Negativity', 'Lack of Commitment']
  },
  {
    id: 'P5', type: 'Profile', title: 'Your Biggest Dreams', question: 'If everything were possible, what would you most like to build in your life?', selectionLimit: 2,
    options: ['Grow Old Together', 'Build a Happy Family', 'Travel the World', 'Achieve Financial Freedom', 'Start My Own Business', 'Buy My Dream Home', 'Change Country and Start a New Life', 'Help Others Make a Difference', 'Find My Soulmate', 'Live a Peaceful Life', 'Leave a Positive Legacy', 'Create Something Meaningful', 'Have Children', 'Live Close to Nature', 'Wake Up Every Day Happy']
  },
  {
    id: 'P6', type: 'Profile', title: 'Your Biggest Flaws', question: 'Which flaws best describe you?', selectionLimit: 2,
    options: ['Stubborn', 'Impatient', 'Too Sensitive', 'Overthinker', 'Perfectionist', 'Too Independent', 'Too Direct', 'Shy', 'Distracted', 'Jealous', 'Workaholic', 'Reserved', 'Impulsive', 'Disorganized', 'Too Trusting']
  },
  {
    id: 'P7', type: 'Profile', title: 'How do you express love?', question: 'How do you naturally express love and affection?', selectionLimit: 1,
    options: ['Quality Time', 'Physical Touch', 'Words of Affirmation', 'Receiving Gifts', 'Acts of Service']
  },
  {
    id: 'P8', type: 'Profile', title: 'How do you usually handle conflict?', question: 'When disagreements happen, how do you usually react?', selectionLimit: 1,
    options: ['I prefer discussing things immediately.', 'I need time before talking.', 'I try to avoid conflict.', 'I always look for compromise.', 'I sometimes struggle to communicate.']
  },
  {
    id: 'P9', type: 'Profile', title: 'Which lifestyle describes you best?', question: 'Which lifestyle best represents you?', selectionLimit: 1,
    options: ['Very calm', 'Mostly calm', 'Balanced', 'Active', 'Always on the go']
  },
  {
    id: 'P10', type: 'Profile', title: 'How do you usually make important decisions?', question: 'When making important decisions, what do you rely on the most?', selectionLimit: 1,
    options: ['Logic', 'Intuition', 'A balance of both']
  },
  {
    id: 'P11', type: 'Profile', title: 'How easily do you express your emotions?', question: 'How comfortable are you expressing your emotions?', selectionLimit: 1,
    options: ['Very easily', 'Fairly easily', 'Only with people I trust', 'With difficulty', 'I usually keep them to myself']
  },
  {
    id: 'P12', type: 'Profile', title: 'How important is family to you?', question: 'What role does family play in your life?', selectionLimit: 1,
    options: ['My highest priority', 'Very important', 'Important', 'Not very important', 'Not important at all']
  },
  {
    id: 'P13', type: 'Profile', title: 'Which statement best describes your financial mindset?', question: 'Which statement best describes your relationship with money?', selectionLimit: 1,
    options: ['I prefer saving money.', 'I enjoy spending and living in the moment.', 'I\'m balanced.', 'I prefer investing.', 'I take life one day at a time.']
  },
  {
    id: 'P14', type: 'Profile', title: 'What type of vacation do you enjoy most?', question: 'What type of holiday would you choose?', selectionLimit: 1,
    options: ['Beach', 'Mountains', 'Road Trip', 'City Break', 'Luxury Resort', 'Adventure Travel', 'I\'m happy with anything']
  },
  {
    id: 'P15', type: 'Profile', title: 'How spontaneous are you?', question: 'How spontaneous are you in everyday life?', selectionLimit: 1,
    options: ['I plan everything.', 'I like planning ahead.', 'A balance of both.', 'Very spontaneous.']
  },
  {
    id: 'P16', type: 'Profile', title: 'Do you want children?', question: 'What best describes your wishes regarding children?', selectionLimit: 1,
    options: ['Yes', 'No', 'Maybe', 'I already have children and don\'t want more.', 'I already have children and would like more.']
  },
  {
    id: 'P17', type: 'Profile', title: 'What is your vision of a relationship?', question: 'Which statement best represents your ideal relationship?', selectionLimit: 1,
    options: ['Sharing everything together.', 'Maintaining our independence.', 'A healthy balance between togetherness and independence.']
  },
  {
    id: 'P18', type: 'Profile', title: 'What is your biggest fear in love?', question: 'What worries you the most in a relationship?', selectionLimit: 1,
    options: ['Being cheated on.', 'Being abandoned.', 'Not being understood.', 'Losing my freedom.', 'Commitment.', 'Getting hurt.']
  },
  {
    id: 'P19', type: 'Profile', title: 'Which personal quality would you most like to improve?', question: 'If you could improve one aspect of yourself, what would it be?', selectionLimit: 1,
    options: ['Patience', 'Self-confidence', 'Communication', 'Courage', 'Organization', 'Empathy']
  },
  {
    id: 'P20', type: 'Profile', title: 'What kind of humor makes you laugh the most?', question: 'What type of humor do you enjoy the most?', selectionLimit: 1,
    options: ['Dark Humor', 'Wordplay', 'Absurd Situations', 'Self-deprecating Humor', 'Spontaneous People']
  },
  {
    id: 'P21', type: 'Profile', title: 'In a relationship, what do you need most to feel truly happy?', question: 'What are the three things you need most to feel fulfilled in a relationship?', selectionLimit: 3,
    options: ['To feel loved', 'To feel respected', 'To feel safe and secure', 'To be accepted for who I am', 'To grow together', 'To build a family', 'To laugh every day', 'To travel together', 'To feel supported', 'To have excellent communication', 'To share a strong friendship', 'To experience passion', 'To have stability', 'To have freedom', 'To share an intellectual connection', 'To share an emotional connection', 'To share a spiritual connection', 'To have an ambitious partner', 'To receive affection and tenderness', 'To admire and be admired by my partner']
  }
];

const POST_DATE_QUESTIONS: Question[] = [
  {
    id: 'PD1', type: 'Post-Date', title: 'Overall Connection', question: 'How strong was your connection with this person?', selectionLimit: 1,
    options: ['Exceptional connection', 'Strong connection', 'Good connection', 'Weak connection', 'No connection']
  },
  {
    id: 'PD2', type: 'Post-Date', title: 'Authenticity', question: 'How comfortable did you feel being yourself during the conversation?', selectionLimit: 1,
    options: ['Completely myself', 'Mostly myself', 'Neutral', 'Somewhat uncomfortable', 'Not myself at all']
  },
  {
    id: 'PD3', type: 'Post-Date', title: 'Relationship Potential', question: 'Can you realistically imagine building a relationship with this person?', selectionLimit: 1,
    options: ['Definitely', 'Probably', 'Maybe', 'Probably not', 'Definitely not']
  },
  {
    id: 'PD4', type: 'Post-Date', title: 'Physical Attraction', question: 'How physically attracted were you to this person?', selectionLimit: 1,
    options: ['Very attracted', 'Attracted', 'Neutral', 'Slightly attracted', 'Not attracted']
  },
  {
    id: 'PD5', type: 'Post-Date', title: 'Emotional Connection', question: 'Did you feel an emotional connection?', selectionLimit: 1,
    options: ['Very strong', 'Strong', 'Moderate', 'Weak', 'None']
  },
  {
    id: 'PD6', type: 'Post-Date', title: 'Shared Values', question: 'How well do you think your values and life goals align?', selectionLimit: 1,
    options: ['Excellent match', 'Good match', 'Unsure', 'Different', 'Completely different']
  },
  {
    id: 'PD7', type: 'Post-Date', title: 'Decision', question: 'What would you like to happen next?', selectionLimit: 1,
    options: ['Yes, I\'d like to exchange contact details.', 'Maybe, I\'d like more time to decide.', 'No, I don\'t wish to continue.']
  },
  {
    id: 'PD8', type: 'Post-Date', title: 'Why did you make this decision?', question: 'What was the main reason for your choice?', selectionLimit: 3,
    options: ['We had great chemistry.', 'I felt emotionally connected.', 'Our personalities matched well.', 'We shared similar values.', 'The conversation flowed naturally.', 'I found them physically attractive.', 'They made me feel comfortable.', 'They seemed genuine and authentic.', 'We have similar life goals.', 'We have compatible lifestyles.', 'I didn\'t feel enough chemistry.', 'Our personalities felt too different.', 'I wasn\'t physically attracted.', 'We wanted different things.', 'The conversation felt forced.', 'I couldn\'t be myself.', 'Other.']
  }
];

export const QuestionnaireLibrary = () => {
  const [activeTab, setActiveTab] = useState<'Profile' | 'Post-Date'>('Profile');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [profileQuestions, setProfileQuestions] = useState(PROFILE_QUESTIONS);
  const [postDateQuestions, setPostDateQuestions] = useState(POST_DATE_QUESTIONS);
  
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const activeQuestions = activeTab === 'Profile' ? profileQuestions : postDateQuestions;
  
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    
    if (editingQuestion.type === 'Profile') {
      setProfileQuestions(prev => prev.map(q => q.id === editingQuestion.id ? editingQuestion : q));
    } else {
      setPostDateQuestions(prev => prev.map(q => q.id === editingQuestion.id ? editingQuestion : q));
    }
    setEditingQuestion(null);
  };

  const filteredQuestions = activeQuestions.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-serif text-[var(--color-navy)]">Questionnaire Library</h1>
        <p className="text-gray-500">Manage the 21 Profile questions and 8 Post-Date feedback questions.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('Profile')}
          className={`pb-3 text-sm font-bold transition-colors border-b-2 ${
            activeTab === 'Profile' ? 'text-[#C9A84C] border-[#C9A84C]' : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Profile Questions (21)
        </button>
        <button
          onClick={() => setActiveTab('Post-Date')}
          className={`pb-3 text-sm font-bold transition-colors border-b-2 ${
            activeTab === 'Post-Date' ? 'text-[#C9A84C] border-[#C9A84C]' : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Post-Date Feedback (8)
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 shadow-sm border border-gray-100">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-none focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-shadow text-sm"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredQuestions.map((question) => (
          <div key={question.id} className="bg-white border border-gray-100 shadow-sm flex flex-col group relative overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 flex flex-col flex-1 gap-3">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#F9F6F0] text-[#C9A84C] flex items-center justify-center font-bold text-xs shrink-0">
                  {question.id.replace('P', '').replace('D', '')}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2b49] text-base leading-tight">{question.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{question.question}</p>
                </div>
              </div>
              
              <div className="mt-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Options ({question.options.length})</span>
                <ul className="mt-2 flex flex-col gap-1">
                  {question.options.slice(0, 3).map((opt, i) => (
                    <li key={i} className="text-xs text-gray-700 bg-gray-50 px-2 py-1 border border-gray-100 rounded-sm truncate">
                      • {opt}
                    </li>
                  ))}
                  {question.options.length > 3 && (
                    <li className="text-[10px] text-gray-400 italic px-2">
                      + {question.options.length - 3} more options...
                    </li>
                  )}
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Selection Limit</span>
                  <span className="text-sm font-medium text-gray-900">{question.selectionLimit} answer(s)</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 p-0 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setEditingQuestion({...question})}
                className="w-full py-3 text-sm font-semibold text-[var(--color-navy)] hover:text-[#C9A84C] hover:bg-orange-50/50 flex items-center justify-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
              >
                <Edit3 size={16} />
                Edit Question
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl shadow-2xl rounded-none flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-serif text-[var(--color-navy)]">Edit Question: {editingQuestion.id}</h2>
              <button onClick={() => setEditingQuestion(null)} className="text-gray-400 hover:text-gray-600 bg-transparent border-none text-xl cursor-pointer p-2">&times;</button>
            </div>
            
            <form onSubmit={handleSaveQuestion} className="p-6 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Internal Title</label>
                <input 
                  type="text" 
                  value={editingQuestion.title}
                  onChange={e => setEditingQuestion({...editingQuestion, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#C9A84C] text-sm"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Question Text (Displayed to User)</label>
                <textarea 
                  value={editingQuestion.question}
                  onChange={e => setEditingQuestion({...editingQuestion, question: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#C9A84C] text-sm resize-none h-20"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Selection Limit (How many answers can they choose?)</label>
                <input 
                  type="number" 
                  value={editingQuestion.selectionLimit}
                  onChange={e => setEditingQuestion({...editingQuestion, selectionLimit: parseInt(e.target.value) || 1})}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#C9A84C] text-sm"
                  min="1" max="15" required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700 flex justify-between items-center">
                  Options
                  <span className="text-[10px] text-gray-400 font-normal">Edit answers below. Separate by newlines.</span>
                </label>
                <textarea 
                  value={editingQuestion.options.join('\n')}
                  onChange={e => setEditingQuestion({...editingQuestion, options: e.target.value.split('\n').filter(Boolean)})}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#C9A84C] text-sm resize-none h-40"
                  required
                />
              </div>

              <div className="mt-4 flex gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setEditingQuestion(null)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors border-none cursor-pointer text-sm">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-[var(--color-navy)] text-white font-medium hover:bg-opacity-90 transition-colors border-none cursor-pointer text-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
