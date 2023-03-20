function calculator(string) {

  let inputString = string.replace(/\s/g, "");//костыль, который убирает из строки все пробелы, потому что я забыл об этом и тестил на примерах вида 1+1
  const alphabetRomanArabic = new Map([
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1]
]);//алфавит

  const mainRegex = /^([1-9]|10)\s*[\+\-\*\/]\s*([1-9]|10)$/;
//регулярка для проверки араб-символ-араб, операнды макс 10

  function isArabicOrRoman(str) {
  if (/^[\d+\-*/.\s]+$/.test(str)) {
    return 'arabic';    
  } else if (/^[IVX+\-*/.\s]+$/i.test(str)) {
    return 'roman';
  } else {
    return 'mixed';
  }
} //определяет арабская или римская строка (пробелы и математические операторы не в счет)

  switch (isArabicOrRoman(inputString)){
//Main switch, разделяем вычисления в зависимости от типа строки, чтобы знать в каком виде давать результат
      
    case 'arabic'://в случае только арабских цифр, изи
      if (mainRegex.test(inputString)) {//тестирует через mainRegex
        const result = eval(inputString);
        return Math.floor(result).toString(); // округляет через floor
      } else {
        throw new Error('error arabic wrong main regex');
      };
      
    case 'roman': // в случае только римских
      
      function romanToArabic(roman) {//функция принимает только числа и возвращает арабское написание
        let num = 0;
        for (let [romanDigit, arabicValue] of alphabetRomanArabic) {
          while (roman.startsWith(romanDigit)) {
            num += arabicValue;
            roman = roman.slice(romanDigit.length);
          }
        }
        return num;
      };// принимает только числа и возвращает арабское написание      
    
      function preparationToCalc(arr) {
        const processedArr = arr.map((str) => {
          if (/[\-+*/]/.test(str)) {
            return str;
          } else {
            return romanToArabic(str);
          }
        });
        const resultStr = processedArr.join('');
        return resultStr;
      };// принимает splitString и возвращает готовую к вычислениям строку

      function arabicToRoman(num) {
        if (num <= 0) {
          return '';
        }
        let roman = '';
        for (let [romanDigit, arabicValue] of alphabetRomanArabic) {
          while (num >= arabicValue) {
            roman += romanDigit;
            num -= arabicValue;
          }
        }
        return roman;
      };// принимает арабское число и возвращает римское строкой, если меньше или равно 0 - возвращает пустую строку

      function mainLogic (string) {
        const splitString = string.split(/([-/*+])/);//разбил на операнды
        let stringToCalc = preparationToCalc(splitString);//запишем подготовленную строку
        let result;//сюда запишем значение выражения
        if (mainRegex.test(stringToCalc)) {//тестирует через mainRegex
           const mathResult = eval(stringToCalc);//результат вычислений дробный
           result = Math.floor(mathResult); // финальный результат вычислений
        } else {
          throw new Error('error romanian wrong main regex');
        }   
        return arabicToRoman(result);//пропустим через функцию обратной конвертации в римские
      };// собирает остальные функции 
      
      return (mainLogic(inputString)).toString();//выводим результат работы ветки
      
    default://если смешанные и вычислять дальше нет смысла
      throw new Error('error mixed numbers');     
  } 
}
/*
План v3:
  Проверяем строку на арабскую, римскую и смешанную регуляркой DONE
    Main Switch:
      Смешанные: 
        - Еррор
      Арабские:
        - Проверяем выражение на корректность с помощью регулярки
         - нет? эррор
        - Вычисляем
        - Округляем
        - Выводим
      Римские:
        - Разбиваю строку на массив, разделитель - знаки -+/*, сделал потому, что не мог реализовать римск->арабск вместе с символами
        - Проходим по значениям массива отличных от -+/* с помощью функции, которая переводит из Римских в арабские, подготавливая для вычислений
        - Проверяем через mainRegex
          - нет? эррор
        - Вычисляем, округляем
        - Переводим обратно в Римские, проверив число на <=0
*/          
module.exports = calculator; // Не трогайте эту строчку