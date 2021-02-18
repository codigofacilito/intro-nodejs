const readline = require('readline');
const fs = require('fs');
const { pipeline } = require('stream');
const fileName = "demo.txt";
// node index.js add|read|copy args

// Leer archivos

// Escribir archivos

// Copiar archivos
main();

async function main(){
  switch (process.argv[2]) {
    case "add":
      writeText(process.argv);
      break;
    case "read":
      readFile(process.argv);
      break;
    case "copy":
      copyFile(process.argv);
      break;
    default:
      break;
  }
}

async function writeText(args){
  let input = await readInput();
  let writableFile = 
    fs.createWriteStream(fileName, { flags: "a" });
  
  writableFile.write(input+"\n");
  writableFile.end();
}

function readFile(args){
  let readerFile = fs.createReadStream(fileName);
  readerFile.setEncoding("utf-8");

  readerFile.on("data",function(data){
    console.log(data);
  })

  readerFile.on("end",function(){
    readerFile.close();
  })
}

async function copyFile(args) {
  let fileDestinationName = await readInput();
  let readerFile = fs.createReadStream(fileName);
  let writableFile =
    fs.createWriteStream(fileDestinationName);
  pipeline(
    readerFile,
    writableFile,
    function(err){
      if(err) console.log(err);
      else console.log("El archivo fue copiado con éxito")
    }
  )
}

// async function writeText(args){
//   let input = await readInput();
//   fs.writeFileSync(fileName,input+"\n",{flag: "a+"});
// }

// function readFile(args){
//   let data = fs.readFileSync(fileName,{ encoding: "utf-8" });
//   console.log(data);
// }

// async function copyFile(args){
//   let copyFileName = await readInput("En qué archivo quieres duplicar ");
//   let data = fs.readFileSync(fileName, { encoding: "utf-8" });
//   fs.writeFileSync(copyFileName, data);
// }

function readInput(instructions = "Agrega tu mensaje "){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(function(res,rej){
    rl.question(instructions, function(input){
      rl.close();
      res(input);
    })
  })


}