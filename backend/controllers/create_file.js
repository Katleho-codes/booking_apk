import Client from "ssh2-sftp-client";

let sftp = new Client();

const config = {
  host: "107.172.140.113",
  port: 22,
  username: "root",
  password: "2M3cr76Sxc6SoOQbS9",
};

const createFile = async (req, res) => {
  const { formData } = req.body;
  // console.log(formData);
  //   sftp
  //     .connect(config)
  //     .then(() => {
  //       if (formData) {
  //         sftp.put(`${formData}`, "/root/hello/hello.txt");
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .then(() => {
  //       sftp.end();
  //     })
  //     .catch((err) => {
  //       console.error(err.message);
  //     });
};
export default createFile;
