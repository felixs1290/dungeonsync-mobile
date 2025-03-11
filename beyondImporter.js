// beyondImporter.js
const processBeyondCharacter = (jsonData) => {
    try {
      const character = jsonData.data; // D&D Beyond JSON uses 'data' as root in v3
      if (!character) throw new Error('Invalid D&D Beyond JSON format');
  
      const parsedCharacter = {
        name: character.name || 'Unnamed Character',
        photo: character.avatarUrl || '', // Avatar URL if available
        // Add more fields as needed later (e.g., class, level)
      };
  
      return parsedCharacter;
    } catch (error) {
      console.error('Error processing D&D Beyond JSON:', error);
      return null;
    }
  };
  
  export default processBeyondCharacter;