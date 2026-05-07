import React, { useState, useRef } from 'react';
import { Search, FileText, Globe, Loader2, UploadCloud, X, Image as ImageIcon, FileCode, FileType } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (content: string, isUrl: boolean, mimeType?: string) => void;
  loading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, loading }) => {
  const [activeTab, setActiveTab] = useState<'url' | 'text'>('url');
  const [inputValue, setInputValue] = useState('');
  const [mimeType, setMimeType] = useState<string>('text/plain');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // For URL tab, isUrl is true
    // For Text tab, isUrl is false, mimeType comes from file or is text/plain
    if (activeTab === 'url') {
        onAnalyze(inputValue, true);
    } else {
        onAnalyze(inputValue, false, mimeType);
    }
  };

  const handleResetFile = () => {
      setInputValue('');
      setFileName(null);
      setMimeType('text/plain');
      if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    
    // Robust MIME type detection
    let type = file.type;
    if (!type) {
       const ext = file.name.split('.').pop()?.toLowerCase();
       if (ext === 'pdf') type = 'application/pdf';
       else if (ext === 'html' || ext === 'htm') type = 'text/html';
       else if (ext === 'txt') type = 'text/plain';
       else if (ext === 'csv') type = 'text/csv';
       else if (ext === 'md') type = 'text/markdown';
    }
    setMimeType(type || 'text/plain');

    const reader = new FileReader();
    
    // We treat PDF, Images, and HTML as "Binary/Attachments" to be sent as inlineData.
    // HTML is treated as binary so it appears as a "File" card and the AI receives the full document structure,
    // rather than the user seeing raw HTML tags in the textarea.
    const isAttachment = 
        type.includes('pdf') || 
        type.startsWith('image/') || 
        type.includes('html');

    reader.onload = (event) => {
      const result = event.target?.result as string;
      setInputValue(result);
      setActiveTab('text');
    };

    if (isAttachment) {
        reader.readAsDataURL(file);
    } else {
        reader.readAsText(file);
    }
  };

  const isAttachmentFile = fileName && (
      mimeType.startsWith('image/') || 
      mimeType.includes('pdf') || 
      mimeType.includes('html')
  );

  const getFileIcon = () => {
      if (mimeType.includes('pdf')) return <FileType className="w-8 h-8 text-red-400" />;
      if (mimeType.includes('html')) return <Globe className="w-8 h-8 text-orange-400" />;
      if (mimeType.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-military-accent" />;
      return <FileText className="w-8 h-8 text-slate-400" />;
  };

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-military-800 border border-slate-700 rounded-lg overflow-hidden shadow-2xl">
        
        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'url' ? 'bg-military-700 text-military-accent' : 'text-slate-500 hover:text-slate-300 hover:bg-military-800'
            }`}
          >
            <Globe className="w-4 h-4" /> URL Analysis
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'text' ? 'bg-military-700 text-military-accent' : 'text-slate-500 hover:text-slate-300 hover:bg-military-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" /> File / Text Upload
          </button>
        </div>

        {/* Input Area */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'url' ? (
              <div className="relative">
                <input
                  type="url"
                  placeholder="Paste article URL here..."
                  className="w-full bg-military-900 border border-slate-600 rounded p-4 pl-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-military-accent focus:ring-1 focus:ring-military-accent transition-all font-mono"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              </div>
            ) : (
              <div className="relative">
                {isAttachmentFile ? (
                   <div className="w-full bg-military-900 border border-slate-600 border-dashed rounded p-8 h-48 flex flex-col items-center justify-center text-slate-300 gap-3 relative group animate-in fade-in">
                      <div className="bg-military-800 p-4 rounded-full shadow-lg border border-slate-700">
                         {getFileIcon()}
                      </div>
                      <div className="text-center">
                        <span className="font-mono text-sm block font-bold text-white">{fileName}</span>
                        <span className="text-xs text-slate-500 uppercase">{mimeType}</span>
                        {mimeType.includes('html') && <span className="block text-[10px] text-orange-400 mt-1">Ingesting as Web Document</span>}
                      </div>
                      <button 
                        type="button" 
                        onClick={handleResetFile}
                        className="absolute top-2 right-2 text-slate-500 hover:text-red-400 p-2 transition-colors"
                        title="Remove file"
                      >
                         <X className="w-5 h-5" />
                      </button>
                   </div>
                ) : (
                   <textarea
                    placeholder="Paste article text here or upload a file (PDF, HTML, Image)..."
                    className="w-full bg-military-900 border border-slate-600 rounded p-4 h-48 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-military-accent focus:ring-1 focus:ring-military-accent transition-all font-mono text-sm"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                   />
                )}
                
                <div className="absolute bottom-4 right-4 flex gap-2">
                   <label className={`cursor-pointer text-xs font-bold uppercase transition-colors px-3 py-1.5 rounded border flex items-center gap-2 ${
                       isAttachmentFile ? 'bg-slate-800 text-slate-500 border-slate-700 hover:text-slate-300' : 'bg-military-800 text-military-accent border-slate-600 hover:border-slate-400 hover:text-white'
                   }`}>
                      <UploadCloud className="w-3 h-3" />
                      {isAttachmentFile ? 'Replace File' : 'Upload File'}
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".txt,.pdf,.html,.htm,.jpg,.jpeg,.png,.webp,.csv,.md" 
                        className="hidden" 
                        onChange={handleFileUpload} 
                      />
                   </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="w-full bg-military-accent hover:bg-sky-400 text-white font-bold py-4 rounded uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-sky-900/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Executing Forensic Protocol...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" /> Initiate Scan
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputSection;