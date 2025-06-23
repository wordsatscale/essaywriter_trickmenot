import React from 'react';

const IframeEmbed: React.FC = () => {
  return (
    <div className="essay-writer-embed">
      <iframe
        src="https://animated-malabi-6c4b2c.netlify.app"
        width="100%"
        height="800"
        frameBorder="0"
        title="TrickMeNot AI Essay Writer"
        style={{
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        }}
      />
    </div>
  );
};

export default IframeEmbed;