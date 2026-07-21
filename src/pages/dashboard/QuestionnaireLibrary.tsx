import { Search, Filter, Edit3 } from 'lucide-react';
import { useState } from 'react';

import imgCoreValues from '../../cards7sens/valeurs/vfamille.png';
import imgAttraction from '../../cards7sens/craquer/ccharisme.png';
import imgDealBreakers from '../../cards7sens/Fuir/fmensonge.png';
import imgFlaws from '../../cards7sens/Default/distrait.png';
import imgDreams from '../../cards7sens/dream/rveillir.png';
import imgLoveLanguage from '../../cards7sens/Besoin/Baffection.png';
import imgLifestyle from '../../cards7sens/dream/rborddemer.png';
import imgRelationshipVision from '../../cards7sens/dream/ramesoeur.png';

// Hardcoded for MVP based on Matchmaking Engine Specification
const MOCK_CATEGORIES = [
  { id: 1, name: 'My Core Values', image: imgCoreValues, weight: 25, selectionLimit: 5, answersCount: 15, description: 'Identifies the principles that are most important to the user in life and in a relationship.' },
  { id: 2, name: 'What Makes Me Fall for Someone', image: imgAttraction, weight: 20, selectionLimit: 5, answersCount: 15, description: 'Identifies the qualities that naturally create attraction for the user.' },
  { id: 3, name: 'My Biggest Deal Breakers', image: imgDealBreakers, weight: 20, selectionLimit: 5, answersCount: 15, description: 'Identifies behaviours or characteristics that the user considers unacceptable.' },
  { id: 4, name: 'My Flaws', image: imgFlaws, weight: 5, selectionLimit: 3, answersCount: 15, description: 'Allows users to identify personality traits they recognise in themselves.' },
  { id: 5, name: 'My Dreams', image: imgDreams, weight: 5, selectionLimit: 3, answersCount: 15, description: 'Identifies the user’s most important personal aspirations and life ambitions.' },
  { id: 6, name: 'My Love Language', image: imgLoveLanguage, weight: 8, selectionLimit: 3, answersCount: 15, description: 'Identifies how the user prefers to give and receive affection.' },
  { id: 7, name: 'My Lifestyle', image: imgLifestyle, weight: 7, selectionLimit: 3, answersCount: 15, description: 'Describes the user’s preferred daily rhythm, habits and environment.' },
  { id: 8, name: 'Relationship Vision', image: imgRelationshipVision, weight: 10, selectionLimit: 3, answersCount: 15, description: 'Identifies the type of relationship and future the user wants to build.' },
];

export const QuestionnaireLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<typeof MOCK_CATEGORIES[0] | null>(null);

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    setCategories(prev => prev.map(c => c.id === editingCategory.id ? editingCategory : c));
    setEditingCategory(null);
  };

  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-serif text-[var(--color-navy)]">Questionnaire Library</h1>
        <p className="text-gray-500">Manage the 8 matchmaking categories, answers, and scoring weights.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 shadow-sm border border-gray-100">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white border border-gray-100 shadow-sm flex flex-col group relative overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-0"></div>
              <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            
            <div className="p-5 flex flex-col flex-1 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center font-bold font-serif text-lg">
                  {category.id}
                </div>
                <h3 className="font-semibold text-[#1a2b49] text-lg leading-tight pr-6">{category.name}</h3>
              </div>
              <p className="text-sm text-gray-500 flex-1">{category.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-gray-50">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Weighting</span>
                  <span className="text-sm font-medium text-gray-900">{category.weight}%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Max Select</span>
                  <span className="text-sm font-medium text-gray-900">{category.selectionLimit} answers</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2 mt-2">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Available Answers</span>
                  <span className="text-sm font-medium text-gray-900">{category.answersCount} total</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 p-0 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setEditingCategory({...category})}
                className="w-full py-3 text-sm font-semibold text-[var(--color-navy)] hover:text-[#C9A84C] hover:bg-orange-50/50 flex items-center justify-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
              >
                <Edit3 size={16} />
                Edit Category
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg shadow-2xl rounded-none flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-serif text-[var(--color-navy)]">Edit Category: {editingCategory.id}</h2>
              <button onClick={() => setEditingCategory(null)} className="text-gray-400 hover:text-gray-600 bg-transparent border-none text-xl cursor-pointer p-2">&times;</button>
            </div>
            
            <form onSubmit={handleSaveCategory} className="p-6 flex flex-col gap-5 overflow-y-auto">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Category Name</label>
                <input 
                  type="text" 
                  value={editingCategory.name}
                  onChange={e => setEditingCategory({...editingCategory, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#C9A84C] text-sm"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea 
                  value={editingCategory.description}
                  onChange={e => setEditingCategory({...editingCategory, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#C9A84C] text-sm resize-none h-24"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Weight (%)</label>
                  <input 
                    type="number" 
                    value={editingCategory.weight}
                    onChange={e => setEditingCategory({...editingCategory, weight: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#C9A84C] text-sm"
                    min="0" max="100" required
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Selection Limit</label>
                  <input 
                    type="number" 
                    value={editingCategory.selectionLimit}
                    onChange={e => setEditingCategory({...editingCategory, selectionLimit: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-200 focus:outline-none focus:border-[#C9A84C] text-sm"
                    min="1" max="15" required
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setEditingCategory(null)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors border-none cursor-pointer text-sm">
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
