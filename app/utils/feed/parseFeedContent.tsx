export const parseContent = (content: string) => {
  // Split the content by spaces while keeping the punctuation with the words
  const words = content.split(/(\s+)/);

  // Map through the words and return either a highlighted span or plain text
  return words.map((word, index) => {
    const key = `${word}-${index}`;
    if (word.startsWith("@") || word.startsWith("#")) {
      return (
        <span
          key={key}
          className="text-blue-500 hover:text-blue-600 cursor-pointer"
        >
          {word}
        </span>
      );
    }
    return word;
  });
};
