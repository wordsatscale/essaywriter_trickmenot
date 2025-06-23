import React from 'react';

interface MarkdownOutputProps {
  content: string;
}

const MarkdownOutput: React.FC<MarkdownOutputProps> = ({ content }) => {
  // Very simple markdown renderer
  const renderMarkdown = (text: string) => {
    // Convert headings
    text = text.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold my-3">$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold my-4">$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold my-4">$1</h1>');
    
    // Convert paragraphs
    text = text.replace(/^\s*(\n)?(.+)/gim, function(m) {
      return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img|p)/.test(m) ? m : '<p class="my-2">' + m + '</p>';
    });
    
    // Convert bold and italic
    text = text.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    text = text.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // Convert lists
    text = text.replace(/^\s*-\s*(.*)/gim, '<ul class="list-disc ml-5 my-2"><li>$1</li></ul>');
    text = text.replace(/^\s*\d+\.\s*(.*)/gim, '<ol class="list-decimal ml-5 my-2"><li>$1</li></ol>');
    
    // Convert line breaks
    text = text.replace(/\n/gim, '<br>');
    
    // Cleanup for adjacent lists
    text = text.replace(/<\/ul><br><ul class="list-disc ml-5 my-2">/g, '');
    text = text.replace(/<\/ol><br><ol class="list-decimal ml-5 my-2">/g, '');
    
    return text;
  };

  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};

export default MarkdownOutput;