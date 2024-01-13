const barage = require("barage/lib/client/main");
const client = barage(3000, "localhost");
const cnf = require("./client.json");
const { encrypt } = require("../pkg/hash");
const { temp, getToken } = require("./Database/Temp");

const enUser = encrypt(cnf.username, cnf.key);
const enPass = encrypt(cnf.password, cnf.key);


client.write("1", {
  data: {
    username: Buffer.from(JSON.stringify(enUser)).toString("base64"),
    password: Buffer.from(JSON.stringify(enPass)).toString("base64"),
  },
});

client.on("1", (data) => {
  console.log(data.data.token);
  temp(data.data.token)
  client.write("2", { token: data.data.token});
});

client.on("2", (data) => {
  console.log(data);
  if (data.data) {
    getToken(function(token) {
      if (token) {
        client.write("3", { token: token, msg: "ewriqson" });
      } else {
        client.write("3", { token: null });
      }
    });
  }

});

client.on("3", (data) => {
 if (!data.err) {
  if (data.msg) {
    console.log("Success", data);
    process.exit(1)
  }
 } else {
  console.log("Error");
  process.exit(1)
 }
});