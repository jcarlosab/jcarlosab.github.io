const calculateTaskResults = (results) => {
  if (!results?.length) return { 
    text: 'Sin votos', 
    scores: [], 
    average: 0,
    recommended: null 
  };
  
  // ⭐ Filtrar votos, excluyendo "?" del cálculo
  const validScores = results
    .filter(v => v.score !== '?')
    .map(v => v.score);
  
  // Si no hay votos válidos (todos votaron "?")
  if (validScores.length === 0) {
    return {
      text: 'Todos pasaron la votación',
      scores: [],
      average: 0,
      recommended: null
    };
  }
  
  const average = validScores.reduce((a, b) => a + b, 0) / validScores.length;
  
  const fibonacciNumbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  
  const recommended = fibonacciNumbers.reduce((prev, curr) => {
    return Math.abs(curr - average) < Math.abs(prev - average) ? curr : prev;
  });
  
  return {
    text: `Recomendado: ${recommended}`,
    scores: validScores,
    average: parseFloat(average.toFixed(1)),
    recommended
  };
};

export default calculateTaskResults;