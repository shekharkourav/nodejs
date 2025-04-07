//const math=require('');// ./-->karke name date h to current directory me check karta ,bina slash ke node ki directory me search karta h module ko
const fs = require("fs");
//fs.writeFileSync("./test.txt","shekharkourav");

// const res=fs.readFileSync('./test.txt',"utf-8");
// console.log(res);

//fs.appendFileSync("./test.txt", `Date is: ${new Date().getDate().toLocaleString()} \n`);



//asynchronously

fs.readFile("./test.txt", "utf-8", (err, res) => {
  if (err) {
    console.log("some error");
  } else {
    console.log(res);
  }
});
//fs.cpSync("./test.txt","./tt.txt");
//fs.unlinkSync("./tt.txt");