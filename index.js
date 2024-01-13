const barage = require("barage");
const { decrypt } = require("./pkg/hash");
const cnf = require("./client/client.json");
const TokenGenerator = require("./pkg/token");

barage.on("1", (data) => {
  const username = data.data.username;
  const ubase64 = Buffer.from(username, "base64").toString("utf-8");
  const udecode = JSON.parse(ubase64);
  const rusername = decrypt(udecode, cnf.key);

  const password = data.data.password;
  const pbase64 = Buffer.from(password, "base64").toString("utf-8");
  const pdecode = JSON.parse(pbase64);
  const rpassword = decrypt(pdecode, cnf.key);

  if (rpassword === cnf.password) {
    if (rusername === cnf.username) {
      const newToken = new TokenGenerator(cnf.key);
      const genToken = newToken.gen(require("./client/client.json"));
      barage.write("1", {
        data: {
          msg: "Başarılı",
          token: genToken,
        },
      });
      console.log(genToken);
    }
  }
});

barage.on("2", (data) => {
  const newToken = new TokenGenerator(cnf.key);
  barage.write("2", newToken.verify(data.token, require("./client/client.json")));
});

barage.on("3", (data) => {
    const newToken = new TokenGenerator(cnf.key);
   const verifty =  newToken.verify(data.token, require("./client/client.json"))
    console.log(data);
    if (verifty) {
        if (data.token) {
            console.log(data.msg, verifty)
            barage.write("3", { msg: "Success", err: false, })
        }
    } else { 
        barage.write("3", { err: true, })
    }

})

barage.start(3000, () => {
  console.log("Server started on port 3000");
});
