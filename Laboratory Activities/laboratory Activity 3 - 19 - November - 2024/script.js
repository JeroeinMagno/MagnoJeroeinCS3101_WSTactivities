const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');

textInput.addEventListener('input', () => {
    const text = textInput.value.trim();

    // Count words
    const words = text.split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = `Words: ${words.length}`;

    // Count sentences
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    sentenceCount.textContent = `Sentences: ${sentences.length}`;
});
