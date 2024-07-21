import inquirer from 'inquirer';

inquirer
  .prompt([
    // Prompt
    {
      name: "text",
      message: "Type your text:"
    }
  ])
  .then((answers) => {
    // Answer
    const text = answers.text; // answers = {text: <user input>}
    let outputs = [];  // to store output for each letter => [{letter: <letter>, occurrences: <occurrences>}, ...]
    let alreadyCounted; // to not repeat a letter in outputs array
    for(let i=0; i<text.length; i++) {
      if(text[i] === " ") {
        continue; // if space go to next iteration
      }
      alreadyCounted = false; // initially letter is not counted
      outputs.forEach((output) => { // inside for each loop to see if letter is counted
        if(output.letter === text[i]) { // if counted then
          output.occurrences++; // increase its occurrence
          alreadyCounted = true; // set alreadyCounted true
          return; // get out of for each loop
        }
      });
      !alreadyCounted && outputs.push({letter: text[i], occurrences: 1}); // if not counted then count it for the first time
    }
    /*
      after for loop
      outputs = [
        {
          letter: <single letter>
          occurrences: <number of occurrences of that letter>
        }, ...
      ]
    */
    console.log(outputs.length); //to print number of distinct letters
    let outputOccurrences = "", outputLetterOccurrences = "";
    outputs.forEach((output) => { // for each letter (or output) in outputs array
      outputOccurrences += `${output.occurrences} `; // add its occurrences into outputOccurrences string
    });
    outputs.forEach((output, index) => { // for each letter (or output) in outputs array
      (index !== 0) && (outputLetterOccurrences += ", "); // if not 1st output then add a comma and a space before next letter
      outputLetterOccurrences += `${output.letter}:${output.occurrences}` // add its letter & occurrences into ouputOccurunces string
    });
    console.log(outputOccurrences); // to print each occurrences
    console.log(outputLetterOccurrences); // to print each letter:occurrences
  })
  .catch((err) => {
    // Error handling
    console.error(`Error running prompt: ${err}`);
  });