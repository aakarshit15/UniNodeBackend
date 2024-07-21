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
    let outputs = [];  // to store output for each letter => [{letter: <letter>, occurunces: <occurunces>}, ...]
    let alreadyCounted; // to not repeat a letter in outputs array
    for(let i=0; i<text.length; i++) {
      if(text[i] === " ") {
        continue; // if space go to next iteration
      }
      alreadyCounted = false; // initially letter is not counted
      outputs.forEach((output) => { // inside for each loop to see if letter is counted
        if(output.letter === text[i]) { // if counted then
          output.occurunces++; // increase its occurence
          alreadyCounted = true; // set alreadyCounted true
          return; // get out of for each loop
        }
      });
      !alreadyCounted && outputs.push({letter: text[i], occurunces: 1}); // if not counted then count it for the first time
    }
    /*
      after for loop
      outputs = [
        {
          letter: <single letter>
          occurunces: <number of occurunces of that letter>
        }, ...
      ]
    */
    console.log(outputs.length); //to print number of distinct letters
    let outputOccurunces = "", outputLetterOccurunces = "";
    outputs.forEach((output) => { // for each letter (or output) in outputs array
      outputOccurunces += `${output.occurunces} `; // add its occurunces into ouputOccurunces string
    });
    outputs.forEach((output, index) => { // for each letter (or output) in outputs array
      (index !== 0) && (outputLetterOccurunces += ", "); // if not 1st output then add a comma and a space before next letter
      outputLetterOccurunces += `${output.letter}:${output.occurunces}` // add its letter & occurunces into ouputOccurunces string
    });
    console.log(outputOccurunces); // to print each occurunces
    console.log(outputLetterOccurunces); // to print each letter:occurunces
  })
  .catch((err) => {
    // Error handling
    console.error(`Error running prompt: ${err}`);
  });