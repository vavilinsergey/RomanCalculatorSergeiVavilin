function calculator(string) {
  const inputString = string;
  const romanToArabicAlphabet = {
  "I": "1",
  "II": "2",
  "III": "3",
  "IV": "4",
  "V": "5",
  "VI": "6",
  "VII": "7",
  "VIII": "8",
  "IX": "9",
  "X": "10",
  "*": "*",
  "+": "+",
  "/": "/",
  "-": "-"
  }; 

  function isArabicOrRoman(str) {
    if (/^[\d+\-*/.\s]+$/.test(str)) {
      return 'arabic';    
    } else if (/^[IVX+\-*/.\s]+$/i.test(str)) {
      return 'roman';
    } else {
      return 'mixed';
    }
  } //  функция определяет невзирая на символы арабская или римская строка

  switch (isArabicOrRoman(inputString)){
    case 'arabic'://арабские
      
    case 'roman'://римские
      
    default://смешанные
      console.log('error');//допилить в аларм
      
  }

module.exports = calculator; // Не трогайте эту строчку
/*
План v3:
  Проверяем строку на арабскую, римскую и смешанную регуляркой
    Main Switch:
      Смешанные: 
        - Еррор
      Арабские:
        - Проверяем выражение на корректность с помощью регулярки
        - Проверяем выражение на только положительные
        - Вычисляем
        - Округляем
        - Выводим
      Римские:
        - Переводим в арабские, символы слева и справа  
    
План v2:
- приводим выражение к арабским цифрам, формируем две строки - арабские и римские, если обе больше 0 - ошибка  
- разделяем вычисления для арабских и римских
- проверяем значения < 11  
  проверяем что число целое
* const regex = /^[1-9]\s*[\+\-\*\/]\s*[1-9]$|^10\s*[\+\-\*\/]\s*[1-9]$|^[1-9]\s*[\+\-\*\/]\s*10$/;
- вычисляем результат
- округляем значение до целого ,


const arabicToRomanAlphabet = { //алфавит рим - араб
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X"
  };